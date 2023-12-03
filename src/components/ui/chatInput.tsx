import {useContext, useState} from "react";
import {Send} from "react-feather";
import {
  ConversationContext,
  ConversationProvider,
  useConversations,
} from "../../contexts/ConversationContext";
import {UserContext} from "../../contexts/userProvider";

export const ChatInput = ({
  setCurrentConversation,
  currentConversation,
}: any) => {
  const [message, setMessage] = useState("");
  const {createConversation, sendMessage} = useContext(ConversationContext);
  const {user}: any = useContext(UserContext);
  return (
    <div className="absolute w-96 bottom-8  mx-auto left-0 right-0  ">
      <div className="relative">
        <input
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          className=" bg-slate-50 w-96 h-14 pl-3 pr-10 rounded-xl border border-grey-100 text-primaryLight"
          placeholder="Message here...."
        />
        <button
          className="z-10 absolute top-0 right-3 bottom-0 my-auto"
          onClick={() => {
            if (message.length > 4) {
              setMessage("");
              if (currentConversation == "") {
                createConversation([user.id], message, setCurrentConversation);
              } else {
                sendMessage(currentConversation, {
                  role: "user",
                  content: message,
                });
              }
            }
          }}
        >
          <Send color="grey" size={20} />
        </button>
      </div>
    </div>
  );
};
