import { PermissionsAndroid, Platform } from 'react-native';
import {
  MediaStream,
  RTCPeerConnection,
  RTCSessionDescription,
  mediaDevices,
} from 'react-native-webrtc';

const MEDIA_SERVER_WS_URL = 'ws://mediaserver:7887';

export type WebRtcSession = {
  localStream: MediaStream;
  peerConnection: RTCPeerConnection;
  signalingUrl: string;
};

const requestAndroidPermissions = async () => {
  const statuses = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.CAMERA,
    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  ]);

  const permissionsGranted = Object.values(statuses).every(
    status => status === PermissionsAndroid.RESULTS.GRANTED,
  );

  if (!permissionsGranted) {
    throw new Error('Camera and microphone permissions are required.');
  }
};

export const requestMediaPermissions = async () => {
  if (Platform.OS === 'android') {
    await requestAndroidPermissions();
  }
};

export const createWebRtcSession = async (): Promise<WebRtcSession> => {
  await requestMediaPermissions();

  const localStream = await mediaDevices.getUserMedia({
    audio: true,
    video: {
      facingMode: 'user',
      frameRate: 30,
      width: 1280,
      height: 720,
    },
  });

  const peerConnection = new RTCPeerConnection({
    iceServers: [],
  });

  localStream.getTracks().forEach(track => {
    peerConnection.addTrack(track, localStream);
  });

  console.log(
    '[WebRTC] Local stream ready. Media server signaling scaffold:',
    MEDIA_SERVER_WS_URL,
  );

  const typedPeerConnection = peerConnection as RTCPeerConnection & {
    onicecandidate?: ((event: { candidate?: unknown }) => void) | null;
    onconnectionstatechange?: (() => void) | null;
  };

  typedPeerConnection.onicecandidate = event => {
    if (event.candidate) {
      console.log('[WebRTC] ICE candidate generated:', event.candidate);
    }
  };

  typedPeerConnection.onconnectionstatechange = () => {
    console.log(
      '[WebRTC] Connection state changed:',
      peerConnection.connectionState,
    );
  };

  return {
    localStream,
    peerConnection,
    signalingUrl: MEDIA_SERVER_WS_URL,
  };
};

export const closeWebRtcSession = async (
  session: Partial<WebRtcSession> | null,
) => {
  if (!session) {
    return;
  }

  session.localStream?.getTracks().forEach(track => {
    track.stop();
  });

  const connection = session.peerConnection;

  if (connection) {
    const typedConnection = connection as RTCPeerConnection & {
      onicecandidate?: ((event: { candidate?: unknown }) => void) | null;
      onconnectionstatechange?: (() => void) | null;
    };

    typedConnection.onicecandidate = null;
    typedConnection.onconnectionstatechange = null;

    try {
      const senders = connection.getSenders?.() ?? [];
      senders.forEach(sender => {
        try {
          connection.removeTrack(sender);
        } catch (error) {
          console.log('[WebRTC] removeTrack skipped:', error);
        }
      });
    } catch (error) {
      console.log('[WebRTC] Sender cleanup skipped:', error);
    }

    try {
      connection.close();
    } catch (error) {
      console.log('[WebRTC] Close skipped:', error);
    }
  }
};

export const mediaServerConfig = {
  signalingUrl: MEDIA_SERVER_WS_URL,
  createOfferScaffold: async (peerConnection: RTCPeerConnection) => {
    const offer = await peerConnection.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    });

    await peerConnection.setLocalDescription(
      new RTCSessionDescription(offer),
    );

    console.log('[WebRTC] Offer scaffold prepared for future signaling');
    return offer;
  },
};
