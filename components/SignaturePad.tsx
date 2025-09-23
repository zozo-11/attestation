'use client'

import { useRef, useState, useEffect } from 'react'

export default function SignaturePad({ onChange }: { onChange: (dataUrl: string) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [drawing, setDrawing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    canvas.width = 300 * dpr
    canvas.height = 150 * dpr
    canvas.style.width = '300px'
    canvas.style.height = '150px'
    const ctx = canvas.getContext('2d')!
    ctx.scale(dpr, dpr)
  }, [])

  const start = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    setDrawing(true)
  }

  const move = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing) return
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    ctx.stroke()
  }

  const end = () => {
    if (!drawing) return
    setDrawing(false)
    const canvas = canvasRef.current!
    onChange(canvas.toDataURL('image/png'))
  }

  const clear = () => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    onChange('')
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        className="border border-gray-500 bg-white dark:bg-black touch-none"
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={end}
        onPointerLeave={end}
      />
      <button type="button" onClick={clear} className="mt-2 px-2 py-1 rounded bg-gray-200 dark:bg-gray-700">Effacer</button>
    </div>
  )
}
