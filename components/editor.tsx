import SimpleMDE from "react-simplemde-editor";

export default function EditorComp({ value, onChange } : any){
    // const [value, setValue] = states
    return <SimpleMDE value={value} onChange={onChange}/>

}