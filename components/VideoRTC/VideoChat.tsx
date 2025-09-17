"use client";
import { useSocket } from "@/context/socket.context";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { start } from "./service";
import { useUser } from "@/hooks/useUser";
import peer from "./peer";
import { toast } from "sonner";

export const VideoChat = ({
  openVideoChat,
  setOpenVideoChat,
}: {
  openVideoChat: boolean;
  setOpenVideoChat: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { id: boardId } = useParams();
  const { socket } = useSocket();
  const { data: user } = useUser();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const LocalStreamRef = useRef<MediaStream>(null);
  const [remoteStreams, setRemoteStreams] = useState<
    { id: string; stream: MediaStream }[]
  >([]);
  const [remoteUserId, setRemoteUserId] = useState<string | null>(null);

  // When new user joins → send them an offer
const handleNewUser = useCallback(
  async (newUser: any) => {
    console.log("new user joined", newUser);
    toast.success(`${newUser.username} joined`);

    // Create peer with local stream
    const pc = peer.createPeer(newUser.id, LocalStreamRef.current);

    const offer = await peer.createOffer(newUser.id);
    socket?.emit("webRTC:offer", {
      boardId,
      to: newUser.id,
      from: user?.id,
      offer,
    });
  },
  [socket, user, boardId]
);

  // When offer is received → create answer
const handleOfferReceived = useCallback(
  async (data: any) => {
    const { offer, from } = data;
    console.log("Offer received from", from);

    // Create peer with local stream if not exists
    peer.createPeer(from, LocalStreamRef.current);

    const answer = await peer.createAnswer(from, offer);
    socket?.emit("webRTC:answer", {
      boardId,
      to: from,
      from: user?.id,
      answer,
    });
  },
  [socket, user, boardId]
);
  const handleAnswerReceived = useCallback(async (data: any) => {
    const { answer, from } = data;
    console.log("Answer received from", from);
    await peer.setRemoteAnswer(from, answer);
  }, []);

  // Create peer + attach local tracks + setup ICE/track listeners
  useEffect(() => {
    const pc = peer.createPeer(user?.id as string);

    // Add local tracks to connection
    if (LocalStreamRef.current) {
      LocalStreamRef.current.getTracks().forEach((track) => {
        pc.addTrack(track, LocalStreamRef.current!);
      });
    }

    pc.onicecandidate = ({ candidate }) => {
      if (candidate) {
        socket?.emit("webRTC:ice-candidate", {
          boardId,
          from: user?.id,
          to: remoteUserId,
          candidate,
        });
      }
    };

    pc.ontrack = (event) => {
      console.log("Remote track received:", event.streams);

      setRemoteStreams((prev) => {
        const exists = prev.find((s) => s.id === event.streams[0].id);
        if (exists) return prev;
        return [...prev, { id: event.streams[0].id, stream: event.streams[0] }];
      });
    };
  }, [socket, user, remoteUserId, boardId]);

  // Handle ICE candidates from remote peer
  useEffect(() => {
    socket?.on("webRTC:ice-candidate", async ({ from, candidate }) => {
      await peer.addIceCandidate(from, candidate);
    });

    return () => {
      socket?.off("webRTC:ice-candidate");
    };
  }, [socket]);

  // Handle signalling events
  useEffect(() => {
    socket?.on("webRTC:new-user-join", handleNewUser);
    socket?.on("webRTC:offer", handleOfferReceived);
    socket?.on("webRTC:answer", handleAnswerReceived);

    return () => {
      socket?.off("webRTC:new-user-join", handleNewUser);
      socket?.off("webRTC:offer", handleOfferReceived);
      socket?.off("webRTC:answer", handleAnswerReceived);
    };
  }, [socket]);

  // Start local video + join room
  useEffect(() => {
    start(socket, boardId as string, user, LocalStreamRef, localVideoRef);
  }, []);

  return (
    <div className="w-[40%] pb-2 rounded-md h-[80vh] flex flex-col gap-4 items-center pt-4 silver-border-nr bg-primary-bg mt-14 overflow-y-auto minimal-scrollbar">
      {/* Local video */}
      <video
        ref={localVideoRef}
        playsInline
        autoPlay
        muted
        className="bg-black w-[90%] h-[48%] silver-border"
      />

      {/* Remote videos */}
      {remoteStreams.map(({ id, stream }) => (
        <video
          key={id}
          playsInline
          autoPlay
          className="bg-black w-[90%] h-[48%] silver-border"
          ref={(ref) => {
            if (ref) ref.srcObject = stream;
          }}
        />
      ))}
    </div>
  );
};
