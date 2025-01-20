import React from 'react';
import { LineChart, Activity } from 'lucide-react';

interface PerformanceData {
  courseName: string;
  score: number;
  date: string;
}

interface Props {
  performanceData: PerformanceData[];
}

export default function PerformanceChart({ performanceData }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-600" />
          Performance Trends
        </h2>
        <LineChart className="w-5 h-5 text-gray-400" />
      </div>
      <div className="h-64 flex items-center justify-center">
        {performanceData.length === 0 ? (
          <p className="text-gray-500">No performance data available</p>
        ) : (
          <div className="w-full h-full">
            {/* Chart implementation will go here */}
            <p className="text-center text-gray-600">Performance visualization coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
}