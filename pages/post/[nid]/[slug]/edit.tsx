import type { CustomNextPage, FormValues } from 'lib/types'
import Head from 'next/head'
import dynamic from 'next/dynamic'
const Outline = dynamic(() => import('components/outline'),{ssr:false})
import fetcher from 'lib/fetcher'
import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form'
import useSWR from 'swr'

const EditPost: CustomNextPage = () => {
  const { register, setValue, control, handleSubmit, formState: { errors } } = useForm();

  const {nid, slug}=useRouter().query

  const { data , error } = useSWR(nid?`query{
    Post (nid:"${nid}", slug: "${slug}"){
      id
      uid
      created
      title
      tags
      published
      content {
        type
        data
      }
    }
  }`:null)

  
  function onSubmit({title,tags,published,content} : FormValues){
    let payload={ 
      title,tags,published,
      content:{
        type:'post',
        data: content
      }
    }

    console.log({payload})
    // return 
    return fetcher(`mutation EditPost( $input: inputPost!) {
      editPost ( pid: "${data.Post.id}", input : $input){
        id
      }
    }`, payload)
    .then(res=> {
      if(res?.editPost?.id) window.alert('Post edited!')
    })
  }

  if(!data) return null
  console.log({data})
  return (
    <>
      <Head>
        <title>Edit Post</title>
      </Head>

      <form className="mx-auto my-4 w-full lg:w-3/4"  onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row m-4">
            <h2 className="flex-grow font-bold text-3xl">Edit Post</h2>
            <button type="submit"
            className="inline-flex items-center bg-gray-100 border-2 border-black py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base font-bold ">
                Save
            </button>
        </div>
        <div className="border border-gray-300 bg-white rounded-lg p-6 space-y-4">
        <div className="flex flex-row-reverse space-x-4">
          <input {...register("published")} defaultChecked={data.Post.published} type="checkbox" className="my-auto mx-2"/>
          <label>Published</label>
        </div>
        <input {...register("title")} defaultValue={data.Post.title} placeholder="Title" className="w-full  bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
        <input {...register("tags")} defaultValue={data.Post.tags.join("")} placeholder="Tags e.g. (cakes, arcs) " className="w-full  bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
        <Controller
            control={control}
            defaultValue={data.Post.content.data}
            name="content"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              // <MDEditor defaultValue={value} onChange={onChange} />
              <div className="unreset">
                  <Outline defaultValue={value} onChange={onChange} />
              </div>
            )}
          />
        
        </div>
      </form>
    </>
  )
}

EditPost.auth=true
export default EditPost
