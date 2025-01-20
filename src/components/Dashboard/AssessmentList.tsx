import React from 'react';
import { ClipboardList } from 'lucide-react';
import { mockPerformanceRecords, mockCourses } from '../../data/mockData';

interface AssessmentListProps {
  studentId: string;
}

export default function AssessmentList({ studentId }: AssessmentListProps) {
  const assessments = mockPerformanceRecords
    .filter(record => record.studentId === studentId)
    .map(record => ({
      ...record,
      course: mockCourses.find(c => c.id === record.courseId),
    }))
    .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Assessments</h3>
      <div className="space-y-4">
        {assessments.map(assessment => (
          <div key={assessment.id} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <ClipboardList className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{assessment.course?.title}</h4>
                  <p className="text-sm text-gray-500">{assessment.assessmentType}</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-semibold text-gray-900">
                    {assessment.score}/{assessment.maxScore}
                  </span>
                  <p className="text-sm text-gray-500">
                    {new Date(assessment.completedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}