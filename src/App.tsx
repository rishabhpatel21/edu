import React from 'react';
import { BookOpen, Trophy, Users, GraduationCap } from 'lucide-react';
import Header from './components/Layout/Header';
import StatCard from './components/Dashboard/StatCard';
import PerformanceChart from './components/Dashboard/PerformanceChart';
import CourseProgress from './components/Dashboard/CourseProgress';
import CourseList from './components/Dashboard/CourseList';
import AssessmentList from './components/Dashboard/AssessmentList';
import { useStudentData } from './hooks/useStudentData';
import { useCourseProgress } from './hooks/useCourseProgress';
import { usePerformanceData } from './hooks/usePerformanceData';

function App() {
  const studentId = '1';
  
  const { stats, loading: statsLoading } = useStudentData(studentId);
  const { progress, loading: progressLoading } = useCourseProgress(studentId);
  const { performanceData, loading: performanceLoading } = usePerformanceData(studentId);

  if (statsLoading || progressLoading || performanceLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track your academic progress and performance metrics
          </p>
        </div>

        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Active Courses"
              value={stats.activeCourses}
              icon={BookOpen}
              trend={stats.performanceTrend}
            />
            <StatCard
              title="Average Grade"
              value={stats.averageGrade}
              icon={GraduationCap}
              trend={stats.gradeTrend}
            />
            <StatCard
              title="Completed Courses"
              value={stats.completedCourses}
              icon={Trophy}
            />
            <StatCard
              title="Class Rank"
              value={stats.classRank}
              icon={Users}
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <PerformanceChart performanceData={performanceData} />
          </div>
          <div>
            {progress && <CourseProgress {...progress} />}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CourseList studentId={studentId} />
          <AssessmentList studentId={studentId} />
        </div>
      </main>
    </div>
  );
}

export default App;