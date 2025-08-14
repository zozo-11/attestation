'use client'

import { InputHTMLAttributes } from 'react'

export default function FieldText({ label, ...props }: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block mb-4">
      <span className="block mb-1">{label}</span>
      <input {...props} className="w-full p-2 rounded bg-white/10 dark:bg-black/20" />
    </label>
  )
}
