import Link from 'next/link'

export default function Page() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Attestation d’hébergement</h1>
      <Link href="/form/hebergeant" className="underline">Commencer</Link>
    </main>
  )
}
