import { ReportsProvider } from './ReportsContext'
import Form from './Form'
import { TopNumbersToday } from "@/components/today-hot-top-5"

export default function ReportPage() {
  return (
    <ReportsProvider>
      <div className="max-w-3xl mx-auto p-6 space-y-8">
        <h1 className="text-2xl font-bold">📞 Report a Phone Scam</h1>
        {/* Side-by-side layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side: Form */}
          <div className="lg:flex-[2] w-full">
            <Form />
          </div>

          {/* Right side: Top Numbers */}
          <div className="lg:flex-[1] w-full lg:max-w-xs">
            <TopNumbersToday />
          </div>
        </div>
      </div>
    </ReportsProvider>
  )
}
