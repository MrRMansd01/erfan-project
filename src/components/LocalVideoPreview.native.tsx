import React from 'react';
import { StyleSheet } from 'react-native';
import { RTCView } from 'react-native-webrtc';

type LocalVideoPreviewProps = {
  streamURL: string;
};

const LocalVideoPreview = ({ streamURL }: LocalVideoPreviewProps) => {
  return (
    <RTCView
      mirror
      objectFit="cover"
      streamURL={streamURL}
      style={styles.video}
    />
  );
};

const styles = StyleSheet.create({
  video: {
    height: '100%',
    width: '100%',
  },
});

export default LocalVideoPreview;
