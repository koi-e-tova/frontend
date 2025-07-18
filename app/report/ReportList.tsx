'use client'
import React from 'react'
import { useReports } from './ReportsContext'

export default function ReportList() {
  const { reports, loading, error } = useReports()

  if (loading) return <p>Loading reports...</p>
  if (error) return <p className="text-red-600">Error: {error}</p>
  if (reports.length === 0) return <p>No reports found.</p>

  return (
    <ul className="space-y-3">
      {reports.map((r) => (
        <li key={r.id} className="border p-3 rounded bg-white shadow-sm">
          <p>
            <strong>📱 Phone:</strong> {r.phone_number}
          </p>
          <p>
            <strong>🕵️ Type:</strong> {r.type}
          </p>
          <p>
            <strong>📝 Description:</strong> {r.description}
          </p>
          <p className="text-sm text-gray-500">
            ⏱ {new Date(r.reported_at).toLocaleString('bg-BG', { timeZone: 'Europe/Sofia' })}
          </p>
        </li>
      ))}
    </ul>
  )
}
