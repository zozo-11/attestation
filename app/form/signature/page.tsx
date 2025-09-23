'use client'

import { useState } from 'react'
import SignaturePad from '../../../components/SignaturePad'
import FileDropzone from '../../../components/FileDropzone'
import Link from 'next/link'

export default function Signature() {
  const [sig, setSig] = useState('')
  const onFiles = (files: File[]) => {
    const file = files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = e => setSig(e.target?.result as string)
    reader.readAsDataURL(file)
  }
  return (
    <main className="p-4">
      <h1 className="text-xl mb-4">Signature</h1>
      <SignaturePad onChange={setSig} />
      <div className="mt-2">
        <FileDropzone onFiles={onFiles} />
      </div>
      {sig && <p className="mt-2 text-sm">Signature prête</p>}
      <Link href="/form/recap" className="underline">Suivant</Link>
    </main>
  )
}
