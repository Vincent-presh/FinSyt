import { Background } from "../components/ui/Background";
import { BtnUI } from "../components/ui/Btn";
import { Logo } from "../components/ui/Logo";
import { Title } from "../components/ui/Title";

export const TransHistory  = () => {
   return (
      <Background>
         <header>
            <Logo/>
         </header>
         <main className='w-full'>
            <section className='w-full'>
               <Title
                  title={'Submit Bank transaction history'}
                  question={'Why do we need this? We need this to get an understanding of your spending habits'}
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