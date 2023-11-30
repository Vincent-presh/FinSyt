export const Background = ({children}:any ) => {
   return (
      <div className='w-full h-full flex justify-center items-center'>
         <div className='bg-backgroundColor xl:w-[26.125rem] h-[85.0625rem] flex flex-col justify-center'>
            <div className='space-y-5 px-20'>
               {children}
            </div>
         </div>
      </div>
   )
}