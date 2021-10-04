import type { NextPage } from 'next'
import SubLayout from '../../components/_subLayout/dashboardL'
import PostCard from '../../components/cards/postcard'

const Overview : NextPage = () => {
  return (
    <>
      <SubLayout 
          children={<>
            <PostCard />
            <PostCard />
            <PostCard />
          </>}

          index={2}
      />
    </>
  )
}

export default Overview