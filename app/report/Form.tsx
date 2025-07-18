'use client'
import React, { useState } from 'react'
import { useReports } from './ReportsContext'

export default function Form() {
  const { addReport, error } = useReports()

  const [form, setForm] = useState({
    phone_number: '',
    type: '',
    description: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSubmitError('')

    try {
      await addReport(form)
      setForm({ phone_number: '', type: '', description: '' })
    } catch (err) {
      setSubmitError('Failed to submit report')
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded shadow">
      <input
        name="phone_number"
        value={form.phone_number}
        onChange={handleChange}
        placeholder="Phone Number"
        required
        className="w-full p-2 border rounded"
      />
      <select name="type" value={form.type} onChange={handleChange} required className="w-full p-2 border rounded">
        <option value="">Select Scam Type</option>
        <option value="impersonation">Impersonation</option>
        <option value="bank fraud">Bank Fraud</option>
        <option value="investment scam">Investment Scam</option>
        <option value="other">Other</option>
      </select>
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description..."
        required
        className="w-full p-2 border rounded"
      />
      <button disabled={loading} type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {loading ? 'Submitting...' : 'Submit Report'}
      </button>

      {(submitError || error) && <p className="text-red-600 mt-2">{submitError || error}</p>}
    </form>
  )
}
