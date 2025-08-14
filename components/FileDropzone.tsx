'use client'

import { useRef } from 'react'

export default function FileDropzone({ onFiles }: { onFiles: (files: File[]) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <div>
      <input ref={inputRef} type="file" multiple className="hidden" onChange={e => onFiles(Array.from(e.target.files || []))} />
      <button type="button" onClick={() => inputRef.current?.click()} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700">Importer des pièces</button>
    </div>
  )
}
