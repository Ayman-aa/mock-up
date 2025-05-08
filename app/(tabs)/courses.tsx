import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

// Mock data for courses
const INITIAL_COURSES = [
  {
    id: '1',
    name: 'Introduction to Computer Science',
    instructor: 'Dr. Alan Smith',
    progress: 75,
    startDate: '2025-01-15',
    endDate: '2025-05-30',
    color: '#4287f5'
  },
  {
    id: '2',
    name: 'Calculus II',
    instructor: 'Prof. Maria Johnson',
    progress: 60,
    startDate: '2025-01-15',
    endDate: '2025-05-30',
    color: '#f54242'
  },
  {
    id: '3',
    name: 'Physics for Engineers',
    instructor: 'Dr. Robert Chen',
    progress: 45,
    startDate: '2025-01-15',
    endDate: '2025-05-30',
    color: '#42f5a7'
  }
];
interface Course {
    id: string;
    name: string;
    instructor: string;
    progress: number;
    startDate: string;
    endDate: string;
    color: string;
};
export default function CoursesScreen() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, 'background');
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [modalVisible, setModalVisible] = useState(false);
  const [newCourse, setNewCourse] = useState({
    name: '',
    instructor: '',
    startDate: '',
    endDate: '',
    color: '#000000'
  });

  const CourseCard = ({ course }: { course: Course }) => (
    <TouchableOpacity
      style={[styles.courseCard, { borderLeftColor: course.color }]}
      onPress={() => console.log(`Course ${course.id} pressed`)}>
      <View style={styles.courseHeader}>
        <ThemedText style={styles.courseName}>{course.name}</ThemedText>
        <ThemedText style={styles.courseInstructor}>{course.instructor}</ThemedText>
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${course.progress}%`, backgroundColor: course.color }
            ]}
          />
        </View>
        <ThemedText style={styles.progressText}>{course.progress}% completed</ThemedText>
      </View>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
        headerImage={
          <View style={{ height: 120, backgroundColor, paddingTop: 50, paddingHorizontal: 20 }}>
            <View style={styles.header}>
              <ThemedText style={styles.headerTitle}>My Courses</ThemedText>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setModalVisible(true)}>
                <IconSymbol name="plus" size={22} color={colorScheme === 'dark' ? 'white' : 'black'} />
              </TouchableOpacity>
            </View>
          </View>
        }>
        <View style={styles.content}>
          {courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </View>
      </ParallaxScrollView>

      {/* This is a placeholder for the add course modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ThemedText style={styles.modalTitle}>Add New Course</ThemedText>
            {/* Form fields would go here */}
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}>
              <ThemedText style={styles.modalButtonText}>Close</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(200, 200, 200, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  courseCard: {
    borderRadius: 12,
    borderLeftWidth: 5,
    padding: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(200, 200, 200, 0.1)',
  },
  courseHeader: {
    marginBottom: 12,
  },
  courseName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  courseInstructor: {
    fontSize: 14,
    opacity: 0.7,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(200, 200, 200, 0.3)',
    borderRadius: 4,
    marginBottom: 4,
  },
  progressFill: {
    height: 8,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    opacity: 0.7,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 12,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#4287f5',
    borderRadius: 8,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});