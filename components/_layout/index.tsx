import Header from './header'
import Footer from './footer'

type Props = {
    children: React.ReactNode;
};

export default function Layout({children} : Props){

    return <div className="bg-gray-50">
    <div className="flex flex-col min-h-screen md:container mx-auto md:w-full lg:w-10/12 xl:4/5 
    divide-y divide-black-500 ">
        <div className="   ">
            <Header />
        </div>
        <div className="flex-grow sm:py-6 ">
            {children}
        </div>
        <Footer />

    </div></div>
}