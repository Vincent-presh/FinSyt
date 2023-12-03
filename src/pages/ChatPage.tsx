import {useState} from "react";
import {Background} from "../components/ui/Background";
import {BtnUI} from "../components/ui/Btn";
import {Logo} from "../components/ui/Logo";
import {Title} from "../components/ui/Title";

export const ChatPage = () => {
  const [conversations, setConversations] = useState([]);

  return (
    <div className="w-full h-screen flex ">
      <div className=" flex justify-center">
        <div className="flex flex-col space-y-3 w-72 py-6 bg-slate-50">
          <header className="">
            <Logo />
          </header>
        </div>
      </div>
    </div>
  );
};
