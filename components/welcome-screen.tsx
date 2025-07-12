"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Utensils, Download } from "lucide-react";
import { usePWAInstall } from "@/hooks/use-pwa-install";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const { isInstallable, isInstalled, installApp } = usePWAInstall();

  return (
    <div className="min-h-screen bg-vanilla-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-vanilla-100">
        <CardHeader className="text-center">
          <img
            src="icon-512.png"
            className="mx-auto mb-4 w-20 h-20 rounded-full flex items-center justify-center"
          />
          <CardTitle className="text-4xl font-bold text-eerie-800">
            Posa Xrosto?
          </CardTitle>
          <CardDescription className="text-lg text-eerie-600">
            Save friendships. Stop fighting over the bill.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Button
              onClick={() => {
                onStart();
              }}
              className="w-full bg-glaucous-500 hover:bg-glaucous-600 text-white font-semibold py-6 text-lg"
              size="lg"
            >
              <Users className="w-5 h-5 mr-2" />
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
          </div>
        </CardContent>
      </div>
    </div>
  );
}
