import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="flex-1 space-y-3 animate-pulse p-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"
          style={{ width: `${Math.floor(Math.random() * 40 + 60)}%` }}
        ></div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
