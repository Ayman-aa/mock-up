import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

// Mock data for progress
const MOCK_COURSES = [
  { id: '1', name: 'Introduction to Computer Science', grade: 'A', progress: 75, color: '#4287f5' },
  { id: '2', name: 'Calculus II', grade: 'B+', progress: 60, color: '#f54242' },
  { id: '3', name: 'Physics for Engineers', grade: 'A-', progress: 45, color: '#42f5a7' },
];

const MOCK_WEEKLY_STUDY = [
  { day: 'Mon', hours: 2 },
  { day: 'Tue', hours: 3.5 },
  { day: 'Wed', hours: 1 },
  { day: 'Thu', hours: 4 },
  { day: 'Fri', hours: 2.5 },
  { day: 'Sat', hours: 1 },
  { day: 'Sun', hours: 0.5 },
];

export default function ProgressScreen() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const [activeView, setActiveView] = useState('grades'); // 'grades', 'completion', 'goals'
  
  const totalWeeklyStudyHours = MOCK_WEEKLY_STUDY.reduce((total, day) => total + day.hours, 0);
  const maxHours = Math.max(...MOCK_WEEKLY_STUDY.map(day => day.hours));
  
  const calculateGPA = () => {
    const gradePoints: Record<string, number> = {
      'A+': 4.3, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'D-': 0.7,
      'F': 0.0
    };
    
    let totalPoints = 0;
    MOCK_COURSES.forEach(course => {
      totalPoints += gradePoints[course.grade] || 0;
    });
    
    return (totalPoints / MOCK_COURSES.length).toFixed(2);
  };

  const renderGradesView = () => (
    <View style={styles.sectionContainer}>
      <View style={styles.gpaContainer}>
        <ThemedText style={styles.gpaValue}>{calculateGPA()}</ThemedText>
        <ThemedText style={styles.gpaLabel}>Cumulative GPA</ThemedText>
      </View>
      
      <ThemedText style={styles.sectionTitle}>Course Grades</ThemedText>
      {MOCK_COURSES.map(course => (
        <View key={course.id} style={[styles.gradeRow, { borderLeftColor: course.color, borderLeftWidth: 3 }]}>
          <ThemedText style={styles.courseNameText}>{course.name}</ThemedText>
          <View style={[styles.gradeBox, { backgroundColor: course.color }]}>
            <ThemedText style={styles.gradeText}>{course.grade}</ThemedText>
          </View>
        </View>
      ))}
    </View>
  );
  
  const renderCompletionView = () => (
    <View style={styles.sectionContainer}>
      <ThemedText style={styles.sectionTitle}>Course Completion</ThemedText>
      {MOCK_COURSES.map(course => (
        <View key={course.id} style={styles.completionRow}>
          <ThemedText style={styles.courseNameText}>{course.name}</ThemedText>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${course.progress}%`, backgroundColor: course.color }
                ]}
              />
            </View>
            <ThemedText style={styles.progressBarText}>{course.progress}%</ThemedText>
          </View>
        </View>
      ))}
      
      <ThemedText style={[styles.sectionTitle, { marginTop: 24 }]}>Study Hours</ThemedText>
      <ThemedText style={styles.studySummary}>
        You studied <ThemedText style={styles.highlightText}>{totalWeeklyStudyHours} hours</ThemedText> this week
      </ThemedText>
      
      <View style={styles.chartContainer}>
        {MOCK_WEEKLY_STUDY.map((day, index) => (
          <View key={index} style={styles.chartBar}>
            <View 
              style={[
                styles.bar, 
                { 
                  height: (day.hours / maxHours) * 120, 
                  backgroundColor: day.hours > 3 ? '#4CAF50' : day.hours > 1.5 ? '#2196F3' : '#FFC107'
                }
              ]} 
            />
            <ThemedText style={styles.barLabel}>{day.day}</ThemedText>
          </View>
        ))}
      </View>
    </View>
  );
  
  const renderGoalsView = () => (
    <View style={styles.sectionContainer}>
      <ThemedText style={styles.sectionTitle}>Study Goals</ThemedText>
      
      <View style={styles.goalCard}>
        <View style={styles.goalHeader}>
          <ThemedText style={styles.goalTitle}>Daily Study Goal</ThemedText>
          <View style={styles.goalBadge}>
            <ThemedText style={styles.goalBadgeText}>2.5 hrs</ThemedText>
          </View>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBarFill,
                { width: '60%', backgroundColor: '#4CAF50' }
              ]}
            />
          </View>
          <ThemedText style={styles.progressBarText}>60% achieved</ThemedText>
        </View>
      </View>
      
      <View style={styles.goalCard}>
        <View style={styles.goalHeader}>
          <ThemedText style={styles.goalTitle}>Weekly Study Goal</ThemedText>
          <View style={styles.goalBadge}>
            <ThemedText style={styles.goalBadgeText}>15 hrs</ThemedText>
          </View>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${(totalWeeklyStudyHours / 15) * 100}%`, backgroundColor: '#2196F3' }
              ]}
            />
          </View>
          <ThemedText style={styles.progressBarText}>
            {((totalWeeklyStudyHours / 15) * 100).toFixed(0)}% achieved
          </ThemedText>
        </View>
      </View>
      
      <TouchableOpacity style={styles.addGoalButton}>
        <IconSymbol name="plus" size={16} color={colorScheme === 'dark' ? 'white' : 'black'} />
        <ThemedText style={styles.addGoalText}>Add New Goal</ThemedText>
      </TouchableOpacity>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
        headerImage={
          <View style={{ height: 120, backgroundColor, paddingTop: 50, paddingHorizontal: 20 }}>
            <View style={styles.header}>
              <ThemedText style={styles.headerTitle}>My Progress</ThemedText>
            </View>
            <View style={styles.tabs}>
              <TouchableOpacity
                style={[styles.tab, activeView === 'grades' && styles.activeTab]}
                onPress={() => setActiveView('grades')}>
                <ThemedText 
                  style={[styles.tabText, activeView === 'grades' && styles.activeTabText]}>
                  Grades
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, activeView === 'completion' && styles.activeTab]}
                onPress={() => setActiveView('completion')}>
                <ThemedText 
                  style={[styles.tabText, activeView === 'completion' && styles.activeTabText]}>
                  Completion
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, activeView === 'goals' && styles.activeTab]}
                onPress={() => setActiveView('goals')}>
                <ThemedText 
                  style={[styles.tabText, activeView === 'goals' && styles.activeTabText]}>
                  Goals
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        }>
        <View style={styles.content}>
          {activeView === 'grades' && renderGradesView()}
          {activeView === 'completion' && renderCompletionView()}
          {activeView === 'goals' && renderGoalsView()}
        </View>
      </ParallaxScrollView>

      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  tabs: {
    flexDirection: 'row',
    marginTop: 16,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  activeTab: {
    backgroundColor: 'rgba(200, 200, 200, 0.3)',
  },
  tabText: {
    fontSize: 14,
  },
  activeTabText: {
    fontWeight: 'bold',
  },
  sectionContainer: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 8,
  },
  gpaContainer: {
    alignItems: 'center',
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(200, 200, 200, 0.1)',
  },
  gpaValue: {
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  gpaLabel: {
    fontSize: 16,
    opacity: 0.7,
  },
  gradeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 8,
    backgroundColor: 'rgba(200, 200, 200, 0.1)',
    borderRadius: 8,
  },
  courseNameText: {
    flex: 1,
    fontSize: 16,
  },
  gradeBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  completionRow: {
    marginBottom: 16,
  },
  progressBarContainer: {
    marginTop: 8,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: 'rgba(200, 200, 200, 0.3)',
    borderRadius: 4,
  },
  progressBarFill: {
    height: 8,
    borderRadius: 4,
  },
  progressBarText: {
    fontSize: 12,
    marginTop: 4,
    opacity: 0.7,
    textAlign: 'right',
  },
  studySummary: {
    marginBottom: 16,
    fontSize: 16,
  },
  highlightText: {
    fontWeight: 'bold',
  },
  chartContainer: {
    height: 160,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  chartBar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bar: {
    width: 20,
    borderRadius: 4,
  },
  barLabel: {
    marginTop: 8,
    fontSize: 12,
  },
  goalCard: {
    padding: 16,
    backgroundColor: 'rgba(200, 200, 200, 0.1)',
    borderRadius: 12,
    marginBottom: 16,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  goalBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  goalBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  addGoalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: 'rgba(200, 200, 200, 0.3)',
    borderRadius: 12,
    marginTop: 8,
  },
  addGoalText: {
    marginLeft: 8,
    fontWeight: 'bold',
  },
});