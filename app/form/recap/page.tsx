'use client'

import { useEffect, useState } from 'react'
import { getField } from '../../../lib/db'
import { getSignature } from '../../../lib/store'
import { buildPdf } from '../../../lib/pdf'
import { motion } from 'framer-motion'

export default function Recap() {
  const [data, setData] = useState({ hNom: '', hPrenom: '', eNom: '', ePrenom: '', adresse: '' })

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

  const download = async () => {
    const pdfBytes = await buildPdf({
      hNom: data.hNom,
      hPrenom: data.hPrenom,
      eNom: data.eNom,
      ePrenom: data.ePrenom,
      signature: getSignature()
    })
    const blob = new Blob([pdfBytes], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'attestation.pdf'
    a.click()
    URL.revokeObjectURL(url)
  }

  const MotionDiv = motion.div as any

  return (
    <MotionDiv initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4" role="main">
      <h1 className="text-xl mb-4">Récapitulatif</h1>
      <p className="mb-2">Hébergeant: {data.hPrenom} {data.hNom}</p>
      <p className="mb-2">Hébergé: {data.ePrenom} {data.eNom}</p>
      <p className="mb-4">Adresse du logement: {data.adresse}</p>
      <button onClick={download} className="px-3 py-2 rounded bg-white/10 dark:bg-black/20">
        Télécharger le PDF
      </button>
    </MotionDiv>
  )
}
