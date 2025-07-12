"use client";

import { useState } from "react";
import { ItemForm } from "./item-form";
import { ItemsList } from "./items-list";
import { ReceiptScanner } from "./receipt-scanner";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import StepLayout from "@/components/StepLayout";
import type { Item } from "@/types";

interface ItemsManagementStepProps {
  names: string[];
  items: Item[];
  currentItem: { name: string; price: string };
  setCurrentItem: (item: { name: string; price: string }) => void;
  selectedParticipants: string[];
  toggleParticipant: (name: string) => void;
  totalAmount: number;
  isValidItem: boolean;
  onAddItem: () => void;
  onRemoveItem: (id: string) => void;
  onCalculate: () => void;
  onBack: () => void;
}

export function ItemsManagementStep({
  names,
  items,
  currentItem,
  setCurrentItem,
  selectedParticipants,
  toggleParticipant,
  totalAmount,
  isValidItem,
  onAddItem,
  onRemoveItem,
  onCalculate,
  onBack,
}: ItemsManagementStepProps) {
  const [showScanner, setShowScanner] = useState(false);

  const handleScannedItems = (
    scannedItems: { name: string; price: number }[]
  ) => {
    scannedItems.forEach((scannedItem) => {
      const newItem: Item = {
        id: Date.now().toString() + Math.random(),
        name: scannedItem.name,
        price: scannedItem.price,
        participants: [...names],
      };
      setCurrentItem({
        name: scannedItem.name,
        price: scannedItem.price.toString(),
      });
    });
    setShowScanner(false);
  };

  if (showScanner) {
    return (
      <StepLayout step={3}>
        <div className="p-4 flex items-center justify-center min-h-[calc(100vh-112px)] bg-cyan-50">
          <ReceiptScanner
            onItemsScanned={handleScannedItems}
            onClose={() => setShowScanner(false)}
          />
        </div>
      </StepLayout>
    );
  }

  return (
    <StepLayout step={3}>
      <div className="p-4 bg-cyan-50 min-h-[calc(100vh-112px)]">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex justify-center mb-4">
            <Button
              onClick={() => setShowScanner(true)}
              className="bg-cyan-500 hover:bg-cyan-600 text-white"
            >
              <Camera className="w-4 h-4 mr-2" />
              Scan Receipt
            </Button>
          </div>

          <ItemForm
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
            names={names}
            selectedParticipants={selectedParticipants}
            toggleParticipant={toggleParticipant}
            isValid={isValidItem}
            onAddItem={onAddItem}
          />

          <ItemsList
            items={items}
            totalAmount={totalAmount}
            onRemoveItem={onRemoveItem}
            onCalculate={onCalculate}
            onBack={onBack}
          />
        </div>
      </div>
    </StepLayout>
  );
}
