import { ReactNode } from 'react'

export default function Card({ children }: { children: ReactNode }) {
  return <div className="bg-white/10 dark:bg-black/20 backdrop-blur rounded-xl p-4 shadow">{children}</div>
}
