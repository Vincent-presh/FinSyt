import {useContext, useEffect, useState} from "react";
import {Background} from "../components/ui/Background";
import {BtnUI} from "../components/ui/Btn";
import {Logo} from "../components/ui/Logo";
import {Title} from "../components/ui/Title";
import {ChatInput} from "../components/ui/chatInput";
import {ConversationContext} from "../contexts/ConversationContext";
import {UserContext} from "../contexts/userProvider";
import {Conversation} from "../interfaces/User";

export const ChatPage = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const {user}: any = useContext(UserContext);
  const {getAllConversationsForUser} = useContext(ConversationContext);

  useEffect(() => {
    const getConversations = async () => {
      setConversations(await getAllConversationsForUser(user?.id));
    };
    if (user?.id) {
      getConversations();
    }
  }, [user, getAllConversationsForUser]);

  return (
    <div className="w-full h-screen flex ">
      <div className=" flex flex-row  flex-1">
        <div className="flex flex-col space-y-3 w-72 py-6 bg-slate-50">
          <header className="">
            <Logo />
          </header>
          {conversations?.map((item, index) => (
            <div className="bg-slate-50 w-100 h-12 p-3 rounded-lg border border-grey-100 mx-2 flex items-center text-sm">
              {item.messages[1].content}
            </div>
          ))}
        </div>
        <div className="flex-1 h-full relative">
          <ChatInput />
        </div>
      </div>
    </div>
  );
};
