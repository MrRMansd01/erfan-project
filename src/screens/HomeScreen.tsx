// src/screens/HomeScreen.tsx
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  TextInput,
  useWindowDimensions,
  ScrollView,
} from 'react-native';

type Meeting = {
  id: string;
  name: string;
  email: string;
  time: string;
  members: string;
  pending: string;
  hasMore: boolean;
};

const MEETINGS: Meeting[] = [
  {
    id: '1',
    name: 'Ahsan Khan',
    email: 'ahsankhan12@gmail.com',
    time: '10 : 30 AM',
    members: '9 members going',
    pending: '2 pending',
    hasMore: true,
  },
  {
    id: '2',
    name: 'Ahsan Khan',
    email: 'ahsankhan12@gmail.com',
    time: '10 : 30 AM',
    members: '9 members going',
    pending: '2 pending',
    hasMore: true,
  },
  {
    id: '3',
    name: 'Ahsan Khan',
    email: 'ahsankhan12@gmail.com',
    time: '10 : 30 AM',
    members: '9 members going',
    pending: '2 pending',
    hasMore: true,
  },
  {
    id: '4',
    name: 'Ahsan Khan',
    email: 'ahsankhan12@gmail.com',
    time: '10 : 30 AM',
    members: '9 members going',
    pending: '2 pending',
    hasMore: true,
  },
  {
    id: '5',
    name: 'Ahsan Khan',
    email: 'ahsankhan12@gmail.com',
    time: '10 : 30 AM',
    members: '9 members going',
    pending: '2 pending',
    hasMore: true,
  },
  {
    id: '6',
    name: 'Ahsan Khan',
    email: 'ahsankhan12@gmail.com',
    time: '10 : 30 AM',
    members: '9 members going',
    pending: '2 pending',
    hasMore: true,
  },
];

type HomeScreenProps = {
  session: { userId: string; username: string };
  onJoinMeeting: (meetingId: string) => void;
  onLogout: () => void;
};

