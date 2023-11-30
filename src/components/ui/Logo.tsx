import finsytLogo from '../../assets/logos/Finsyt.png';


export const Logo: any = () => {
   return (
      <div className='w-full flex justify-center items-center pb-4'>
         <img 
            src={finsytLogo} 
            alt='finsyt logo' 
         />
      </div>
   )
}