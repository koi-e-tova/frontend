
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
