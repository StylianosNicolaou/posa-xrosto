"use client"

import { useState, useEffect } from "react"

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

type Platform = 'ios' | 'android' | 'desktop' | 'unknown'

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [platform, setPlatform] = useState<Platform>('unknown')
  const [showInstructions, setShowInstructions] = useState(false)

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return
    }

    // Detect platform
    const userAgent = navigator.userAgent.toLowerCase()
    const isIOS = /iphone|ipad|ipod/.test(userAgent)
    const isAndroid = /android/.test(userAgent)
    const isMobile = /mobile/.test(userAgent)
    
    let detectedPlatform: Platform = 'unknown'
    if (isIOS) {
      detectedPlatform = 'ios'
    } else if (isAndroid) {
      detectedPlatform = 'android'
    } else if (!isMobile) {
      detectedPlatform = 'desktop'
    }
    setPlatform(detectedPlatform)

    // Check if app is already installed
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches
    const isInWebAppiOS = (window.navigator as any).standalone === true
    setIsInstalled(isStandalone || isInWebAppiOS)

    // Listen for the beforeinstallprompt event (Chrome/Edge)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setDeferredPrompt(null)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", handleAppInstalled)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", handleAppInstalled)
    }
  }, [])

  const installApp = async () => {
    // If we have a deferred prompt (Chrome/Edge), use it
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt()
        const choiceResult = await deferredPrompt.userChoice

        if (choiceResult.outcome === "accepted") {
          setIsInstalled(true)
          setDeferredPrompt(null)
          return true
        }
        return false
      } catch (error) {
        console.error("Installation failed:", error)
        return false
      }
    } else {
      // For other browsers, show instructions
      setShowInstructions(true)
      return false
    }
  }

  const getInstallInstructions = () => {
    switch (platform) {
      case 'ios':
        return {
          title: "Install on iOS",
          steps: [
            "1. Tap the Share button (square with arrow)",
            "2. Scroll down and tap 'Add to Home Screen'",
            "3. Tap 'Add' to confirm"
          ]
        }
      case 'android':
        return {
          title: "Install on Android",
          steps: [
            "1. Tap the menu (...) in your browser",
            "2. Select 'Add to Home screen' or 'Install app'",
            "3. Tap 'Add' or 'Install' to confirm"
          ]
        }
      case 'desktop':
        return {
          title: "Install on Desktop",
          steps: [
            "1. Look for the install icon (+) in your address bar",
            "2. Click it and select 'Install'",
            "3. Or use browser menu > 'Install Posa Xrosto'"
          ]
        }
      default:
        return {
          title: "Install App",
          steps: [
            "1. Look for 'Add to Home Screen' in your browser menu",
            "2. Follow your browser's installation prompts",
            "3. The app will appear on your home screen"
          ]
        }
    }
  }

  // Show install button if not installed and not in standalone mode
  const shouldShowInstallButton = !isInstalled

  return {
    isInstallable: shouldShowInstallButton,
    isInstalled,
    installApp,
    platform,
    showInstructions,
    setShowInstructions,
    getInstallInstructions,
    canUseNativePrompt: !!deferredPrompt,
  }
}