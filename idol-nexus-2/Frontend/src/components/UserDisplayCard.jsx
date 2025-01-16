const UserDisplayCard = ({users}) => {



    return(
<div class="flex flex-col items-center ">
   {/* Character Info Card  */}
  <div class="w-full max-w-4xl bg-white shadow-lg rounded-lg text-gray-800 p-4">
    <div class="flex flex-col sm:flex-row items-center">
      <img
        src="https://via.placeholder.com/200"
        alt="Profile Picture"
        class="rounded-lg border-4 border-purple-500 shadow-md mb-4 sm:mb-0 sm:mr-6 w-40 h-40 object-cover"
      />
      <div class="flex-grow">
        <h2 class="text-2xl font-bold mb-2">Idol Name</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <p><span class="font-semibold">Idol Group</span> I am solo!</p>
          <p><span class="font-semibold">Birthday:</span> March 24th</p>
          <p><span class="font-semibold">Height</span> 4'11"</p>
          <p><span class="font-semibold">Call and Response:</span> Whose everyones sweet idol?</p>
          <p><span class="font-semibold">Hobby:</span> Watching pro wrestling and martial arts movies</p>
          <p><span class="font-semibold">Favorite Food:</span> Cream puffs</p>
          <p><span class="font-semibold">Favorite Color:</span> Cream</p>
        </div>
      </div>
    </div>
  </div>

{/* Badges row */}
  <div class="flex overflow-x-auto mt-6 mb-6 space-x-4">
    <button class="flex-shrink-0 w-20 h-20 rounded-full bg-gray-200 hover:scale-110 transition-transform duration-300">
      <img src="https://via.placeholder.com/80" alt="Character 1" class="rounded-full" />
    </button>
    <button class="flex-shrink-0 w-20 h-20 rounded-full bg-gray-200 hover:scale-110 transition-transform duration-300">
      <img src="https://via.placeholder.com/80" alt="Character 2" class="rounded-full" />
    </button>
    <button class="flex-shrink-0 w-20 h-20 rounded-full bg-gray-200 hover:scale-110 transition-transform duration-300">
      <img src="https://via.placeholder.com/80" alt="Character 3" class="rounded-full" />
    </button>
  
  </div>


</div>
    )}

    export default UserDisplayCard 