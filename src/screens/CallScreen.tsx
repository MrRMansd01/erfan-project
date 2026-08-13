import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  useWindowDimensions, 
  ScrollView, 
  TextInput,
  StatusBar,
  Platform
} from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

interface CallScreenProps {
  session: any;
  meetingId: string;
  onEndCall: () => void;
}

// Sample data matching the SVG design
const THUMBNAILS = [
  { id: '1', name: 'Casey Jung', micOn: false },
  { id: '2', name: 'Alice Wong', micOn: true, isBlue: true },
  { id: '3', name: 'Teresa Webb', micOn: true, isBlue: true },
  { id: '4', name: 'Kristin Wong', micOn: false },
];

const PARTICIPANTS = [
  { id: '1', name: 'Dianne Russell', avatarColor: '#FF6B6B', micOn: false, camOn: false },
  { id: '2', name: 'Guy Hawkins', avatarColor: '#4ECDC4', micOn: false, camOn: false },
  { id: '3', name: 'Kathryn Murphy', avatarColor: '#FFD93D', micOn: false, camOn: true },
];

const CHATS = [
  { id: '1', name: 'Kathryn Murphy', time: '11:01 AM', text: 'Good afternoon everyone.', avatarColor: '#FFD93D' },
  { id: '2', name: 'Kathryn Murphy', time: '11:01 AM', text: "Let's start the meeting.", avatarColor: 'transparent' },
  { id: '3', name: 'Joshua Abraham', time: '11:02 AM', text: "Yes, I agree let's begin.", avatarColor: '#A8E6CF' },
  { id: '4', name: 'Kathryn Murphy', time: '12:04 AM', text: "Today we'll discuss last week's sales.", avatarColor: '#FFD93D' },
];

