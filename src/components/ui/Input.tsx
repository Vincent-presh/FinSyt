export const InputUI = ({type, placeholder, required, value, onChange, ...props}: any) => {
   return (
      <div >
         
         <input 
            type={type} 
            placeholder={placeholder} 
            required 
            value={value}
            onChange={onChange}
            className="px-4 w-full font-Kumbh py-1 border-2 border-gray-100 rounded-lg placeholder-gray-300 focus:outline-gray-400 outline-1"
            {...props}
         />
      </div>
   )
}

