'use client'

import { useEffect, useState } from 'react'
import { saveField, getField } from '../../../lib/db'
import Link from 'next/link'
import { motion } from 'framer-motion'

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

  const MotionDiv = motion.div as any

  return (
    <MotionDiv initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4" role="main">
      <h1 className="text-xl mb-4">Hébergeant</h1>
      <label className="block mb-4">
        <span className="block mb-1">Nom</span>
        <input value={nom} onChange={e => setNom(e.target.value)} className="w-full p-2 rounded bg-white/10 dark:bg-black/20" />
      </label>
      <label className="block mb-4">
        <span className="block mb-1">Prénom</span>
        <input value={prenom} onChange={e => setPrenom(e.target.value)} className="w-full p-2 rounded bg-white/10 dark:bg-black/20" />
      </label>
      <Link href="/form/heberge" className="underline">Suivant</Link>
    </MotionDiv>
  )
}
