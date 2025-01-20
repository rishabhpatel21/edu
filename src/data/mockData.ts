// Mock data for testing and evaluation
export const mockStudents = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    gradeLevel: 11,
    enrollmentDate: '2023-09-01',
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    gradeLevel: 12,
    enrollmentDate: '2023-09-01',
  },
];

export const mockCourses = [
  {
    id: '1',
    title: 'Advanced Mathematics',
    description: 'Complex mathematical concepts and problem-solving techniques',
    category: 'Mathematics',
    difficultyLevel: 'Advanced',
    credits: 3,
  },
  {
    id: '2',
    title: 'Physics Fundamentals',
    description: 'Introduction to basic physics principles',
    category: 'Science',
    difficultyLevel: 'Intermediate',
    credits: 4,
  },
  {
    id: '3',
    title: 'World Literature',
    description: 'Study of classic literature from around the world',
    category: 'English',
    difficultyLevel: 'Intermediate',
    credits: 3,
  },
  {
    id: '4',
    title: 'Computer Science 101',
    description: 'Introduction to programming and computer science concepts',
    category: 'Technology',
    difficultyLevel: 'Beginner',
    credits: 4,
  },
];

export const mockEnrollments = [
  {
    id: '1',
    studentId: '1',
    courseId: '1',
    progress: 65,
    status: 'in-progress',
    enrollmentDate: '2023-09-05',
  },
  {
    id: '2',
    studentId: '1',
    courseId: '2',
    progress: 80,
    status: 'in-progress',
    enrollmentDate: '2023-09-05',
  },
];

export const mockPerformanceRecords = [
  {
    id: '1',
    studentId: '1',
    courseId: '1',
    assessmentType: 'Quiz',
    score: 85,
    maxScore: 100,
    completedAt: '2023-10-01',
  },
  {
    id: '2',
    studentId: '1',
    courseId: '1',
    assessmentType: 'Midterm',
    score: 78,
    maxScore: 100,
    completedAt: '2023-11-15',
  },
  {
    id: '3',
    studentId: '1',
    courseId: '2',
    assessmentType: 'Quiz',
    score: 92,
    maxScore: 100,
    completedAt: '2023-10-10',
  },
];