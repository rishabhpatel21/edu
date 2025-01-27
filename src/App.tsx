import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BookOpen, GraduationCap, LineChart, Users } from 'lucide-react';

interface Student {
  full_name: string;
  student_id: string;
}

interface Course {
  code: string;
  name: string;
  credits: number;
}

interface PerformanceData {
  course: string;
  score: number;
}

function App() {
  const [student, setStudent] = useState<Student | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setError(null);
      
      // Fetch student data with error handling
      const { data: studentData, error: studentError } = await supabase
        .from('students')
        .select('*')
        .limit(1);

      if (studentError) throw studentError;
      if (studentData && studentData.length > 0) {
        setStudent(studentData[0]);
      }

      // Fetch courses
      const { data: coursesData, error: coursesError } = await supabase
        .from('courses')
        .select('*')
        .order('code');

      if (coursesError) throw coursesError;
      setCourses(coursesData || []);

      // Fetch performance data
      const { data: performanceData, error: performanceError } = await supabase
        .from('performance_records')
        .select(`
          score,
          enrollment:enrollments (
            course:courses (
              name
            )
          )
        `);

      if (performanceError) throw performanceError;
      setPerformanceData(
        performanceData?.map(record => ({
          course: record.enrollment.course.name,
          score: record.score
        })) || []
      );
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load dashboard data. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="text-red-500 mb-4">
            <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => fetchData()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No student data available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-500" />
              <h1 className="ml-3 text-2xl font-semibold text-gray-900">Student Dashboard</h1>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500">Welcome back,</span>
              <span className="ml-2 text-sm font-medium text-gray-900">{student.full_name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-8">
          <StatsCard
            title="Enrolled Courses"
            value={courses.length.toString()}
            icon={<BookOpen className="h-6 w-6 text-blue-500" />}
          />
          <StatsCard
            title="Average Score"
            value={`${calculateAverage(performanceData.map(d => d.score))}%`}
            icon={<LineChart className="h-6 w-6 text-green-500" />}
          />
          <StatsCard
            title="Total Credits"
            value={calculateTotalCredits(courses).toString()}
            icon={<Users className="h-6 w-6 text-purple-500" />}
          />
        </div>

        {/* Performance Chart */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h2>
          <div className="h-80">
            {performanceData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="course" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-500">No performance data available</p>
              </div>
            )}
          </div>
        </div>

        {/* Courses Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Enrolled Courses</h2>
          </div>
          <div className="overflow-x-auto">
            {courses.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Code
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Credits
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {courses.map((course) => (
                    <tr key={course.code}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {course.code}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.credits}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-6 text-center text-gray-500">
                No courses enrolled
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function StatsCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">{icon}</div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

function calculateAverage(numbers: number[]): string {
  if (numbers.length === 0) return '0';
  const sum = numbers.reduce((a, b) => a + b, 0);
  return (sum / numbers.length).toFixed(1);
}

function calculateTotalCredits(courses: Course[]): number {
  return courses.reduce((total, course) => total + course.credits, 0);
}

export default App;