'use client'
import React, { useState } from 'react'
import { useReports } from './ReportsContext'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

export default function Form() {
  const { addReport, error } = useReports()

  const [form, setForm] = useState({
    phone_number: '',
    type: '',
    description: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [country, setCountry] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    let updatedValue = value

    if (name === 'phone_number') {
      // Auto-add '+' if not present and user types a digit first
      if (updatedValue.length === 1 && updatedValue !== '+' && !updatedValue.startsWith('+')) {
        updatedValue = '+' + updatedValue
      }
      // Optionally remove any non-digit or non-+ characters
      // updatedValue = updatedValue.replace(/[^\d+]/g, '')
    }

    setForm((prev) => ({ ...prev, [name]: updatedValue }))

    if (name === 'phone_number') {
      const number = parsePhoneNumberFromString(updatedValue)
      if (number && number.isValid()) {
        setCountry(number.country || '')
      } else {
        setCountry('')
      }
    }
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSubmitError('')

    // Format & validate phone number
    const phoneNumber = parsePhoneNumberFromString(form.phone_number)
    if (!phoneNumber || !phoneNumber.isValid()) {
      setSubmitError('Invalid phone number format')
      setLoading(false)
      return
    }

    const formatted = phoneNumber.number // E.164 format (e.g. +359888123456)

    try {
      await addReport({
        ...form,
        phone_number: formatted,
      })
      setForm({ phone_number: '', type: '', description: '' })
      setCountry('')
    } catch (err) {
      setSubmitError('Failed to submit report')
      console.error(err)
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded shadow">
      <input
        name="phone_number"
        value={form.phone_number}
        onChange={handleChange}
        placeholder="Phone Number (e.g. +359888123456)"
        required
        className="w-full p-2 border rounded"
      />
      {country && (
        <p className="text-sm text-gray-500">Detected Country: <strong>{country}</strong></p>
      )}

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
