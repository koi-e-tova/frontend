'use client'
import React from 'react'
import { useReports } from './ReportsContext'

export function TopNumbersToday() {
  const {
    topNumbers,
    loadingTopNumbers,
    errorTopNumbers
  } = useReports()

  if (loadingTopNumbers) return <p>Loading top numbers...</p>
  if (errorTopNumbers) return <p className="text-red-600">Error: {errorTopNumbers}</p>
  if (topNumbers.length === 0) return null

  return (
    <div className="bg-white dark:bg-gray-800 p-6 shadow-md rounded-md my-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Today&rsquo;s Top 5
      </h2>
      <ul className="space-y-2">
        {topNumbers.map((item) => (
          <li
            key={item.phone_number}
            className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-1 text-sm"
          >
            <span className="font-mono text-gray-900 dark:text-gray-100">
              {item.phone_number}
            </span>
            <span className="text-gray-500 dark:text-gray-400">
              {item.report_count} reports
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
