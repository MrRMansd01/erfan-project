// App.tsx
import React, { useMemo, useState } from 'react';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import CallScreen from './screens/CallScreen';

type Session = {
  userId: string;
  username: string;
};

type Screen = 'login' | 'home' | 'call';

const App = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [selectedMeetingId, setSelectedMeetingId] = useState<string | null>(null);

  const handleLogin = (userSession: Session) => {
    setSession(userSession);
    setCurrentScreen('home');
  };

  const handleJoinMeeting = (meetingId: string) => {
    setSelectedMeetingId(meetingId);
    setCurrentScreen('call');
  };

  const handleLogout = () => {
    setSession(null);
    setCurrentScreen('login');
    setSelectedMeetingId(null);
  };

  const handleEndCall = () => {
    setCurrentScreen('home');
    setSelectedMeetingId(null);
  };

  if (currentScreen === 'login' || !session) {
    return <LoginScreen onLoginSuccess={handleLogin} />;
  }

  if (currentScreen === 'home') {
    return (
      <HomeScreen
        session={session}
        onJoinMeeting={handleJoinMeeting}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <CallScreen
      session={session}
      meetingId={selectedMeetingId || 'unknown'}
      onEndCall={handleEndCall}
    />
  );
};

export default App;