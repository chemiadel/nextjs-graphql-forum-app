import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import ProfileL from '../../../components/_subLayout/profileL'
import PostCard from '../../../components/cards/postcard'
import { useRouter } from 'next/router'
import useSWR from 'swr'

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  console.log('params',params)
  return {
    props: {params}, // will be passed to the page component as props
  }
}

const Home: NextPage = ({params}: any) => {

  const { data , error } = useSWR(`query {
    User (username: "${params.username}") {
      bio
    }
  }`)

  if(!data) return null
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <main>
        <div className="flex flex-row">
        <div className="w-full">
          <ProfileL index={1} username="asd">
            <div className="border border-gray-200 rounded-md bg-white p-5 ">
            {/* <h2>{data.User.bio || <i>No bio</i>}</h2> */}

            </div>
          </ProfileL>
        </div>
        </div>
      </main>
    </>
  )
}

export default Home
