'use client'

import { getVisitorId } from '@/lib/getFingerprint'
import React, { useState } from 'react'
import { useReports } from './ReportsContext'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { isValidPhoneNumber } from 'react-phone-number-input'

export default function Form() {
  const { addReport, error } = useReports()

  const [phone, setPhone] = useState<string | undefined>()
  const [form, setForm] = useState({ type: '', description: '' })
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    const reporter_id = await getVisitorId()
    console.log(reporter_id)
    e.preventDefault()
    setSubmitError('')
    setLoading(true)

    if (!phone || !isValidPhoneNumber(phone)) {
      setSubmitError('Please enter a valid phone number')
      setLoading(false)
      return
    }

    try {
      await addReport({
        phone_number: phone, // already formatted in E.164
        reporter_id: reporter_id,
        ...form
      })
      setPhone(undefined)
      setForm({ type: '', description: '' })
    } catch (err) {
      console.error(err)
      setSubmitError('Failed to submit report')
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded shadow">
      <PhoneInput
        international
        defaultCountry="BG"
        value={phone}
        onChange={setPhone}
        className="phone-input w-full"
        placeholder="Enter phone number"
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