const HomeScreen = ({ session, onJoinMeeting, onLogout }: HomeScreenProps) => {
  const { width, height } = useWindowDimensions();
  
  // تشخیص سایز صفحه
  const isSmallScreen = width < 768;
  
  // محاسبه عرض کارت بر اساس سایز صفحه
  const getCardWidth = () => {
    if (isSmallScreen) return width * 0.75;
    return 280; // عرض ثابت برای دسکتاپ
  };
  
  const MeetingCard = ({ item }: { item: Meeting }) => (
    <View style={[styles.meetingCard, { width: getCardWidth() }]}>
      <View style={styles.meetingHeader}>
        <View style={[
          styles.avatarMain,
          { 
            width: isSmallScreen ? 60 : 70,
            height: isSmallScreen ? 60 : 70,
            borderRadius: isSmallScreen ? 30 : 35,
          }
        ]} />
        <View style={styles.meetingInfo}>
          <Text style={[styles.meetingName, { fontSize: isSmallScreen ? 16 : 18 }]}>
            {item.name}
          </Text>
          <Text style={[styles.meetingEmail, { fontSize: isSmallScreen ? 10 : 11 }]}>
            {item.email}
          </Text>
          <Text style={[styles.meetingTime, { fontSize: isSmallScreen ? 13 : 15 }]}>
            {item.time}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.statsRow}>
        <Text style={styles.membersText}>{item.members}</Text>
        <Text style={styles.pendingText}>{item.pending}</Text>
      </View>

      <View style={styles.avatarGroupContainer}>
        <View style={styles.avatarStack}>
          <View style={[styles.avatarMini, { zIndex: 4 }]} />
          <View style={[styles.avatarMini, { zIndex: 3, marginLeft: -10 }]} />
          <View style={[styles.avatarMini, { zIndex: 2, marginLeft: -10 }]} />
          <View style={[styles.avatarMini, { zIndex: 1, marginLeft: -10 }]} />
        </View>
        {item.hasMore && <Text style={styles.moreText}>+ 4 more</Text>}
      </View>

      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => onJoinMeeting(item.id)}
      >
        <Text style={styles.detailsButtonText}>View details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1D26" />
      
      <View style={styles.mainContainer}>
        
        {/* سایدبار - در موبایل مخفی می‌شود */}
        {!isSmallScreen && (
          <View style={[styles.sidebar, { width: isSmallScreen ? 60 : 70 }]}>
            <View style={styles.sidebarTop}>
              <View style={styles.sidebarActiveUserIcon}>
                <View style={styles.userDot} />
              </View>
            </View>
            
            <View style={styles.sidebarMenu}>
              <View style={styles.menuIconContainer}>
                <View style={[styles.indicator, styles.activeIndicator]} />
                <Text style={[styles.menuIconText, styles.activeMenuIcon]}>⌂</Text>
              </View>
              <View style={styles.menuIconContainer}><Text style={styles.menuIconText}>📹</Text></View>
              <View style={styles.menuIconContainer}><Text style={styles.menuIconText}>💬</Text></View>
              <View style={styles.menuIconContainer}><Text style={styles.menuIconText}>📅</Text></View>
              <View style={styles.menuIconContainer}><Text style={styles.menuIconText}>⚙️</Text></View>
            </View>

            <View style={styles.sidebarBottom}>
              <TouchableOpacity onPress={onLogout} style={styles.sidebarAvatarBottom} />
            </View>
          </View>
        )}

        {/* محتوای اصلی */}
        <View style={styles.contentArea}>
          <ScrollView 
            style={styles.scrollContent}
            contentContainerStyle={[
              styles.scrollContentContainer,
              { minHeight: height } // فول سایز کردن محتوا
            ]}
            showsVerticalScrollIndicator={false}
          >
            
            {/* سرچ‌بار */}
            <View style={[
              styles.searchHeader,
              isSmallScreen && { flexDirection: 'column', gap: 8 }
            ]}>
              <View style={[styles.searchBarContainer, isSmallScreen && { width: '100%' }]}>
                <Text style={styles.searchIcon}>🔍</Text>
                <TextInput 
                  placeholder="Search" 
                  placeholderTextColor="#8A92A6" 
                  style={styles.searchInput}
                />
              </View>
              <TouchableOpacity style={[
                styles.categoryButton,
                isSmallScreen && { width: '100%' }
              ]}>
                <Text style={styles.categoryButtonText}>Category</Text>
                <Text style={styles.categoryArrow}>∨</Text>
              </TouchableOpacity>
            </View>

            <Text style={[
              styles.mainTitle,
              { fontSize: isSmallScreen ? 22 : 28 }
            ]}>
              Meetings
            </Text>

            {/* کارت‌های آمار */}
            <View style={[
              styles.statsOverviewContainer,
              isSmallScreen && { flexDirection: 'column', gap: 16 }
            ]}>
              <View style={[styles.overviewCard, isSmallScreen && { width: '100%' }]}>
                <View style={styles.iconWrapper}><Text style={styles.overviewIcon}>📹</Text></View>
                <View style={styles.overviewTextContent}>
                  <Text style={styles.overviewLabel}>No. of meetings</Text>
                  <View style={styles.overviewRow}>
                    <Text style={styles.overviewNumber}>36</Text>
                    <Text style={styles.overviewPeriod}>This Month</Text>
                  </View>
                </View>
              </View>
              
              {!isSmallScreen && <View style={styles.verticalDivider} />}

              <View style={[styles.overviewCard, isSmallScreen && { width: '100%' }]}>
                <View style={styles.iconWrapper}><Text style={styles.overviewIcon}>📅</Text></View>
                <View style={styles.overviewTextContent}>
                  <Text style={styles.overviewLabel}>Rescheduled meetings</Text>
                  <View style={styles.overviewRow}>
                    <Text style={styles.overviewNumber}>15</Text>
                    <Text style={styles.overviewPeriod}>This Month</Text>
                  </View>
                </View>
              </View>

              {!isSmallScreen && <View style={styles.verticalDivider} />}

              <View style={[styles.overviewCard, isSmallScreen && { width: '100%' }]}>
                <View style={styles.iconWrapper}><Text style={styles.overviewIcon}>🚫</Text></View>
                <View style={styles.overviewTextContent}>
                  <Text style={styles.overviewLabel}>Cancelled meetings</Text>
                  <View style={styles.overviewRow}>
                    <Text style={styles.overviewNumber}>21</Text>
                    <Text style={styles.overviewPeriod}>This Month</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* لیست جلسات - اسکرول افقی برای همه سایزها */}
            <View style={styles.todaySection}>
              <Text style={[
                styles.sectionTitle,
                { fontSize: isSmallScreen ? 18 : 22 }
              ]}>
                Today - 3 meetings
              </Text>
              
              <FlatList
                data={MEETINGS}
                renderItem={({ item }) => <MeetingCard item={item} />}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={true}
                contentContainerStyle={styles.horizontalListContent}
              />
            </View>

          </ScrollView>

          {/* منوی پایین برای موبایل */}
          {isSmallScreen && (
            <View style={styles.mobileBottomNav}>
              <TouchableOpacity style={styles.mobileNavItem}>
                <Text style={[styles.mobileNavIcon, styles.activeMobileNav]}>⌂</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.mobileNavItem}>
                <Text style={styles.mobileNavIcon}>📹</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.mobileNavItem}>
                <Text style={styles.mobileNavIcon}>💬</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.mobileNavItem}>
                <Text style={styles.mobileNavIcon}>📅</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onLogout} style={styles.mobileNavItem}>
                <Text style={styles.mobileNavIcon}>⚙️</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1A1D26',
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    backgroundColor: '#222634',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
  },
  sidebarTop: {
    alignItems: 'center',
  },
  sidebarActiveUserIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#3694FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  sidebarMenu: {
    flex: 1,
    justifyContent: 'center',
    gap: 30,
    width: '100%',
  },
  menuIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
  },
  indicator: {
    position: 'absolute',
    left: 0,
    width: 4,
    height: 20,
    backgroundColor: 'transparent',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  activeIndicator: {
    backgroundColor: '#3694FF',
  },
  menuIconText: {
    fontSize: 20,
    color: '#656D8A',
  },
  activeMenuIcon: {
    color: '#3694FF',
  },
  sidebarBottom: {
    marginBottom: 10,
  },
  sidebarAvatarBottom: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#A0AEC0',
  },
  contentArea: {
    flex: 1,
    backgroundColor: '#1A1D26',
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 40,
  },
  searchHeader: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#222634',
    borderRadius: 12,
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    color: '#8A92A6',
    marginRight: 10,
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
  },
  categoryButton: {
    flexDirection: 'row',
    backgroundColor: '#3694FF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    height: 48,
    gap: 8,
  },
  categoryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  categoryArrow: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  mainTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 20,
  },
  statsOverviewContainer: {
    flexDirection: 'row',
    backgroundColor: '#1F2435',
    borderWidth: 1,
    borderColor: '#2D344B',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  overviewCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 8,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#171A24',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overviewIcon: {
    fontSize: 18,
  },
  overviewTextContent: {
    flex: 1,
  },
  overviewLabel: {
    color: '#8A92A6',
    fontSize: 11,
  },
  overviewRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginTop: 4,
  },
  overviewNumber: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  overviewPeriod: {
    color: '#515974',
    fontSize: 10,
  },
  verticalDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#2D344B',
  },
  todaySection: {
    marginTop: 40,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 20,
  },
  horizontalListContent: {
    gap: 16,
    paddingRight: 20,
  },
  meetingCard: {
    backgroundColor: '#1F2435',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#2B3147',
  },
  meetingHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarMain: {
    backgroundColor: '#8A92A6',
    marginBottom: 12,
  },
  meetingInfo: {
    alignItems: 'center',
  },
  meetingName: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  meetingEmail: {
    color: '#656D8A',
    marginTop: 2,
  },
  meetingTime: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginTop: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#2B3147',
    marginVertical: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  membersText: {
    color: '#3694FF',
    fontSize: 11,
    fontWeight: '500',
  },
  pendingText: {
    color: '#FF6B6B',
    fontSize: 11,
    fontWeight: '500',
  },
  avatarGroupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
  },
  avatarStack: {
    flexDirection: 'row',
  },
  avatarMini: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#C4C4C4',
    borderWidth: 2,
    borderColor: '#1F2435',
  },
  moreText: {
    color: '#8A92A6',
    fontSize: 11,
  },
  detailsButton: {
    backgroundColor: '#3694FF',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#3694FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  detailsButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  // منوی پایین موبایل
  mobileBottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#222634',
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#2D344B',
  },
  mobileNavItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  mobileNavIcon: {
    fontSize: 24,
    color: '#656D8A',
  },
  activeMobileNav: {
    color: '#3694FF',
  },
});

export default HomeScreen;
