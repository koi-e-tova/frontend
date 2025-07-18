// components/TopNumbersToday.tsx
'use client'
import { useEffect, useState } from "react"
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

export function TopNumbersToday() {
  type TopNumber = {
    phone_number: string;
    report_count: number;
  };

  const [topNumbers, setTopNumbers] = useState<TopNumber[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("today_hot_5")
        .select("*")

      if (error) {
        console.error("Error fetching top numbers:", error)
      } else {
        setTopNumbers(data)
      }
    }

    fetchData()
  }, [])

  if (topNumbers.length === 0) return null

  return (
    <div className="bg-white p-6 shadow-md rounded-md my-6">
      <h2 className="text-xl font-semibold mb-4">
        Today&rsquo;s Top 5
      </h2>
      <ul className="space-y-2">
        {topNumbers.map((item) => (
          <li
            key={item.phone_number}
            className="flex justify-between border-b pb-1 text-sm"
          >
            <span className="font-mono">{item.phone_number}</span>
            <span className="text-gray-500">{item.report_count} reports</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
