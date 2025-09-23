'use client'

import { useEffect, useState } from 'react'
import { getField } from '../../../lib/db'

export default function Recap() {
  const [data, setData] = useState<Record<string, string>>({})
  useEffect(() => {
    Promise.all([
      getField<string>('hebergeant_nom'),
      getField<string>('hebergeant_prenom'),
      getField<string>('heberge_nom'),
      getField<string>('heberge_prenom'),
      getField<string>('logement_adresse')
    ]).then(([hNom, hPrenom, eNom, ePrenom, adresse]) => {
      setData({
        hNom: hNom || '',
        hPrenom: hPrenom || '',
        eNom: eNom || '',
        ePrenom: ePrenom || '',
        adresse: adresse || ''
      })
    })
  }, [])
  return (
    <main className="p-4">
      <h1 className="text-xl mb-4">Récapitulatif</h1>
      <ul className="space-y-2">
        <li><strong>Hébergeant:</strong> {data.hPrenom} {data.hNom}</li>
        <li><strong>Hébergé:</strong> {data.ePrenom} {data.eNom}</li>
        <li><strong>Adresse:</strong> {data.adresse}</li>
      </ul>
    </main>
  )
}
