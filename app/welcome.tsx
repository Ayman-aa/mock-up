import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function WelcomeScreen() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, 'background');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const slides = [
    {
      title: 'Track your academic journey',
      description: 'Keep all your courses, assignments, and exams in one place for easy tracking and management.',
      icon: 'graduationcap.fill',
    },
    {
      title: 'Monitor your progress',
      description: 'Visualize your academic progress with intuitive charts and stay on top of deadlines.',
      icon: 'chart.bar.fill',
    },
    {
      title: 'Achieve your goals',
      description: 'Set study goals, track your time, and improve your academic performance.',
      icon: 'star.fill',
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setShowLogin(true);
    }
  };

  const handleLogin = () => {
    router.replace('/(tabs)');
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ThemedView style={styles.container}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        
        <View style={styles.content}>
          {!showLogin ? (
            <>
              <View style={styles.iconContainer}>
                <IconSymbol 
                  name={slides[currentSlide].icon as any} 
                  size={80} 
                  color={colorScheme === 'dark' ? '#fff' : '#2196F3'} 
                />
              </View>
              
              <ThemedText style={styles.title}>{slides[currentSlide].title}</ThemedText>
              <ThemedText style={styles.description}>{slides[currentSlide].description}</ThemedText>
              
              <View style={styles.dotsContainer}>
                {slides.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.dot,
                      { 
                        backgroundColor: index === currentSlide 
                          ? (colorScheme === 'dark' ? '#fff' : '#2196F3') 
                          : 'rgba(150, 150, 150, 0.5)'
                      }
                    ]}
                  />
                ))}
              </View>
            </>
          ) : (
            <View style={styles.loginContainer}>
              <IconSymbol 
                name="person.circle.fill" 
                size={60} 
                color={colorScheme === 'dark' ? '#fff' : '#2196F3'} 
                style={styles.loginIcon}
              />
              
              <ThemedText style={styles.title}>Welcome Back</ThemedText>
              <ThemedText style={styles.description}>
                Sign in to continue tracking your academic progress
              </ThemedText>
              
              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <IconSymbol 
                    name="person.fill" 
                    size={20} 
                    color={colorScheme === 'dark' ? '#ccc' : '#666'} 
                  />
                  <TextInput
                    style={[
                      styles.input, 
                      { color: colorScheme === 'dark' ? '#fff' : '#000' }
                    ]}
                    placeholder="Username"
                    placeholderTextColor={colorScheme === 'dark' ? '#999' : '#999'}
                    value={username}
                    onChangeText={setUsername}
                  />
                </View>
                
                <View style={styles.inputWrapper}>
                  <IconSymbol 
                    name="lock.fill" 
                    size={20} 
                    color={colorScheme === 'dark' ? '#ccc' : '#666'} 
                  />
                  <TextInput
                    style={[
                      styles.input, 
                      { color: colorScheme === 'dark' ? '#fff' : '#000' }
                    ]}
                    placeholder="Password"
                    placeholderTextColor={colorScheme === 'dark' ? '#999' : '#999'}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>
              </View>
            </View>
          )}
        </View>
        
        <View style={styles.bottomContainer}>
          {!showLogin ? (
            <>
              <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                <ThemedText style={styles.skipText}>Skip</ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <ThemedText style={styles.nextText}>Next</ThemedText>
                <IconSymbol name="chevron.right" size={20} color="#fff" />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                <ThemedText style={styles.skipText}>Continue as Guest</ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.nextButton, styles.loginButton]} 
                onPress={handleLogin}>
                <ThemedText style={styles.nextText}>Login</ThemedText>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(150, 150, 150, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: 40,
    lineHeight: 22,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  skipButton: {
    padding: 12,
  },
  skipText: {
    fontSize: 16,
    opacity: 0.7,
  },
  nextButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  loginContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  loginIcon: {
    marginBottom: 24,
  },
  inputContainer: {
    width: '100%',
    marginTop: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.3)',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    height: 50,
  },
  input: {
    flex: 1,
    height: 50,
    marginLeft: 10,
    fontSize: 16,
  },
  loginButton: {
    paddingHorizontal: 32,
  },
});