const CallScreen: React.FC<CallScreenProps> = ({ session, meetingId, onEndCall }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(86445); // Test start time (matching 24:01:45 in design)
  const [chatType, setChatType] = useState<'group' | 'personal'>('group');
  
  const { width, height } = useWindowDimensions();
  const isMobile = width < 1024;

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={[styles.container, { width, height }]}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0C10" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoContainer}>
            <Svg width={26} height={26} viewBox="0 0 24 24" fill="none">
              <Rect x="2" y="6" width="16" height="12" rx="3" fill="#2D78FF" />
              <Path d="M18 10L22 7V17L18 14V10Z" fill="#2D78FF" />
            </Svg>
          </View>
          <View>
            <Text style={styles.headerTitle}>Meeting Title</Text>
            <Text style={styles.headerSubtitle}>Date | Time</Text>
          </View>
        </View>

        {!isMobile && (
          <View style={styles.headerCenter}>
            <View style={styles.avatarGroup}>
              {['#FFD93D', '#FF6B6B', '#4ECDC4', '#A8E6CF'].map((color, index) => (
                <View key={index} style={[styles.miniAvatar, { backgroundColor: color, zIndex: 4 - index, marginRight: index > 0 ? -10 : 0 }]} />
              ))}
              <View style={[styles.miniAvatar, { backgroundColor: '#252836', zIndex: 0, marginRight: -10 }]}>
                <Text style={styles.miniAvatarText}>+9</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.linkButton}>
              <View style={styles.linkIconWrapper}>
                <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                  <Path d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m5.658-5.658a4.5 4.5 0 00-6.364 0l-1.5 1.5m1.272 6.364a4.5 4.5 0 006.364 0l4.5-4.5a4.5 4.5 0 00-6.364-6.364" stroke="#2D78FF" strokeWidth="2" strokeLinecap="round" />
                </Svg>
              </View>
              <Text style={styles.linkText}>cem-jnmt-hsu</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.headerRight}>
          <View style={styles.currentUser}>
            <View style={[styles.avatar, { backgroundColor: '#FFA07A', width: 34, height: 34 }]} />
            {!isMobile && (
              <View style={styles.currentUserDetails}>
                <Text style={styles.currentUserName}>Adam Joseph</Text>
                <Text style={styles.currentUserRole}>Meeting Host</Text>
              </View>
            )}
          </View>
          <TouchableOpacity style={styles.moreHeaderBtn}>
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <Circle cx="12" cy="5" r="2" fill="#8B8D97" />
              <Circle cx="12" cy="12" r="2" fill="#8B8D97" />
              <Circle cx="12" cy="19" r="2" fill="#8B8D97" />
            </Svg>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main content area (video and chat/users menu) */}
      <View style={[styles.contentArea, isMobile && styles.contentAreaMobile]}>
        
        {/* Main video stream container */}
        <View style={styles.mainVideoContainer}>
          <View style={styles.mainVideoBackground}>
            
            {/* Timer and recording indicator */}
            <View style={styles.videoTopRow}>
              <View style={styles.recordingBadge}>
                <View style={styles.recordingDot} />
                <Text style={styles.recordingText}>{formatDuration(callDuration)}</Text>
              </View>
              <TouchableOpacity style={styles.expandButton}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                  <Path d="M3 9V5C3 3.89543 3.89543 3 5 3H9M15 3H19C20.1046 3 21 3.89543 21 5V9M21 15V19C21 20.1046 20.1046 21 19 21H15M9 21H5C3.89543 21 3 20.1046 3 19V15" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                </Svg>
              </TouchableOpacity>
            </View>

            {/* Animated sound wave indicator */}
            <View style={styles.soundWaveIcon}>
              <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
                <Rect x="4" y="10" width="2" height="4" rx="1" fill="#FFFFFF" />
                <Rect x="8" y="6" width="2" height="12" rx="1" fill="#FFFFFF" />
                <Rect x="12" y="3" width="2" height="18" rx="1" fill="#FFFFFF" />
                <Rect x="16" y="8" width="2" height="8" rx="1" fill="#FFFFFF" />
                <Rect x="20" y="11" width="2" height="2" rx="1" fill="#FFFFFF" />
              </Svg>
            </View>

            {/* Name tag and other participants thumbnails */}
            <View style={styles.videoBottomSection}>
              <View style={styles.mainUserNameTag}>
                <Text style={styles.mainUserName}>Adam Joseph</Text>
              </View>

              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={styles.thumbnailsContainer}
              >
                {THUMBNAILS.map((thumb) => (
                  <View key={thumb.id} style={styles.thumbnailWrapper}>
                    <View style={styles.thumbnailContent}>
                      <Text style={styles.thumbnailName}>{thumb.name}</Text>
                      <View style={[styles.thumbnailMic, thumb.isBlue ? styles.micBlue : styles.micRed]}>
                        <Svg width={12} height={12} viewBox="0 0 24 24" fill="none">
                          {thumb.micOn ? (
                            <Path d="M12 15C13.66 15 15 13.66 15 12V5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V12C9 13.66 10.34 15 12 15ZM19 10V12C19 15.87 15.87 19 12 19C8.13 19 5 15.87 5 12V10M12 19V22M8 22H16" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
                          ) : (
                            <Path d="M15 9.4V5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V9.4M12 15C13.66 15 15 13.66 15 12M12 15C10.34 15 9 13.66 9 12M12 15V19M8 19H16M3 3L21 21" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
                          )}
                        </Svg>
                      </View>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>

        {/* Right sidebar (users and chat) */}
        <View style={[styles.sidebar, isMobile && styles.sidebarMobile]}>
          
          {/* Participants section */}
          <View style={styles.sidebarSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Participants</Text>
              <TouchableOpacity style={styles.addParticipantBtn}>
                <View style={styles.addParticipantIconWrapper}>
                  <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                    <Path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM23 11V15M21 13H25" stroke="#2D78FF" strokeWidth="2" strokeLinecap="round" />
                  </Svg>
                </View>
                <Text style={styles.addParticipantText}>Add Member</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.participantsList}>
              {PARTICIPANTS.map((p) => (
                <View key={p.id} style={styles.participantItem}>
                  <View style={[styles.avatar, { backgroundColor: p.avatarColor, width: 34, height: 34 }]} />
                  <Text style={styles.participantNameList}>{p.name}</Text>
                  <View style={styles.participantStatusIcons}>
                    <View style={styles.micIconPadding}>
                      <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                         {p.micOn ? 
                           <Path d="M12 15C13.66 15 15 13.66 15 12V5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V12C9 13.66 10.34 15 12 15ZM19 10V12C19 15.87 15.87 19 12 19C8.13 19 5 15.87 5 12V10" stroke="#FF4D4D" strokeWidth="2" /> : 
                           <Path d="M15 9.4V5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V9.4M12 15C13.66 15 15 13.66 15 12M3 3L21 21" stroke="#FF4D4D" strokeWidth="2" strokeLinecap="round" />
                         }
                      </Svg>
                    </View>
                    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                      {p.camOn ? 
                         <Path d="M15 10L21 6V18L15 14V17C15 17.5523 14.5523 18 14 18H4C3.44772 18 3 17.5523 3 17V7C3 6.44772 3.44772 6 4 6H14C14.5523 6 15 6.44772 15 7V10Z" stroke="#2D78FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> : 
                         <Path d="M3 3L21 21M15 10L21 6V18L15 14V17C15 17.5523 14.5523 18 14 18H4C3.44772 18 3 17.5523 3 17V7C3 6.44772 3.44772 6 4 6H14C14.5523 6 15 6.44772 15 7V10Z" stroke="#FF4D4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      }
                    </Svg>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Chat section */}
          <View style={styles.chatSectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Chats</Text>
            </View>
            <View style={styles.chatTabs}>
              <TouchableOpacity 
                style={[styles.chatTab, chatType === 'group' && styles.chatTabActive]}
                onPress={() => setChatType('group')}
              >
                <Text style={styles.chatTabText}>Group</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.chatTab, chatType === 'personal' && styles.chatTabActive]}
                onPress={() => setChatType('personal')}
              >
                <Text style={styles.chatTabText}>Personal</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.chatList} showsVerticalScrollIndicator={false}>
              {CHATS.map((chat) => (
                <View key={chat.id} style={styles.chatItem}>
                  {chat.avatarColor !== 'transparent' ? (
                    <View style={[styles.avatar, { backgroundColor: chat.avatarColor, width: 30, height: 30, marginRight: 10 }]} />
                  ) : (
                    <View style={styles.chatPlaceholderAvatar} />
                  )}
                  <View style={styles.chatContent}>
                    <View style={styles.chatMeta}>
                      {chat.avatarColor !== 'transparent' && <Text style={styles.chatName}>{chat.name}</Text>}
                      <Text style={styles.chatTime}>{chat.time}</Text>
                    </View>
                    <View style={styles.chatBubble}>
                      <Text style={styles.chatText}>{chat.text}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>

            <View style={styles.chatInputContainer}>
              <TextInput 
                style={styles.chatInput}
                placeholder="Type something..."
                placeholderTextColor="#8B8D97"
              />
              <View style={styles.clipIconWrapper}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                  <Path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" stroke="#8B8D97" strokeWidth="2" strokeLinecap="round" />
                </Svg>
              </View>
              <TouchableOpacity style={styles.sendButton}>
                <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                  <Path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </Svg>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Bottom control buttons bar (fully attached to bottom without gaps) */}
      <View style={styles.controlBar}>
        <View style={styles.controlsLeft} />
        
        <View style={styles.controlsCenter}>
          {/* Microphone button */}
          <TouchableOpacity 
            style={[styles.controlBtn, isMuted ? styles.btnInactiveGray : styles.btnActiveBlue]}
            onPress={() => setIsMuted(!isMuted)}
          >
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <Path d="M12 15C13.66 15 15 13.66 15 12V5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V12C9 13.66 10.34 15 12 15ZM19 10V12C19 15.87 15.87 19 12 19C8.13 19 5 15.87 5 12V10M12 19V22M8 22H16" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
            </Svg>
          </TouchableOpacity>

          {/* Camera button */}
          <TouchableOpacity 
            style={[styles.controlBtn, isVideoOff ? styles.btnInactiveGray : styles.btnActiveBlue]}
            onPress={() => setIsVideoOff(!isVideoOff)}
          >
             <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <Path d="M15 10L21 6V18L15 14V17C15 17.5523 14.5523 18 14 18H4C3.44772 18 3 17.5523 3 17V7C3 6.44772 3.44772 6 4 6H14C14.5523 6 15 6.44772 15 7V10Z" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </TouchableOpacity>

          {/* Screen share button */}
          <TouchableOpacity style={styles.controlBtn}>
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <Rect x="2" y="3" width="20" height="14" rx="2" stroke="#FFFFFF" strokeWidth="2" />
              <Path d="M8 21H16M12 17V21M12 8L9 11M12 8L15 11M12 8V14" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            </Svg>
          </TouchableOpacity>

          {/* Record meeting button */}
          <TouchableOpacity style={styles.controlBtnRecord}>
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <Circle cx="12" cy="12" r="10" stroke="#FF4D4D" strokeWidth="2" />
              <Circle cx="12" cy="12" r="5" fill="#FF4D4D" />
            </Svg>
          </TouchableOpacity>

          {/* Quick chat button */}
          <TouchableOpacity style={styles.controlBtn}>
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <Path d="M21 11.5C21 16.1944 16.9706 20 12 20C10.6384 20 9.34757 19.7084 8.20454 19.1866C8.01257 19.099 7.89311 19.0833 7.78443 19.1022L4.54226 19.6644C4.08483 19.7437 3.75628 19.4152 3.83556 18.9577L4.39775 15.7156C4.41666 15.6069 4.40096 15.4874 4.31343 15.2955C3.79155 14.1524 3.5 12.8616 3.5 11.5C3.5 6.80558 7.52944 3 12.5 3C17.4706 3 21 6.80558 21 11.5Z" stroke="#FFFFFF" strokeWidth="2" />
              <Path d="M8 12H16M8 8H13" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            </Svg>
          </TouchableOpacity>

          {/* More options button */}
          <TouchableOpacity style={styles.controlBtn}>
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
               <Circle cx="5" cy="12" r="2" fill="#FFFFFF" />
               <Circle cx="12" cy="12" r="2" fill="#FFFFFF" />
               <Circle cx="19" cy="12" r="2" fill="#FFFFFF" />
            </Svg>
          </TouchableOpacity>
        </View>

        <View style={styles.controlsRight}>
          <TouchableOpacity style={styles.endCallBtn} onPress={onEndCall}>
            <Text style={styles.endCallText}>End Call</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Using absolute position to fix 100% screen dimensions without black margins
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#0F111A', // Matching dark background color from design
    flexDirection: 'column',
  },
  
  // Header
  header: {
    height: 75,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1C25',
    backgroundColor: '#0F111A',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    marginRight: 12,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  headerSubtitle: {
    color: '#8B8D97',
    fontSize: 11,
    marginTop: 2,
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarGroup: {
    flexDirection: 'row',
    marginRight: 16,
  },
  miniAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#0F111A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  miniAvatarText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E243A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2D78FF',
  },
  linkIconWrapper: {
    marginRight: 6,
  },
  linkText: {
    color: '#2D78FF',
    fontSize: 12,
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentUser: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1F2D',
    padding: 6,
    paddingRight: 14,
    borderRadius: 30,
    marginRight: 12,
  },
  currentUserDetails: {
    marginLeft: 10,
  },
  currentUserName: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  currentUserRole: {
    color: '#8B8D97',
    fontSize: 11,
  },
  moreHeaderBtn: {
    padding: 6,
  },

  // Middle section video container and sidebar
  contentArea: {
    flex: 1, 
    flexDirection: 'row',
    backgroundColor: '#0F111A',
  },
  contentAreaMobile: {
    flexDirection: 'column',
  },
  
  // Main video frame layer
  mainVideoContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#0F111A',
  },
  mainVideoBackground: {
    flex: 1,
    backgroundColor: '#141621',
    borderRadius: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  videoTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    zIndex: 10,
  },
  recordingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 17, 26, 0.75)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF4D4D',
  },
  recordingText: {
    color: '#FFFFFF',
    marginLeft: 8,
    fontSize: 13,
    fontWeight: '500',
  },
  expandButton: {
    backgroundColor: 'rgba(15, 17, 26, 0.75)',
    padding: 8,
    borderRadius: 20,
  },
  soundWaveIcon: {
    position: 'absolute',
    right: 16,
    top: '40%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 8,
    borderRadius: 10,
    zIndex: 10,
  },
  videoBottomSection: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    zIndex: 10,
  },
  mainUserNameTag: {
    backgroundColor: 'rgba(15, 17, 26, 0.75)',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 12,
  },
  mainUserName: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  thumbnailsContainer: {
    flexDirection: 'row',
    paddingRight: 16,
  },
  thumbnailWrapper: {
    width: 140,
    height: 70,
    backgroundColor: '#0F111A',
    borderRadius: 10,
    marginRight: 12,
    justifyContent: 'flex-end',
    padding: 10,
    borderWidth: 1,
    borderColor: '#1F2231',
  },
  thumbnailContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  thumbnailName: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '500',
  },
  thumbnailMic: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micRed: { backgroundColor: '#FF4D4D' },
  micBlue: { backgroundColor: '#2D78FF' },

  // Sidebar (participants and chat)
  sidebar: {
    width: 340,
    backgroundColor: '#1C1F2D',
    borderLeftWidth: 1,
    borderLeftColor: '#252836',
    flexDirection: 'column',
  },
  sidebarMobile: {
    width: '100%',
    maxHeight: 400,
  },
  sidebarSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  addParticipantBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#252836',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  addParticipantIconWrapper: {
    marginRight: 6,
  },
  addParticipantText: {
    color: '#2D78FF',
    fontSize: 12,
    fontWeight: '600',
  },
  participantsList: {
    marginBottom: 16,
  },
  participantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  avatar: {
    borderRadius: 50,
    marginRight: 12,
  },
  participantNameList: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  participantStatusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  micIconPadding: {
    marginRight: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#252836',
    marginHorizontal: 20,
    marginVertical: 16,
  },

  // Chat section
  chatSectionContainer: {
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: 'column',
  },
  chatTabs: {
    flexDirection: 'row',
    backgroundColor: '#252836',
    borderRadius: 20,
    padding: 4,
    marginBottom: 16,
  },
  chatTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 16,
  },
  chatTabActive: {
    backgroundColor: '#2D78FF',
  },
  chatTabText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  chatList: {
    flex: 1,
    marginBottom: 12,
  },
  chatItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  chatPlaceholderAvatar: {
    width: 30,
    marginRight: 10,
  },
  chatContent: {
    flex: 1,
  },
  chatMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  chatName: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginRight: 8,
  },
  chatTime: {
    color: '#8B8D97',
    fontSize: 11,
  },
  chatBubble: {
    backgroundColor: '#252836',
    padding: 10,
    borderRadius: 12,
    borderTopLeftRadius: 2,
  },
  chatText: {
    color: '#E4E6EB',
    fontSize: 13,
    lineHeight: 18,
  },
  chatInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#252836',
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 10 : 6,
    marginBottom: 16,
  },
  chatInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 13,
    paddingVertical: 0,
  },
  clipIconWrapper: {
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#2D78FF',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Bottom control bar (fully attached to bottom)
  controlBar: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    backgroundColor: '#1C1F2D',
    borderTopWidth: 1,
    borderTopColor: '#252836',
  },
  controlsLeft: {
    flex: 1,
  },
  controlsCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  btnActiveBlue: {
    backgroundColor: '#2D78FF',
  },
  btnInactiveGray: {
    backgroundColor: '#3A3F54',
  },
  controlBtnRecord: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
    backgroundColor: '#252836',
  },
  controlsRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  endCallBtn: {
    backgroundColor: '#FF4D4D',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  endCallText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default CallScreen;
