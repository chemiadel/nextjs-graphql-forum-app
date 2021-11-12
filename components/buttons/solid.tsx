export default function Button({text} : {text:string}){
    return <button className="text-white bg-indigo-500 border-2 border-indigo-500 py-1 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">          
    {text}
</button>
}