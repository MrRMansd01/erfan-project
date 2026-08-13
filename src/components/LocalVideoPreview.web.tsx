import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type LocalVideoPreviewProps = {
  streamURL: string;
};

const LocalVideoPreview = ({ streamURL }: LocalVideoPreviewProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Web Preview Mode</Text>
      <Text style={styles.subtitle}>
        The full `react-native-webrtc` video renderer is native-only, so the web
        preview shows a placeholder while keeping the rest of the UI testable.
      </Text>
      <Text style={styles.caption}>Stream: {streamURL}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#11131C',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: '#FAFAFB',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    color: '#AEB4CA',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  caption: {
    color: '#3694FF',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 14,
  },
});

export default LocalVideoPreview;
