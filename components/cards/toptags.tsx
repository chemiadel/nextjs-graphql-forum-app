export default function History(){

    return <div className="border border-gray-600 bg-white  rounded-lg m-2">
        <h2 className="text-lg my-auto mx-2 p-4 pb-3 border-b text-gray-900 font-medium title-font">
          Popular Tags
        </h2>
        <Row />
    </div>
}

function Row(){

    return <div className="p-4">
                    <button className="m-1 my-2 bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-0">#Following</button>
                    <button className="m-1 my-2 bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-0">#Following</button>
                    <button className="m-1 my-2 bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-0">#Following</button>
                    <button className="m-1 my-2 bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-0">#Following</button>
  </div>
}