import Follow from '../buttons/follow'

export default function TopUsersCard(){

    return <div className="border border-gray-300 bg-white rounded-lg">
        <h2 className="text-lg my-auto mx-2 p-4 pb-3 border-b text-gray-900 font-medium title-font">Suggestions</h2>
        <Row />
        <Row />
        <Row />
    </div>
}

function Row(){

    return <div className="flex flex-row content-center p-3 lg:p-6">
    <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 ">
      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-6 h-6" viewBox="0 0 24 24">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
      </svg>
    </div>
    <h2 className="text-sm md:text-md my-auto ml-2 text-gray-900 font-medium title-font flex-grow">Shooting Stars</h2>
    <Follow to_uid={"mohagal"}/>
    </div>
}