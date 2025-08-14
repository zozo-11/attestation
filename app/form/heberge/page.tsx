'use client'

import { useEffect, useState } from 'react'
import { saveField, getField } from '../../../lib/db'
import Link from 'next/link'

export default function Heberge() {
  const [nom, setNom] = useState('')

  useEffect(() => {
    getField<string>('heberge_nom').then(v => v && setNom(v))
  }, [])

  useEffect(() => {
    saveField('heberge_nom', nom)
  }, [nom])

  return (
    <main className="p-4">
      <h1 className="text-xl mb-4">Hébergé</h1>
      <label className="block mb-4">
        <span className="block mb-1">Nom</span>
        <input value={nom} onChange={e => setNom(e.target.value)} className="w-full p-2 rounded bg-white/10 dark:bg-black/20" />
      </label>
      <Link href="/form/logement" className="underline">Suivant</Link>
    </main>
  )
}
