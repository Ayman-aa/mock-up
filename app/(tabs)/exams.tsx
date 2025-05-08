import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

// Define the Exam interface
interface Exam {
  id: string;
  title: string;
  course: string;
  date: string;
  time: string;
  location: string;
  studyProgress: number;
  color: string;
}

// Mock data for exams
const INITIAL_EXAMS: Exam[] = [
  {
    id: '1',
    title: 'Midterm Exam',
    course: 'Introduction to Computer Science',
    date: '2025-03-15',
    time: '10:00 AM',
    location: 'Room 301',
    studyProgress: 65,
    color: '#4287f5',
  },
  {
    id: '2',
    title: 'Quiz 2',
    course: 'Calculus II',
    date: '2025-02-28',
    time: '2:30 PM',
    location: 'Room 205',
    studyProgress: 40,
    color: '#f54242',
  },
  {
    id: '3',
    title: 'Lab Test',
    course: 'Physics for Engineers',
    date: '2025-03-05',
    time: '3:00 PM',
    location: 'Science Lab 2',
    studyProgress: 75,
    color: '#42f5a7',
  },
];

export default function ExamsScreen() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, 'background');
  const [exams, setExams] = useState(INITIAL_EXAMS);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedView, setSelectedView] = useState('upcoming'); // 'upcoming' or 'calendar'

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const ExamCard = ({ exam }: { exam: Exam }) => (
    <TouchableOpacity
      style={[styles.examCard, { borderLeftColor: exam.color }]}
      onPress={() => console.log(`Exam ${exam.id} pressed`)}>
      <View style={styles.examHeader}>
        <ThemedText style={styles.examTitle}>{exam.title}</ThemedText>
        <ThemedText style={styles.examCourse}>{exam.course}</ThemedText>
      </View>
      <View style={styles.examDetails}>
        <View style={styles.examDetail}>
          <IconSymbol name="calendar" size={16} color={colorScheme === 'dark' ? '#ccc' : '#666'} />
          <ThemedText style={styles.examDetailText}>{formatDate(exam.date)}</ThemedText>
        </View>
        <View style={styles.examDetail}>
          <IconSymbol name="clock.fill" size={16} color={colorScheme === 'dark' ? '#ccc' : '#666'} />
          <ThemedText style={styles.examDetailText}>{exam.time}</ThemedText>
        </View>
        <View style={styles.examDetail}>
          <IconSymbol name="mappin.circle.fill" size={16} color={colorScheme === 'dark' ? '#ccc' : '#666'} />
          <ThemedText style={styles.examDetailText}>{exam.location}</ThemedText>
        </View>
      </View>
      <View style={styles.studyProgressContainer}>
        <View style={styles.studyProgressBar}>
          <View
            style={[
              styles.studyProgressFill,
              { width: `${exam.studyProgress}%`, backgroundColor: exam.color }
            ]}
          />
        </View>
        <ThemedText style={styles.studyProgressText}>Study Progress: {exam.studyProgress}%</ThemedText>
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
              <ThemedText style={styles.headerTitle}>My Exams</ThemedText>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setModalVisible(true)}>
                <IconSymbol name="plus" size={22} color={colorScheme === 'dark' ? 'white' : 'black'} />
              </TouchableOpacity>
            </View>
            <View style={styles.viewToggle}>
              <TouchableOpacity
                style={[
                  styles.viewToggleButton,
                  selectedView === 'upcoming' && styles.viewToggleButtonActive,
                ]}
                onPress={() => setSelectedView('upcoming')}>
                <ThemedText
                  style={[
                    styles.viewToggleText,
                    selectedView === 'upcoming' && styles.viewToggleTextActive,
                  ]}>
                  Upcoming
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.viewToggleButton,
                  selectedView === 'calendar' && styles.viewToggleButtonActive,
                ]}
                onPress={() => setSelectedView('calendar')}>
                <ThemedText
                  style={[
                    styles.viewToggleText,
                    selectedView === 'calendar' && styles.viewToggleTextActive,
                  ]}>
                  Calendar
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        }>
        <View style={styles.content}>
          {selectedView === 'upcoming' ? (
            <FlatList
              data={exams}
              renderItem={({ item }) => <ExamCard exam={item} />}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          ) : (
            <View style={styles.calendarPlaceholder}>
              <ThemedText>Calendar view coming soon</ThemedText>
            </View>
          )}
        </View>
      </ParallaxScrollView>

      {/* This is a placeholder for the add exam modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ThemedText style={styles.modalTitle}>Add New Exam</ThemedText>
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
  viewToggle: {
    flexDirection: 'row',
    marginTop: 16,
  },
  viewToggleButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  viewToggleButtonActive: {
    backgroundColor: 'rgba(200, 200, 200, 0.3)',
  },
  viewToggleText: {
    fontSize: 14,
  },
  viewToggleTextActive: {
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  examCard: {
    borderRadius: 12,
    borderLeftWidth: 5,
    padding: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(200, 200, 200, 0.1)',
  },
  examHeader: {
    marginBottom: 12,
  },
  examTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  examCourse: {
    fontSize: 14,
    opacity: 0.7,
  },
  examDetails: {
    marginBottom: 12,
  },
  examDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  examDetailText: {
    fontSize: 14,
    marginLeft: 8,
  },
  studyProgressContainer: {
    marginTop: 8,
  },
  studyProgressBar: {
    height: 8,
    backgroundColor: 'rgba(200, 200, 200, 0.3)',
    borderRadius: 4,
    marginBottom: 4,
  },
  studyProgressFill: {
    height: 8,
    borderRadius: 4,
  },
  studyProgressText: {
    fontSize: 12,
    opacity: 0.7,
  },
  calendarPlaceholder: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(200, 200, 200, 0.3)',
    borderRadius: 12,
    borderStyle: 'dashed',
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