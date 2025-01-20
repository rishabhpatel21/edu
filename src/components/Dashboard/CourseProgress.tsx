import React from 'react';
import { BookOpen } from 'lucide-react';

interface CourseProgressProps {
  courseName: string;
  progress: number;
  totalModules: number;
  completedModules: number;
}

export default function CourseProgress({
  courseName,
  progress,
  totalModules,
  completedModules,
}: CourseProgressProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-3 mb-4">
        <BookOpen className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-semibold text-gray-800">{courseName}</h3>
      </div>
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-600">Progress</span>
          <span className="text-sm font-medium text-gray-900">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 rounded-full h-2 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span>{completedModules} of {totalModules} modules completed</span>
      </div>
    </div>
  );
}