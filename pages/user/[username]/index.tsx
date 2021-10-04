import type { NextPage, GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  
  return {
    redirect: {
      destination: params?.username?`/user/${params.username}/posts`:'/',
      permanent: false,
    },
  }
}

const Index: NextPage =  () => null

export default Index