import type { GetServerSideProps, NextPage } from 'next'


export const getServerSideProps: GetServerSideProps = async () => {
  // ...
  return {
    redirect: {
      destination: '/settings/account',
      permanent: false,
    },
  }

}


const Index : NextPage = () => {
  return null
}

export default Index