import {ReactNode, createContext, useEffect, useState} from "react";
import {Gender} from "../pages/Gender";
import {Relationship} from "../pages/Relationship";
import {Dependants} from "../pages/Dependants";
import {Income} from "../pages/Income";
import {Debt} from "../pages/Debt";
import {Spendables} from "../pages/Spendables";
import {TransHistory} from "../pages/TransHistory";

// Define the context interface
interface PagesContextType {
  pages: ReactNode[];
  currentIndex: number;
  ContinuetoRelationship: () => void;
  ContinuetoDependants: () => void;
  ContinuetoIncome: () => void;
  ContinuetoDebt: () => void;
  ContinuetoSpendables: () => void;
  ContinuetoTransHistory: () => void;
}

// Create the context with an initial null value
const PagesContext = createContext<PagesContextType | null>(null);

export const PagesProvider = ({children}: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const pages = [
    <Gender />,
    <Relationship />,
    <Dependants />,
    <Income />,
    <Debt />,
    <Spendables />,
    <TransHistory />,
  ];

  const ContinuetoRelationship = () => {
    setCurrentIndex(currentIndex + 1);
  };
  const ContinuetoDependants = () => {
    setCurrentIndex(currentIndex + 2);
  };
  const ContinuetoIncome = () => {
    setCurrentIndex(currentIndex + 3);
  };
  const ContinuetoDebt = () => {
    setCurrentIndex(currentIndex + 4);
  };
  const ContinuetoSpendables = () => {
    setCurrentIndex(currentIndex + 5);
  };
  const ContinuetoTransHistory = () => {
    setCurrentIndex(currentIndex + 6);
  };

  return (
    <PagesContext.Provider
      value={{
        pages,
        currentIndex,
        ContinuetoDebt,
        ContinuetoDependants,
        ContinuetoIncome,
        ContinuetoRelationship,
        ContinuetoSpendables,
        ContinuetoTransHistory,
      }}
    >
      {children}
    </PagesContext.Provider>
  );
};

export {PagesContext};
