import type { NextPage } from 'next'
import SubLayout from '../../components/_subLayout/dashboardL'
import PostCard from '../../components/cards/postcard'
const Posts : NextPage = () => {
  return (
    <>
      <SubLayout 
          children={<>
            <PostCard />
            <PostCard />
            <PostCard />
          </>}

          index={1}
      />
    </>
  )
}

export default Posts