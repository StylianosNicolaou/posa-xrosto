import React from "react";
import { Users, UtensilsCrossed, Calculator, CheckCircle2 } from "lucide-react";

type HeaderProps = {
  step: number;
};

const Header: React.FC<HeaderProps> = ({ step }) => {
  return (
    <header className="w-full py-6 bg-white shadow-md z-50 sticky top-0">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Posa Xrosto
        </h1>

        {/* Progress Indicator */}
        <div className="flex justify-center">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                    step >= stepNum
                      ? "bg-gradient-to-r from-pink-400 to-blue-400 text-white shadow-lg"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {stepNum === 1 && <Users className="w-5 h-5" />}
                  {stepNum === 2 && <Users className="w-5 h-5" />}{" "}
                  {/* names entry */}
                  {stepNum === 3 && <UtensilsCrossed className="w-5 h-5" />}
                  {stepNum === 4 && <Calculator className="w-5 h-5" />}
                </div>
                {stepNum < 4 && (
                  <div
                    className={`w-8 h-1 transition-all duration-300 ${
                      step > stepNum
                        ? "bg-gradient-to-r from-pink-400 to-blue-400"
                        : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
