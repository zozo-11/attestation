'use client'

import { useEffect, useState } from 'react'
import { saveField, getField } from '../../../lib/db'
import Link from 'next/link'
import FieldText from '../../../components/FieldText'

export default function Heberge() {
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')

  useEffect(() => {
    getField<string>('heberge_nom').then(v => v && setNom(v))
    getField<string>('heberge_prenom').then(v => v && setPrenom(v))
  }, [])

  useEffect(() => {
    saveField('heberge_nom', nom)
  }, [nom])
  useEffect(() => {
    saveField('heberge_prenom', prenom)
  }, [prenom])

  return (
    <main className="p-4">
      <h1 className="text-xl mb-4">Hébergé</h1>
      <FieldText label="Nom" value={nom} onChange={e => setNom(e.target.value)} />
      <FieldText label="Prénom" value={prenom} onChange={e => setPrenom(e.target.value)} />
      <Link href="/form/logement" className="underline">Suivant</Link>
    </main>
  )
}
