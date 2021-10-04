
export default function Button({text} : {text:string}){
    return <button className="text-indigo-500 bg-white border-2 border-indigo-500 py-1 px-8 focus:outline-none hover:bg-indigo-200 rounded text-lg">          
    {text}
</button>
}