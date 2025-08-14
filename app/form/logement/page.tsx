'use client'

import { useEffect, useState } from 'react'
import { saveField, getField } from '../../../lib/db'
import Link from 'next/link'

export default function Logement() {
  const [adresse, setAdresse] = useState('')

  useEffect(() => {
    getField<string>('logement_adresse').then(v => v && setAdresse(v))
  }, [])

  useEffect(() => {
    saveField('logement_adresse', adresse)
  }, [adresse])

  return (
    <main className="p-4">
      <h1 className="text-xl mb-4">Logement</h1>
      <label className="block mb-4">
        <span className="block mb-1">Adresse</span>
        <input value={adresse} onChange={e => setAdresse(e.target.value)} className="w-full p-2 rounded bg-white/10 dark:bg-black/20" />
      </label>
      <Link href="/form/pieces" className="underline">Suivant</Link>
    </main>
  )
}
