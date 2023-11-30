import { Background } from "../components/ui/Background"
import googleLogo from '../assets/logos/google-logo.png';
import { BtnUI } from "../components/ui/Btn";
import { Logo } from "../components/ui/Logo";
import { Title } from "../components/ui/Title";

// declare global {
//    namespace JSX {
//      interface IntrinsicElements {
//        "my-custom-element": {
//          src: any;
//        };
//      }
//    }
//  }

export const Signin = () => {
   return (
      <Background>
         <Logo/>
         <Title
            title={'Welcome to Finsyt'}
         />
         <div className='w-full'>
            <BtnUI
               title={'Continue with Google'}
               // onClick={() => {}}
               icon = {
                  <img 
                     src={googleLogo} 
                     alt='google logo' 
                     className='w-[1.125rem]'
                  />
               }
            />
         </div>
      </Background>
   )
}