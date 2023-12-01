export const Background = ({children}:any ) => {
   return (
      <div className='w-full h-screen flex justify-center items-center'>
         <div className='bg-backgroundColor xl:w-[26.125rem] py-36 flex flex-col justify-center'>
            <div className='space-y-5 px-20'>
               {children}
            </div>
         </div>
      </div>
   )
}