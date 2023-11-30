import {  useContext, useEffect, useState } from "react";
import { Background } from "../components/ui/Background";
import { BtnUI } from "../components/ui/Btn";
import { Logo } from "../components/ui/Logo";
import { Title } from "../components/ui/Title";
import { PagesContext } from "../contexts/PagesProvider";

export const Gender = () => {
   const { ContinuetoRelationship }:any = useContext(PagesContext)
   return (
      <Background>
         <header>
            <Logo/>
         </header>
         <main className='w-full'>
            <section className='w-full'>
               <Title
                  title={'Hello, Anike'}
                  question={'Whats your gender?'}
               />
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