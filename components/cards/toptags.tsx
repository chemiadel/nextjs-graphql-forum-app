import useSWR from 'swr'

export default function Tags(){
  const { data , error } = useSWR(`query {
    TopTags 
  }`)

    if(!data) return null
  
    return <div className="border border-gray-600 bg-white  rounded-lg m-2">
        <h2 className="text-lg my-auto mx-2 p-4 pb-3 border-b text-gray-900 font-medium title-font">
          Popular Tags
        </h2>
        <Row tags={data.TopTags}/>
    </div>
}

function Row({ tags } : { tags: string[]}){

    return <div className="p-4">
        {tags.map((tag: string) => 
        <button key={tag} className="m-1 my-2 bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-0">
          {`#${tag}`}
        </button>
)} </div>
}