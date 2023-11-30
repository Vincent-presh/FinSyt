import { Background } from "../components/ui/Background"
import { BtnUI } from "../components/ui/Btn";
import { Logo } from "../components/ui/Logo"
import { Title } from "../components/ui/Title"

export const Income = () => {
   return (
      <Background>
         <header>
            <Logo/>
         </header>
         <main className='w-full'>
            <section className='w-full'>
               <Title
                  title={'Monthly Income'}
                  question={'Tell us your monthly income.'}
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