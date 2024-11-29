export default function TicketsPage(){
   const { theme } = useContext(MyThemeContext);
 return (
    <div
       className="w-full min-h-screen  "
      
    >
      <h1 className="pl-6 text-8xl font-extrabold drop-shadow-lg text-pink-400 text-center mt-[5rem]">
        Tickets
      </h1>
  
    </div>
  );
}