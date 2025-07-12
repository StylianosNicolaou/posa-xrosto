"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Download, Info } from "lucide-react";
import { usePWAInstall } from "@/hooks/use-pwa-install";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const { isInstallable, isInstalled, installApp } = usePWAInstall();
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="min-h-screen bg-vanilla-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-vanilla-100">
        <CardHeader className="text-center">
          <img
            src="icon-512.png"
            className="mx-auto mb-4 w-20 h-20 rounded-full flex items-center justify-center"
            alt="App Icon"
          />
          <CardTitle className="text-4xl font-bold text-eerie-800">
            Posa Xrosto?
          </CardTitle>
          <CardDescription className="text-lg text-eerie-600">
            For when the math isn’t mathing.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Button
              onClick={onStart}
              className="w-full bg-glaucous-500 hover:bg-glaucous-600 text-white font-semibold py-6 text-lg"
              size="lg"
            >
              Split the bill
            </Button>

            {isInstallable && !isInstalled && (
              <Button
                onClick={installApp}
                variant="outline"
                className="w-full border-2 border-amaranth-300 text-amaranth-700 hover:bg-amaranth-50 bg-transparent"
              >
                <Download className="w-4 h-4 mr-2" />
                Install App
              </Button>
            )}

            <Button
              variant="ghost"
              onClick={() => setShowInfo((prev) => !prev)}
              className="w-full text-center text-eerie-500 hover:text-eerie-800 text-sm"
            >
              {showInfo ? "Hide info ↑" : "Learn how it works →"}
            </Button>
          </div>

          {showInfo && (
            <Card className="bg-white border border-glaucous-200 mt-2 shadow-sm">
              <CardContent className="py-4 px-6 space-y-3 text-eerie-700 text-sm">
                <div className="flex gap-2 items-start">
                  <span className="font-bold">1.</span> Add number of people
                </div>
                <div className="flex gap-2 items-start">
                  <span className="font-bold">2.</span> Add their names
                </div>
                <div className="flex gap-2 items-start">
                  <span className="font-bold">3.</span> Add items and prices
                </div>
                <div className="flex gap-2 items-start">
                  <span className="font-bold">4.</span> Choose who ate what
                </div>
                <div className="flex gap-2 items-start">
                  <span className="font-bold">5.</span> Split the bill...
                  <br />
                </div>
                <br />
                <span className="ml-7">Voila! See each person’s total </span>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </div>
    </div>
  );
}
