import {useContext, useEffect, useState} from "react";
import {Background} from "../components/ui/Background";
import {BtnUI} from "../components/ui/Btn";
import {Logo} from "../components/ui/Logo";
import {Title} from "../components/ui/Title";
import {ChatInput} from "../components/ui/chatInput";
import {ConversationContext} from "../contexts/ConversationContext";
import {UserContext} from "../contexts/userProvider";
import {Conversation, Message} from "../interfaces/User";
import {PlusCircle} from "react-feather";

export const ChatPage = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState("");
  const {user}: any = useContext(UserContext);
  const [conversations_e, setconversations_e] = useState<Conversation>();
  const [messages, setMessages] = useState<Message[]>();
  const {getAllConversationsForUser, listenToConversation} =
    useContext(ConversationContext);

  useEffect(() => {
    const getConversations = async () => {
      setConversations(await getAllConversationsForUser(user?.id));
    };
    if (user?.id) {
      getConversations();
    }
  }, [user, getAllConversationsForUser]);

  useEffect(() => {
    if (currentConversation !== "") {
      let conversations_e = conversations.find(
        (item) => item.id === currentConversation
      );
      if (conversations_e !== undefined && conversations_e.id) {
        setconversations_e(conversations_e);
        listenToConversation(conversations_e.id, setconversations_e);
      }
    } else {
      setMessages([]);
    }
  }, [currentConversation]);

  useEffect(() => {
    let conversation = {...conversations_e};
    if (conversation.messages) {
      let messages = conversation.messages;
      setMessages(messages);
    }
  }, [conversations_e]);

  return (
    <div className="w-full h-screen flex ">
      <div className=" flex flex-row  flex-1">
        <div className="flex flex-col space-y-3 w-72 py-6 bg-slate-50 hidden sm:block">
          <header className="">
            <Logo />
          </header>
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => {
                setCurrentConversation("");
                setMessages([]);
              }}
              className="flex-row space-x-3 bg-slate-50 flex-1 h-12 p-3 rounded-lg border border-grey-100 mx-2 flex items-center text-sm text-primaryLight overflow-hidden"
            >
              <PlusCircle color="grey" />
              <div className="">New Message</div>
            </button>
            {conversations?.map((item, index) => (
              <button
                onClick={() => setCurrentConversation(item?.id ? item.id : "")}
                className="bg-slate-50 flex-1 h-12 p-3 rounded-lg border border-grey-100 mx-2 flex items-center text-sm text-primaryLight overflow-hidden"
              >
                {item?.messages[1]?.content &&
                item?.messages[1]?.content?.length > 30
                  ? item.messages[1].content?.slice(0, 31) + "..."
                  : item.messages[1].content}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 h-full relative flex">
          <div className="absolute space-x-3 bg-slate-50 w-60 top-4 right-4 h-12 p-3 rounded-lg border border-grey-100 mx-2 flex items-center text-sm text-primaryLight overflow-hidden">
            <img
              src={user?.photoUrl}
              alt="profile"
              className="rounded-full h-7"
            />
            <div>{user?.name}</div>
          </div>
          <div className=" sm:mx-20 md:mx-[10%] lg:mx-[12%]  mt-20 overflow-auto pb-24">
            {messages?.slice(1)?.map((item, index) => (
              <div className=" space-x-5">
                <div className="rounded-full h-8 w-8 ">
                  {item.role == "user" ? (
                    <img
                      src={user?.photoUrl}
                      alt="profile"
                      className="rounded-full mt-1 h-8 w-8"
                    />
                  ) : (
                    <img
                      src={
                        "https://firebasestorage.googleapis.com/v0/b/finsyt.appspot.com/o/images.png?alt=media&token=1cd98a77-2a5c-416e-b5fa-546e8c835053"
                      }
                      alt="profile"
                      className="rounded-full mt-1 h-8 w-8"
                    />
                  )}
                </div>
                <div className="flex-1 my-2 bg-slate-50  p-3 rounded-lg border border-grey-100 flex items-center text-sm text-primaryLight ">
                  {item.content}
                </div>
              </div>
            ))}
          </div>
          <ChatInput
            currentConversation={currentConversation}
            setCurrentConversation={setCurrentConversation}
            messages={messages}
          />
        </div>
      </div>
    </div>
  );
};
