"use client"

import React, { useEffect, useState, useRef } from "react"

interface Pixel {
  id: number
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  opacity: number
}

export default function FloatingPixels() {
  const [pixels, setPixels] = useState<Pixel[]>([])
  const requestRef = useRef<number | undefined>(undefined)
  const previousTimeRef = useRef<number | undefined>(undefined)

  const colors = ["#00ffff", "#00ff7b", "#ffb000", "#ff00bf", "#bd00ff", "#ff0000", "#ffff00"]

  useEffect(() => {
    const createPixels = () => {
      const newPixels: Pixel[] = []
      for (let i = 0; i < 25; i++) {
        const size = Math.random() * 5 + 1;
        const speedFactor = Math.random() * 0.5 + 0.1;
        
        newPixels.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: size,
          speedX: (Math.random() - 0.5) * speedFactor,
          speedY: (Math.random() - 0.5) * speedFactor,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.5 + 0.2,
        })
      }
      setPixels(newPixels)
    }

    const handleResize = () => {
      setPixels(prevPixels => 
        prevPixels.map(pixel => ({
          ...pixel,
          x: Math.min(pixel.x, window.innerWidth),
          y: Math.min(pixel.y, window.innerHeight)
        }))
      );
    };

    window.addEventListener('resize', handleResize);
    createPixels()

    const animate = (time: number) => {
      if (previousTimeRef.current !== undefined) {
        setPixels((prevPixels) =>
          prevPixels.map((pixel) => {
            let newX = pixel.x + pixel.speedX
            let newY = pixel.y + pixel.speedY

            if (newX < -pixel.size) newX = window.innerWidth + pixel.size
            if (newX > window.innerWidth + pixel.size) newX = -pixel.size
            if (newY < -pixel.size) newY = window.innerHeight + pixel.size
            if (newY > window.innerHeight + pixel.size) newY = -pixel.size

            return {
              ...pixel,
              x: newX,
              y: newY,
            }
          }),
        )
      }
      previousTimeRef.current = time
      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {pixels.map((pixel) => (
        <div
          key={pixel.id}
          className="absolute"
          style={{
            left: `${pixel.x}px`,
            top: `${pixel.y}px`,
            width: `${pixel.size}px`,
            height: `${pixel.size}px`,
            backgroundColor: pixel.color,
            opacity: pixel.opacity,
          }}
        />
      ))}
    </div>
  )
}

