import { useState } from "react";
import greenTick from '../../assets/svgs/tick.svg'

export const InputBtn = ({title} : any) =>  {

   const [Tick, setTick] = useState(false);
   
   const btnstyle =  "px-3 border-2 border-seconadaryLight py-[0.5rem] rounded-lg";
   const titlestyle =  " text-[#494848] w-full text-sm capitalize text-center";

   return (

      <button
         onClick={() => {
            setTick(true);
            if (Tick) {
              
               setTick(false)
            }
          
         }} className={btnstyle}>
      <div className="  w-full flex items-center justify-center">
         {Tick &&
         <div>
            <img src={greenTick} alt="green tick" className="scale-125" />
         </div> 
}
         <div className={titlestyle}>
           <p>{title}</p> 
         </div>
      </div>
   </button>
   )
}