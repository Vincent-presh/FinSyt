import {Send} from "react-feather";

export const ChatInput = () => {
  return (
    <div className="absolute w-96 bottom-8  mx-auto left-0 right-0  ">
      <div className="relative">
        <input
          className=" bg-slate-50 w-96 h-14 p-3 rounded-xl border border-grey-100"
          placeholder="Message here...."
        />
        <button className="z-10 absolute top-0 right-3 bottom-0 my-auto">
          <Send color="grey" size={20} />
        </button>
      </div>
    </div>
  );
};
