import { Background } from "../components/ui/Background";
import { BtnUI } from "../components/ui/Btn";
import { Logo } from "../components/ui/Logo";
import { Title } from "../components/ui/Title";

export const Spendables = () => {
   return (
      <Background>
         <header>
            <Logo/>
         </header>
         <main className='w-full'>
            <section className='w-full'>
               <Title
                  title={'Top 10 things you spend money on'}
               />
            </section>

            <section>
               <BtnUI
                  type={'primary'}
                  title={'Continue'}
               />
            </section>
         </main>
      </Background>
   )
}