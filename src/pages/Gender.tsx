import {  useContext, useEffect, useState } from "react";
import { Background } from "../components/ui/Background";
import { BtnUI } from "../components/ui/Btn";
import { Logo } from "../components/ui/Logo";
import { Title } from "../components/ui/Title";
import { PagesContext } from "../contexts/PagesProvider";
import { InputBtn } from "../components/ui/InputBtn";

export const Gender = () => {
   const { ContinuetoRelationship }:any = useContext(PagesContext)
   const [male, setMale] = useState(false);
   const [female, setFeMale] = useState(false);

   const genders = [
      {title:"male", name: "male"},
      {title:"female", name: "female"}
    
   ]
   return (
      <Background>
         <header>
            <Logo/>
         </header>
         <main className='w-full space-y-6'>
            <section className='w-full'>
               <Title
                  title={'Hello, Anike'}
                  question={'Whats your gender?'}
               />
            </section>

            <section>
               <div className="flex w-full flex-col space-y-5">
                  {
                     genders.map((gender) => (
                        <InputBtn
                           title={gender.title}
                          name={gender.name}
                          male={male}
                          female={female}
                          setFeMale={setFeMale}
                          setMale={setMale}

                           
                        />
                     ))
                  }
               </div>
            </section>

            <section>
               <BtnUI
                  type={'primary'}
                  title={'Continue'}
                  onClick={() => {
                     ContinuetoRelationship()
                  }}
               />
            </section>
         </main>
      </Background>
   )
}