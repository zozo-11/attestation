'use client'

import { useEffect, useState } from 'react'
import { saveField, getField } from '../../../lib/db'
import Link from 'next/link'
import FieldText from '../../../components/FieldText'

export default function Hebergeant() {
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')

  useEffect(() => {
    getField<string>('hebergeant_nom').then(v => v && setNom(v))
    getField<string>('hebergeant_prenom').then(v => v && setPrenom(v))
  }, [])

  useEffect(() => {
    saveField('hebergeant_nom', nom)
  }, [nom])
  useEffect(() => {
    saveField('hebergeant_prenom', prenom)
  }, [prenom])

  return (
    <main className="p-4">
      <h1 className="text-xl mb-4">Hébergeant</h1>
      <FieldText label="Nom" value={nom} onChange={e => setNom(e.target.value)} />
      <FieldText label="Prénom" value={prenom} onChange={e => setPrenom(e.target.value)} />
      <Link href="/form/heberge" className="underline">Suivant</Link>
    </main>
  )
}
