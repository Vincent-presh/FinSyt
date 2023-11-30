export const Title = ({title, question}: any) => {
   return (
      <div className="max-w-[15.8125rem] space-y-4">
         <div className='w-full'>
            <p className='font-semibold xl:text-base  text-[#1E1E1E]'>
               {title}
            </p>
         </div> 
         <div>
            <p className='text-[#898989] text-sm'>
               {question}
            </p>
         </div>
      </div>
   )
}