import type { CustomNextPage, FormValues } from 'lib/types'
import Head from 'next/head'
import dynamic from 'next/dynamic'
const MDEditor = dynamic(() => import('components/editor'),{ssr:false})
const Outline = dynamic(() => import('components/outline'),{ssr:false})
import fetcher from 'lib/fetcher'
import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form'

const CreatePost: CustomNextPage = () => {
  const { register, setValue, control, handleSubmit, formState: { errors } } = useForm();

  const router=useRouter()

  function onSubmit({ title, tags, published, content} : FormValues){
    console.log({content})
    // return
    let payload={ 
      title,tags,published,
      content:{
        type:'post',
        data: content
      }
    }

    return fetcher(`mutation AddPost( $input: inputPost!) {
      addPost ( input : $input){
        id
      }
    }`, payload)
    .then(res=> {
      if(res?.addPost?.id) router.push('/dashboard/posts') 
    })
  }

  
  return (
    <>
      <Head>
        <title>Create Post</title>
      </Head>

      <form className="mx-auto my-4 w-full lg:w-3/4"  onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row m-4">
            <h2 className="flex-grow font-bold text-3xl">New Post</h2>
            <button type="submit"
            className="inline-flex items-center bg-gray-100 border-2 border-black py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base font-bold">
                Create
            </button>
        </div>
        <div className="border border-gray-300 bg-white rounded-lg p-6 space-y-4">
        <div className="flex flex-row-reverse space-x-4">
          <input {...register("published")} type="checkbox" className="my-auto mx-2"/>
          <label>Published</label>
        </div>
        <input {...register("title")} placeholder="Title" className="w-full  bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
        <input {...register("tags")} placeholder="Tags e.g. (cakes, arcs) " className="w-full  bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
        <div className="border  px-10 p-2 unreset">
            <Controller
                control={control}
                name="content"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <div className="unreset">
                      <Outline onChange={onChange} />
                  </div>
                )}
            />
        {/* <Outline /> */}
        </div>
        
        {/* <Controller
            control={control}
            name="content"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <MDEditor value={value} onChange={onChange} />
            )}
          /> */}
        
        </div>
      </form>
    </>
  )
}

CreatePost.auth=true
export default CreatePost
