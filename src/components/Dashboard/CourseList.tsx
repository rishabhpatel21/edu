import React from 'react';
import { Book } from 'lucide-react';
import { mockCourses, mockEnrollments } from '../../data/mockData';

interface CourseListProps {
  studentId: string;
}

export default function CourseList({ studentId }: CourseListProps) {
  const enrolledCourses = mockEnrollments
    .filter(e => e.studentId === studentId)
    .map(enrollment => {
      const course = mockCourses.find(c => c.id === enrollment.courseId);
      return { ...course, progress: enrollment.progress };
    });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Enrolled Courses</h3>
      <div className="space-y-4">
        {enrolledCourses.map(course => (
          <div key={course?.id} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Book className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{course?.title}</h4>
              <p className="text-sm text-gray-500">{course?.description}</p>
              <div className="mt-2">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{course?.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 rounded-full h-2 transition-all duration-300"
                    style={{ width: `${course?.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}