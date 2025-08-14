'use client'

import { useState } from 'react'
import SignaturePad from '../../../components/SignaturePad'
import Link from 'next/link'

export default function Signature() {
  const [sig, setSig] = useState('')
  return (
    <main className="p-4">
      <h1 className="text-xl mb-4">Signature</h1>
      <SignaturePad onChange={setSig} />
      {sig && <p className="mt-2 text-sm">Signature capturée</p>}
      <Link href="/form/recap" className="underline">Suivant</Link>
    </main>
  )
}
