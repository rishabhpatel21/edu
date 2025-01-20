import { useState, useEffect } from 'react';
import { mockPerformanceRecords, mockEnrollments, mockCourses } from '../data/mockData';

export interface StudentStats {
  activeCourses: number;
  averageGrade: string;
  completedCourses: number;
  classRank: string;
  performanceTrend: { value: number; isPositive: boolean };
  gradeTrend: { value: number; isPositive: boolean };
}

export const useStudentData = (studentId: string) => {
  const [stats, setStats] = useState<StudentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Calculate active courses
      const activeEnrollments = mockEnrollments.filter(
        e => e.studentId === studentId && e.status === 'in-progress'
      );
      
      // Calculate average grade
      const performances = mockPerformanceRecords.filter(p => p.studentId === studentId);
      const averageGrade = performances.reduce((acc, curr) => 
        acc + (curr.score / curr.maxScore) * 100, 0) / performances.length;
      
      // Count completed courses
      const completedCourses = mockEnrollments.filter(
        e => e.studentId === studentId && e.progress === 100
      ).length;

      setStats({
        activeCourses: activeEnrollments.length,
        averageGrade: `${Math.round(averageGrade)}%`,
        completedCourses,
        classRank: '15/120', // Mock rank
        performanceTrend: { value: 12, isPositive: true },
        gradeTrend: { value: 5, isPositive: true },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  return { stats, loading, error };
};