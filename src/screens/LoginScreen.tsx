// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';

type LoginResult = {
  userId: string;
  username: string;
};

type LoginScreenProps = {
  onLoginSuccess: (session: LoginResult) => void;
};

const { height: screenHeight } = Dimensions.get('window');

const LoginScreen = ({ onLoginSuccess }: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please enter email and password');
      return;
    }

    setError(null);
    setIsSubmitting(true);
    
    console.log('[Login] Logging in with:', email);
    
    setTimeout(() => {
      setIsSubmitting(false);
      const mockSession: LoginResult = {
        userId: `user_${Date.now()}`,
        username: email.split('@')[0] || email,
      };
      onLoginSuccess(mockSession);
    }, 500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1C1F2E" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.contentWrapper}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.welcomeText}>Welcome</Text>
            </View>

            {/* Form Card */}
            <View style={styles.formCard}>
              {/* Email Field */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="#6B7280"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              {/* Password Field */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="#6B7280"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              {/* Forgot Password */}
              <Pressable style={styles.forgotButton}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </Pressable>

              {/* Login Button */}
              <Pressable
                onPress={handleLogin}
                disabled={isSubmitting}
                style={({ pressed }) => [
                  styles.loginButton,
                  pressed && styles.buttonPressed,
                  isSubmitting && styles.buttonDisabled,
                ]}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.loginButtonText}>Log in</Text>
                )}
              </Pressable>

              {/* Sign Up Link */}
              <View style={styles.signupRow}>
                <Text style={styles.signupText}>Didn't have an account? </Text>
                <Pressable>
                  <Text style={styles.signupLink}>Sign up</Text>
                </Pressable>
              </View>

              {/* OR Divider */}
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Social Buttons */}
              <Pressable style={styles.socialButton}>
                <Text style={styles.socialButtonText}>Continue with Google</Text>
              </Pressable>

              <Pressable style={styles.socialButton}>
                <Text style={styles.socialButtonText}>Continue with Apple</Text>
              </Pressable>

              {/* Footer Links */}
              <View style={styles.footerLinks}>
                <Pressable>
                  <Text style={styles.footerLink}>Terms of user</Text>
                </Pressable>
                <Text style={styles.footerSeparator}>|</Text>
                <Pressable>
                  <Text style={styles.footerLink}>Privacy policy</Text>
                </Pressable>
              </View>

              {error && <Text style={styles.error}>{error}</Text>}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1C1F2E',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    minHeight: screenHeight, // مهم: حتماً کل صفحه رو پر کنه
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center', // محتوا رو وسط می‌چینه
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FAFAFB',
    letterSpacing: 1,
  },
  formCard: {
    backgroundColor: '#FAFAFB',
    borderRadius: 24,
    padding: 24,
    borderWidth: 2,
    borderColor: '#3694FF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#343434',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#1C1F2E',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotText: {
    color: '#3694FF',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#3694FF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonPressed: {
    opacity: 0.9,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  signupText: {
    color: '#8A8A8A',
    fontSize: 14,
  },
  signupLink: {
    color: '#3694FF',
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    color: '#8A8A8A',
    paddingHorizontal: 16,
    fontSize: 12,
  },
  socialButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  socialButtonText: {
    color: '#343434',
    fontSize: 14,
    fontWeight: '500',
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  footerLink: {
    color: '#8A8A8A',
    fontSize: 12,
  },
  footerSeparator: {
    color: '#E0E0E0',
    marginHorizontal: 8,
    fontSize: 12,
  },
  error: {
    color: '#EF4444',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 16,
  },
});

export default LoginScreen;