import Editor from "rich-markdown-editor";

export default function Outline( {
  onChange,
  defaultValue
} : any){

    return <Editor
        defaultValue={defaultValue}
        onChange={onChange}
  />
}

