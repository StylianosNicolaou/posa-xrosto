"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useReceiptScanner } from "@/hooks/use-receipt-scanner"
import { Camera, X, Check, ScanLine } from "lucide-react"

interface ReceiptScannerProps {
  onItemsScanned: (items: { name: string; price: number }[]) => void
  onClose: () => void
}

export function ReceiptScanner({ onItemsScanned, onClose }: ReceiptScannerProps) {
  const { isScanning, scannedItems, error, videoRef, canvasRef, startCamera, stopCamera, scanReceipt } =
    useReceiptScanner()

  const handleScan = async () => {
    const items = await scanReceipt()
    if (items.length > 0) {
      onItemsScanned(items)
    }
  }

  const handleClose = () => {
    stopCamera()
    onClose()
  }

  if (!isScanning && scannedItems.length === 0) {
    return (
      <Card className="w-full max-w-md mx-auto bg-white border-2 border-cyan-200">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center">
            <Camera className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-xl text-eerie-800">Scan Receipt</CardTitle>
          <CardDescription className="text-eerie-600">
            Use your camera to scan a receipt and automatically add items
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          <div className="flex gap-2">
            <Button onClick={handleClose} variant="outline" className="flex-1 bg-transparent">
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={startCamera} className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white">
              <Camera className="w-4 h-4 mr-2" />
              Start Camera
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isScanning) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col">
        <div className="flex-1 relative">
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
          <canvas ref={canvasRef} className="hidden" />

          {/* Scanning overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-80 h-60 border-2 border-cyan-400 rounded-lg relative">
              <div className="absolute inset-0 bg-cyan-400/10 rounded-lg"></div>
              <ScanLine className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-cyan-400" />
            </div>
          </div>
        </div>

        <div className="p-4 bg-white">
          <div className="flex gap-2">
            <Button onClick={handleClose} variant="outline" className="flex-1 bg-transparent">
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleScan} className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white">
              <Camera className="w-4 h-4 mr-2" />
              Capture & Scan
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (scannedItems.length > 0) {
    return (
      <Card className="w-full max-w-md mx-auto bg-white border-2 border-glaucous-200">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-glaucous-500 rounded-full flex items-center justify-center">
            <Check className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-xl text-eerie-800">Items Found</CardTitle>
          <CardDescription className="text-eerie-600">Review and confirm the scanned items</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {scannedItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-glaucous-50 rounded-lg">
                <span className="text-eerie-800">{item.name}</span>
                <Badge className="bg-glaucous-500 text-white">${item.price.toFixed(2)}</Badge>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Button onClick={handleClose} variant="outline" className="flex-1 bg-transparent">
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={() => {
                onItemsScanned(scannedItems)
                handleClose()
              }}
              className="flex-1 bg-glaucous-500 hover:bg-glaucous-600 text-white"
            >
              <Check className="w-4 h-4 mr-2" />
              Add Items
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return null
}
