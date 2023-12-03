import React from "react";
import {useContext, useEffect, useState} from "react";
import "./App.css";
import {Signin} from "./pages/signin";
import {Gender} from "./pages/Gender";
import {Relationship} from "./pages/Relationship";
import {Dependants} from "./pages/Dependants";
import {TransHistory} from "./pages/TransHistory";
import {PagesContext} from "./contexts/PagesProvider";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const App = () => {
  const {pages}: any = useContext(PagesContext);
  const {currentIndex, setCurrentIndex}: any = useContext(PagesContext);

  const Pages = (index: number) => {
    return <div className="w-[100%] ">{pages[index]}</div>;
  };

  const style = () => ({
    transform: `translateX(${-currentIndex * 100}vw)`,
    transition: "transform ease 0.3s",
  });

  return (
    <div className="w-full  h-screen overflow-x-hidden">
      <ToastContainer position="top-center" />
      <div className="w-[900%] h-screen flex overflow-x-hidden" style={style()}>
        {pages.map((_: any, index: number) => (
          <div className="basis-[100%] flex-1">{Pages(index)}</div>
        ))}
      </div>
    </div>
  );
};
