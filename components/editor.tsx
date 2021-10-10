import SimpleMDE from "react-simplemde-editor";

export default function EditorComp({ defaultValue, onChange } : any){
    // const [value, setValue] = states
    return <SimpleMDE value={defaultValue} onChange={onChange}/>

}