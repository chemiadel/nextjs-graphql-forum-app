import type { NextPage } from 'next'
import SubLayout from '../../components/_subLayout/dashboardL'

const Overview : NextPage = () => {
  return (
    <>
      <SubLayout 
          children={<>
            <section className="text-gray-600 body-font">
            <div className="container w-1/2 px-5 py-14 mx-auto">
                <div className="flex flex-wrap -m-4 text-center">
                <div className="p-4 sm:w-1/3 w-1/2">
                    <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">2.7K</h2>
                    <p className="leading-relaxed">Users</p>
                </div>
                <div className="p-4 sm:w-1/3 w-1/2">
                    <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">1.8K</h2>
                    <p className="leading-relaxed">Subscribes</p>
                </div>
                <div className="p-4 sm:w-1/3 w-1/2">
                    <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">35</h2>
                    <p className="leading-relaxed">Downloads</p>
                </div>
                </div>
            </div>
            </section>
          </>}

          index={0}
      />
    </>
  )
}

export default Overview