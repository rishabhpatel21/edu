import { useState, useEffect } from 'react';
import { mockEnrollments, mockCourses } from '../data/mockData';

export interface CourseProgress {
  courseName: string;
  progress: number;
  totalModules: number;
  completedModules: number;
}

export const useCourseProgress = (studentId: string) => {
  const [progress, setProgress] = useState<CourseProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Get the most recent active enrollment
      const activeEnrollment = mockEnrollments
        .filter(e => e.studentId === studentId && e.status === 'in-progress')
        .sort((a, b) => new Date(b.enrollmentDate).getTime() - new Date(a.enrollmentDate).getTime())[0];

      if (activeEnrollment) {
        const course = mockCourses.find(c => c.id === activeEnrollment.courseId);
        if (course) {
          setProgress({
            courseName: course.title,
            progress: activeEnrollment.progress,
            totalModules: 10, // Mock total modules
            completedModules: Math.floor(activeEnrollment.progress / 10),
          });
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  return { progress, loading, error };
};