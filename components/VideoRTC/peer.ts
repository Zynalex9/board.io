class PeerService {
  peers: { [id: string]: RTCPeerConnection } = {};

  createPeer(id: string, localStream?: MediaStream|null) {
    if (!this.peers[id]) {
      const pc = new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              "stun:stun.l.google.com:19302",
              "stun:global.stun.twilio.com:3478",
            ],
          },
        ],
      });
      if (localStream) {
        localStream.getTracks().forEach((track) => {
          pc.addTrack(track, localStream);
        });
      }

      this.peers[id] = pc;
    }
    return this.peers[id];
  }

  async createOffer(id: string) {
    const pc = this.createPeer(id);
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    return offer;
  }

  async createAnswer(id: string, offer: RTCSessionDescriptionInit) {
    const pc = this.createPeer(id);
    await pc.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    return answer;
  }

  async setRemoteAnswer(id: string, answer: RTCSessionDescriptionInit) {
    const pc = this.createPeer(id);
    await pc.setRemoteDescription(new RTCSessionDescription(answer));
  }

  async addIceCandidate(id: string, candidate: RTCIceCandidateInit) {
    const pc = this.createPeer(id);
    await pc.addIceCandidate(new RTCIceCandidate(candidate));
  }
}

export default new PeerService();
