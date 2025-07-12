"use client"

import { useState, useRef, useCallback } from "react"

interface ScannedItem {
  name: string
  price: number
}

export function useReceiptScanner() {
  const [isScanning, setIsScanning] = useState(false)
  const [scannedItems, setScannedItems] = useState<ScannedItem[]>([])
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const startCamera = useCallback(async () => {
    try {
      setError(null)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment", // Use back camera
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setIsScanning(true)
      }
    } catch (err) {
      setError("Camera access denied or not available")
      console.error("Camera error:", err)
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    setIsScanning(false)
  }, [])

  const captureImage = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return null

    const canvas = canvasRef.current
    const video = videoRef.current
    const context = canvas.getContext("2d")

    if (!context) return null

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    context.drawImage(video, 0, 0)

    return canvas.toDataURL("image/jpeg", 0.8)
  }, [])

  // Mock OCR processing - in a real app, you'd use a service like Google Vision API
  const processReceipt = useCallback(async (imageData: string) => {
    try {
      setError(null)

      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock extracted items - in reality, this would come from OCR service
      const mockItems: ScannedItem[] = [
        { name: "Caesar Salad", price: 12.99 },
        { name: "Grilled Chicken", price: 18.5 },
        { name: "Pasta Carbonara", price: 16.75 },
        { name: "Garlic Bread", price: 6.5 },
        { name: "Soft Drinks", price: 8.0 },
      ]

      setScannedItems(mockItems)
      return mockItems
    } catch (err) {
      setError("Failed to process receipt")
      return []
    }
  }, [])

  const scanReceipt = useCallback(async () => {
    const imageData = captureImage()
    if (!imageData) {
      setError("Failed to capture image")
      return []
    }

    return await processReceipt(imageData)
  }, [captureImage, processReceipt])

  return {
    isScanning,
    scannedItems,
    error,
    videoRef,
    canvasRef,
    startCamera,
    stopCamera,
    scanReceipt,
    setScannedItems,
  }
}
