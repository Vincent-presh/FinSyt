import {ReactNode, createContext, useEffect, useState} from "react";
import {Gender} from "../pages/Gender";
import {Relationship} from "../pages/Relationship";
import {Dependants} from "../pages/Dependants";
import {Income} from "../pages/Income";
import {Debt} from "../pages/Debt";
import {Spendables} from "../pages/Spendables";
import {TransHistory} from "../pages/TransHistory";
import {Login} from "../pages/Login";
import {ChatPage} from "../pages/ChatPage";

// Define the context interface
interface PagesContextType {
  pages: ReactNode[];
  currentIndex: number;
  nextPage: () => void;
}

// Create the context with an initial null value
const PagesContext = createContext<PagesContextType | null>(null);

export const PagesProvider = ({children}: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const pages = [
    <Login />,
    <Gender />,
    <Relationship />,
    <Dependants />,
    <Income />,
    <Debt />,
    <Spendables />,
    <TransHistory />,
    <ChatPage />,
  ];
  
  const nextPage = (index?: number) => {
    setCurrentIndex(index ? index : currentIndex + 1);
  };

  return (
    <PagesContext.Provider
      value={{
        pages,
        currentIndex,
        nextPage,
      }}
    >
      {children}
    </PagesContext.Provider>
  );
};

export {PagesContext};
