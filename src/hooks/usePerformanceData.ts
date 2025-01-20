import { useState, useEffect } from 'react';
import { mockPerformanceRecords, mockCourses } from '../data/mockData';

export interface PerformanceData {
  courseName: string;
  score: number;
  date: string;
}

export const usePerformanceData = (studentId: string) => {
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const data = mockPerformanceRecords
        .filter(record => record.studentId === studentId)
        .map(record => {
          const course = mockCourses.find(c => c.id === record.courseId);
          return {
            courseName: course?.title || 'Unknown Course',
            score: (record.score / record.maxScore) * 100,
            date: record.completedAt,
          };
        })
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      setPerformanceData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  return { performanceData, loading, error };
};