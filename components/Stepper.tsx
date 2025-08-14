export default function Stepper({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className={`h-1 flex-1 rounded ${i < step ? 'bg-blue-500' : 'bg-gray-400'}`} />
      ))}
    </div>
  )
}
