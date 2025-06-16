'use client'

import { useEffect, useRef } from "react"

type Polygon = {
  points: [number, number][]
  name: string
}

type Props = {
  polygons: Polygon[]
  onPolygonClick?: (name: string) => void
  width: number
  height: number
}

export default function PolygonCanvas({ polygons, onPolygonClick, width, height }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // 1. 배경 흰색으로 채우기
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, width, height)

    // 2. 폴리곤 그리기
    ctx.lineWidth = 2
    ctx.strokeStyle = "red"
    ctx.fillStyle = "rgba(255,0,0,0.2)"

    polygons.forEach(poly => {
      ctx.beginPath()
      poly.points.forEach(([x, y], idx) =>
        idx === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      )
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
    })
  }, [polygons, width, height])

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!onPolygonClick || !canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    for (const poly of polygons) {
      ctx.beginPath()
      poly.points.forEach(([px, py], i) =>
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
      )
      ctx.closePath()
      if (ctx.isPointInPath(x, y)) {
        onPolygonClick(poly.name)
        break
      }
    }
  }

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ width: "100%", height: "auto", display: "block" }}
      onClick={handleClick}
    />
  )
}
