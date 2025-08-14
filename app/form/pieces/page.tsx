'use client'

import { useState } from 'react'
import FileDropzone from '../../../components/FileDropzone'
import Link from 'next/link'

export default function Pieces() {
  const [files, setFiles] = useState<File[]>([])
  return (
    <main className="p-4">
      <h1 className="text-xl mb-4">Pièces</h1>
      <FileDropzone onFiles={setFiles} />
      <ul className="mt-4 space-y-1">
        {files.map(f => (
          <li key={f.name}>{f.name}</li>
        ))}
      </ul>
      <Link href="/form/signature" className="underline">Suivant</Link>
    </main>
  )
}
