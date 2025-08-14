'use client'

import { useEffect, useState } from 'react'
import { getField } from '../../../lib/db'

export default function Recap() {
  const [data, setData] = useState<Record<string, string>>({})
  useEffect(() => {
    Promise.all([
      getField<string>('hebergeant_nom'),
      getField<string>('heberge_nom'),
      getField<string>('logement_adresse')
    ]).then(([hNom, eNom, adresse]) => {
      setData({ hNom: hNom || '', eNom: eNom || '', adresse: adresse || '' })
    })
  }, [])
  return (
    <main className="p-4">
      <h1 className="text-xl mb-4">Récapitulatif</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  )
}
