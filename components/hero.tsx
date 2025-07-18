import { NextLogo } from "./next-logo"
import { SupabaseLogo } from "./supabase-logo"

export function Hero() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="flex gap-8 justify-center items-center">
        <a
          href="https://supabase.com/"
          target="_blank"
          rel="noreferrer"
        >
          <SupabaseLogo />
        </a>
        <span className="border-l rotate-45 h-6" />
        <a
          href="https://nextjs.org/"
          target="_blank"
          rel="noreferrer"
        >
          <NextLogo />
        </a>
      </div>

      <h1 className="sr-only">Bulgarian Phone Scam Database</h1>

      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-2xl text-center">
        A public database for reporting and tracking{" "}
        <span className="font-bold text-red-600">phone scams</span> in{" "}
        <span className="font-bold">Bulgaria</span> — built with{" "}
        <a
          href="https://supabase.com/"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Supabase
        </a>{" "}
        and{" "}
        <a
          href="https://nextjs.org/"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Next.js
        </a>
        .
      </p>

      <div className="text-center text-gray-500 max-w-xl text-sm">
        Browse reported numbers, share new scams, and protect your community.
      </div>

      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  )
}
