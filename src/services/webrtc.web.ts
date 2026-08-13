const MEDIA_SERVER_WS_URL = 'ws://mediaserver:7887';

type MockMediaStream = {
  toURL: () => string;
  getTracks: () => Array<{ stop: () => void }>;
};

type MockPeerConnection = {
  close: () => void;
};

export type WebRtcSession = {
  localStream: MockMediaStream;
  peerConnection: MockPeerConnection;
  signalingUrl: string;
};

export const requestMediaPermissions = async () => {
  console.log('[WebRTC][web] Permission request skipped in web preview mode');
};

export const createWebRtcSession = async (): Promise<WebRtcSession> => {
  await requestMediaPermissions();

  console.log(
    '[WebRTC][web] Native WebRTC is disabled in webpack preview mode:',
    MEDIA_SERVER_WS_URL,
  );

  return {
    localStream: {
      toURL: () => 'web-preview-stream',
      getTracks: () => [],
    },
    peerConnection: {
      close: () => {
        console.log('[WebRTC][web] Peer connection closed');
      },
    },
    signalingUrl: MEDIA_SERVER_WS_URL,
  };
};

export const closeWebRtcSession = async (
  session: Partial<WebRtcSession> | null,
) => {
  session?.localStream?.getTracks().forEach(track => {
    track.stop();
  });

  session?.peerConnection?.close();
};

export const mediaServerConfig = {
  signalingUrl: MEDIA_SERVER_WS_URL,
  createOfferScaffold: async (_peerConnection: MockPeerConnection) => {
    const offer = {
      type: 'offer',
      sdp: 'web-preview-offer',
    };

    console.log('[WebRTC][web] Offer scaffold prepared for preview mode');
    return offer;
  },
};
