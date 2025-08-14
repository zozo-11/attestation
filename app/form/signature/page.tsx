'use client'

import { useState, useEffect } from 'react'
import SignaturePad from '../../../components/SignaturePad'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { setSignature, getSignature } from '../../../lib/store'

export default function Signature() {
  const [sig, setSig] = useState('')

  useEffect(() => {
    const existing = getSignature()
    if (existing) setSig(existing)
  }, [])

  const handleChange = (data: string) => {
    setSig(data)
    setSignature(data)
  }

  const MotionDiv = motion.div as any

  return (
    <MotionDiv initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4" role="main">
      <h1 className="text-xl mb-4">Signature</h1>
      <SignaturePad onChange={handleChange} />
      {sig && <p className="mt-2 text-sm">Signature capturée</p>}
      <Link href="/form/recap" className="underline">Suivant</Link>
    </MotionDiv>
  )
}
