"use client";

import Header from "@/components/header";
import React from "react";

type StepLayoutProps = {
  step: number;
  children: React.ReactNode;
};

const StepLayout: React.FC<StepLayoutProps> = ({ step, children }) => {
  return (
    <div className="min-h-screen bg-glaucous-50">
      {/* Persistent Header with Progress Bar */}
      <Header step={step} />

      {/* Step Content */}
      <main>{children}</main>
    </div>
  );
};

export default StepLayout;
