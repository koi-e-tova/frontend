'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export type PhoneReport = {
  id: number
  phone_number: string
  type: string
  description: string
  reported_at: string
  reporter_id: string
  hcaptcha_token: string
}

type ReportsContextType = {
  reports: PhoneReport[]
  loading: boolean
  error: string
  fetchReports: () => void
  addReport: (report: Omit<PhoneReport, 'id' | 'reported_at'>) => Promise<void>
  topNumbers: TopNumber[]
  loadingTopNumbers: boolean
  errorTopNumbers: string
  fetchTopNumbers: () => void
}

type TopNumber = {
  phone_number: string
  report_count: number
}

const supabase = createClient()

const ReportsContext = createContext<ReportsContextType | undefined>(undefined)

export const ReportsProvider = ({ children }: { children: React.ReactNode }) => {
  const [reports, setReports] = useState<PhoneReport[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [topNumbers, setTopNumbers] = useState<TopNumber[]>([])
  const [loadingTopNumbers, setLoadingTopNumbers] = useState(true)
  const [errorTopNumbers, setErrorTopNumbers] = useState('')

  const fetchReports = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('phone_reports')
      .select('*')
      .order('reported_at', { ascending: false })

    if (error) {
      setError(error.message)
      console.error(error)
    } else {
      setReports(data || [])
      setError('')
    }
    setLoading(false)
  }

  const addReport = async (report: Omit<PhoneReport, 'id' | 'reported_at'>) => {
    // const { error } = await supabase.from('phone_reports').insert([report])
    // if (error) {
    //   setError(error.message)
    //   throw error
    // } else {
    //   await fetchReports()
    // }
    const response = await fetch('/api/submit-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(report),
    })

    if (!response.ok) {
      const { error } = await response.json()
      setError(error)
      throw new Error(error)
    } else {
      await fetchReports()
    }
  }

  const fetchTopNumbers = async () => {
    setLoadingTopNumbers(true)
    const { data, error } = await supabase
      .from('today_hot_5')
      .select('*')

    if (error) {
      setErrorTopNumbers(error.message)
      console.error(error)
    } else {
      setTopNumbers(data || [])
      setErrorTopNumbers('')
    }
    setLoadingTopNumbers(false)
  }

  useEffect(() => {
    fetchReports()
    fetchTopNumbers()
  }, [])

  return (
    <ReportsContext.Provider
      value={{
        reports,
        loading,
        error,
        fetchReports,
        addReport,
        topNumbers,
        loadingTopNumbers,
        errorTopNumbers,
        fetchTopNumbers,
      }}
    >
      {children}
    </ReportsContext.Provider>
  )
}

export const useReports = () => {
  const context = useContext(ReportsContext)
  if (!context) {
    throw new Error('useReports must be used within a ReportsProvider')
  }
  return context
}
