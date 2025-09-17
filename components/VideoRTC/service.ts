import { IUser } from "@/store/userSlice";
import { User } from "@/types/allTypes";
import { RefObject } from "react";
import { Socket } from "socket.io-client";
import peer from "./peer";

export async function start(
  socket: Socket | null,
  boardId: string,
  user: IUser | null | undefined,
  LocalStreamRef: RefObject<MediaStream | null>,
  localVideoRef: RefObject<HTMLVideoElement | null>
) {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });
  LocalStreamRef.current = stream;
  if (localVideoRef.current) {
    localVideoRef.current.srcObject = stream;
  }

  socket?.emit("webRTC:user-join", { user, boardId });
}
