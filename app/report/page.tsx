// 'use client'

// import { createClient } from '@/lib/supabase/client'
// import { useEffect, useState } from 'react'

// export default function Page() {
//   const [notes, setNotes] = useState<any[] | null>(null)
//   const supabase = createClient()

//   useEffect(() => {
//     const getData = async () => {
//       const { data } = await supabase.from('phone_reports').select()
//       setNotes(data)
//       console.log(data)
//     }
//     getData()
//   }, [])

//   return <pre>{JSON.stringify(notes, null, 2)}</pre>
// }


// 'use client'

// import { useState } from 'react'
// import { createClient } from '@/lib/supabase/client'

// export default function ReportForm() {
//   const [form, setForm] = useState({
//     phone_number: '',
//     type: '',
//     description: ''
//   })
//   const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
//   const [errorMsg, setErrorMsg] = useState('')

//   const supabase = createClient()

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setForm(prev => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setStatus('submitting')

//     const { error } = await supabase.from('phone_reports').insert([
//       {
//         phone_number: form.phone_number,
//         type: form.type,
//         description: form.description,
//       }
//     ])

//     if (error) {
//       setStatus('error')
//       setErrorMsg(error.message)
//     } else {
//       setStatus('success')
//       setForm({ phone_number: '', type: '', description: '' })
//     }
//   }

//   return (
//     <div className="max-w-xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">📞 Report a Phone Scam</h1>

//       {status === 'success' && <p className="text-green-600">✅ Report submitted!</p>}
//       {status === 'error' && <p className="text-red-600">❌ Error: {errorMsg}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="phone_number"
//           placeholder="Phone Number"
//           required
//           value={form.phone_number}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//         />

//         <select
//           name="type"
//           required
//           value={form.type}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//         >
//           <option value="">Select scam type</option>
//           <option value="impersonation">Impersonation</option>
//           <option value="bank fraud">Bank Fraud</option>
//           <option value="investment scam">Investment Scam</option>
//           <option value="other">Other</option>
//         </select>

//         <textarea
//           name="description"
//           placeholder="Describe the scam..."
//           required
//           value={form.description}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//         />

//         <button
//           type="submit"
//           disabled={status === 'submitting'}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           {status === 'submitting' ? 'Submitting...' : 'Submit Report'}
//         </button>
//       </form>
//     </div>
//   )
// }


// 'use client'

// import { useEffect, useState } from 'react'
// import { createClient } from '@/lib/supabase/client'

// type PhoneReport = {
//   id: number
//   phone_number: string
//   type: string
//   description: string
//   reported_at: string
// }

// export default function ReportPage() {
//   const [form, setForm] = useState({
//     phone_number: '',
//     type: '',
//     description: '',
//   })
//   const [reports, setReports] = useState<PhoneReport[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')
//   const supabase = createClient()

//   useEffect(() => {
//     fetchReports()
//   }, [])

//   const fetchReports = async () => {
//     setLoading(true)
//     const { data, error } = await supabase
//       .from('phone_reports')
//       .select('*')
//       .order('reported_at', { ascending: false })

//     if (error) {
//       setError(error.message)
//       console.error(error)
//     } else {
//       setReports(data || [])
//     }
//     setLoading(false)
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setForm((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     const { error } = await supabase.from('phone_reports').insert([
//       {
//         phone_number: form.phone_number,
//         type: form.type,
//         description: form.description,
//       },
//     ])

//     if (error) {
//       setError(error.message)
//     } else {
//       setForm({ phone_number: '', type: '', description: '' })
//       fetchReports()
//     }
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-6 space-y-8">
//       <h1 className="text-2xl font-bold">📞 Report a Phone Scam</h1>

//       <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded shadow">
//         <input
//           name="phone_number"
//           value={form.phone_number}
//           onChange={handleChange}
//           placeholder="Phone Number"
//           required
//           className="w-full p-2 border rounded"
//         />

//         <select name="type" value={form.type} onChange={handleChange} required className="w-full p-2 border rounded">
//           <option value="">Select Scam Type</option>
//           <option value="impersonation">Impersonation</option>
//           <option value="bank fraud">Bank Fraud</option>
//           <option value="investment scam">Investment Scam</option>
//           <option value="other">Other</option>
//         </select>

//         <textarea
//           name="description"
//           value={form.description}
//           onChange={handleChange}
//           placeholder="Description..."
//           required
//           className="w-full p-2 border rounded"
//         />

//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
//           Submit Report
//         </button>
//       </form>

//       <div>
//         <h2 className="text-xl font-semibold mb-2">🗂 Submitted Reports</h2>
//         {loading ? (
//           <p>Loading reports...</p>
//         ) : reports.length === 0 ? (
//           <p>No reports found.</p>
//         ) : (
//           <ul className="space-y-3">
//             {reports.map((r) => (
//               <li key={r.id} className="border p-3 rounded bg-white shadow-sm">
//                 <p><strong>📱 Phone:</strong> {r.phone_number}</p>
//                 <p><strong>🕵️ Type:</strong> {r.type}</p>
//                 <p><strong>📝 Description:</strong> {r.description}</p>
//                 <p className="text-sm text-gray-500">
//                   ⏱ {new Date(r.reported_at).toLocaleString('bg-BG', { timeZone: 'Europe/Sofia' })}
//                 </p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   )
// }

import { ReportsProvider } from './ReportsContext'
import Form from './Form'
import ReportList from './ReportList'

export default function ReportPage() {
  return (
    <ReportsProvider>
      <div className="max-w-3xl mx-auto p-6 space-y-8">
        <h1 className="text-2xl font-bold">📞 Report a Phone Scam</h1>
        <Form />
        <ReportList />
      </div>
    </ReportsProvider>
  )
}
