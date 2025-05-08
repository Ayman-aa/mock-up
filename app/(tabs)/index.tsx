import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

// Mock data
const NEXT_DEADLINES = [
  {
    id: '1',
    title: 'Quiz 2',
    course: 'Calculus II',
    date: '2025-05-15',
    type: 'Exam',
    color: '#f54242',
  },
  {
    id: '2',
    title: 'Assignment 3',
    course: 'Introduction to Computer Science',
    date: '2025-05-10',
    type: 'Assignment',
    color: '#4287f5',
  },
  {
    id: '3',
    title: 'Lab Report',
    course: 'Physics for Engineers',
    date: '2025-05-18',
    type: 'Assignment',
    color: '#42f5a7',
  },
];

const CURRENT_COURSES = [
  {
    id: '1',
    name: 'Introduction to Computer Science',
    progress: 75,
    color: '#4287f5',
  },
  {
    id: '2',
    name: 'Calculus II',
    progress: 60,
    color: '#f54242',
  },
  {
    id: '3',
    name: 'Physics for Engineers',
    progress: 45,
    color: '#42f5a7',
  },
];

const WEEKLY_STATS = {
  studyHours: 14.5,
  completedTasks: 8,
  upcomingExams: 2,
};

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, 'background');
  const currentDate = new Date();
  
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(currentDate);
  
  const formatDeadlineDate = (dateString: string): string => {
    const deadlineDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const timeDiff = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (timeDiff === 0) return 'Today';
    if (timeDiff === 1) return 'Tomorrow';
    if (timeDiff < 7) return `In ${timeDiff} days`;
    
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(deadlineDate);
  };
  
  const CourseProgressCard: React.FC<{ course: typeof CURRENT_COURSES[number] }> = ({ course }) => (
    <TouchableOpacity 
      style={[styles.courseCard, { borderLeftColor: course.color }]}
      onPress={() => router.push('/courses' as any)}>
      <ThemedText style={styles.courseCardName} numberOfLines={1}>{course.name}</ThemedText>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[styles.progressFill, { width: `${course.progress}%`, backgroundColor: course.color }]} 
          />
        </View>
        <ThemedText style={styles.progressText}>{course.progress}%</ThemedText>
      </View>
    </TouchableOpacity>
  );
  
  const DeadlineCard: React.FC<{ deadline: typeof NEXT_DEADLINES[number] }> = ({ deadline }) => (
    <TouchableOpacity
      style={[styles.deadlineCard, { borderLeftColor: deadline.color }]}
      onPress={() => deadline.type === 'Exam' ? router.push('/exams' as any) : router.push('/courses' as any)}>
      <View style={styles.deadlineHeader}>
        <View style={[styles.deadlineType, { backgroundColor: deadline.color + '30' }]}>
          <ThemedText style={[styles.deadlineTypeText, { color: deadline.color }]}>
            {deadline.type}
          </ThemedText>
        </View>
        <ThemedText style={styles.deadlineDate}>{formatDeadlineDate(deadline.date)}</ThemedText>
      </View>
      <ThemedText style={styles.deadlineTitle}>{deadline.title}</ThemedText>
      <ThemedText style={styles.deadlineCourse} numberOfLines={1}>{deadline.course}</ThemedText>
    </TouchableOpacity>
  );
  
  // Updated StatCard to use icons available in the MAPPING
  const StatCard: React.FC<{ icon: string; value: number | string; label: string }> = ({ icon, value, label }) => (
    <View style={styles.statCard}>
      <View style={{ width: 24, height: 24, alignItems: 'center', justifyContent: 'center' }}>
        {/* Using icons that are defined in the mapping */}
                <IconSymbol name={icon as any} size={24} color={colorScheme === 'dark' ? '#ccc' : '#666'} />
      </View>
      <ThemedText style={styles.statValue}>{value}</ThemedText>
      <ThemedText style={styles.statLabel}>{label}</ThemedText>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
        headerImage={
          <View style={{ height: 120, backgroundColor, paddingTop: 50, paddingHorizontal: 20 }}>
            <View style={styles.header}>
              <View>
                <ThemedText style={styles.dateText}>{formattedDate}</ThemedText>
                <ThemedText style={styles.headerTitle}>My Dashboard</ThemedText>
              </View>
              <TouchableOpacity style={styles.profileButton}>
                <IconSymbol name="chevron.right" size={32} color={colorScheme === 'dark' ? 'white' : 'black'} />
              </TouchableOpacity>
            </View>
          </View>
        }>
        
        <View style={styles.content}>
          {/* Weekly Stats */}
          <View style={styles.statsContainer}>
            <StatCard 
              icon="chevron.right"
              value={`${WEEKLY_STATS.studyHours}h`}
              label="Study time"
            />
            <StatCard 
              icon="chevron.right"
              value={WEEKLY_STATS.completedTasks}
              label="Completed"
            />
            <StatCard 
              icon="chevron.right"
              value={WEEKLY_STATS.upcomingExams}
              label="Exams"
            />
          </View>
          
          {/* Current Courses */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <ThemedText style={styles.sectionTitle}>Current Courses</ThemedText>
              <TouchableOpacity onPress={() => router.push('/courses' as any)}>
                <ThemedText style={styles.seeAllText}>See all</ThemedText>
              </TouchableOpacity>
            </View>
            
            {CURRENT_COURSES.map(course => (
              <CourseProgressCard key={course.id} course={course} />
            ))}
          </View>
          
          {/* Upcoming Deadlines */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <ThemedText style={styles.sectionTitle}>Upcoming Deadlines</ThemedText>
              <TouchableOpacity onPress={() => router.push('/exams' as any)}>
                <ThemedText style={styles.seeAllText}>See all</ThemedText>
              </TouchableOpacity>
            </View>
            
            {NEXT_DEADLINES.map(deadline => (
              <DeadlineCard key={deadline.id} deadline={deadline} />
            ))}
          </View>
          
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
    alignItems: 'flex-start',
  },
  dateText: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(200, 200, 200, 0.1)',
    marginHorizontal: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAllText: {
    fontSize: 14,
    opacity: 0.7,
  },
  courseCard: {
    borderRadius: 12,
    borderLeftWidth: 5,
    padding: 16,
    marginBottom: 8,
    backgroundColor: 'rgba(200, 200, 200, 0.1)',
  },
  courseCardName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(200, 200, 200, 0.3)',
    borderRadius: 4,
    marginRight: 8,
  },
  progressFill: {
    height: 8,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    opacity: 0.7,
    width: 30,
  },
  deadlineCard: {
    borderRadius: 12,
    borderLeftWidth: 5,
    padding: 16,
    marginBottom: 8,
    backgroundColor: 'rgba(200, 200, 200, 0.1)',
  },
  deadlineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  deadlineType: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  deadlineTypeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  deadlineDate: {
    fontSize: 12,
    opacity: 0.7,
  },
  deadlineTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  deadlineCourse: {
    fontSize: 14,
    opacity: 0.7,
  },
});
