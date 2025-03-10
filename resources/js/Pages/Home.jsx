import { usePage, useForm } from "@inertiajs/react"
import Layout from "../Layouts/Layout"
import Category from "../Components/Category"

function Home() {
    const { auth } = usePage().props
    const { post } = useForm({})
    const handleLogout = (e) => {
        e.preventDefault()
        post('/sign-out')
    }
    return (

        <>
            <section className=" bg-customGray-50 flex flex-col items-center  px-4 md:px-14 lg:px-20 py-12 md:py-28">

                <div className="flex flex-col lg:flex-row gap-20 xl:gap-36  justify-between items-center">
                    <div>
                        <div className="">
                            <h1 className="font-medium  text-4xl md:text-[56px] text-[#18191c] max-w-[652px]">Find a job that suits your interest and skills.</h1>
                            <p className="text-base/5 md:text-lg/5 text-customGray-600 max-w-[652px] mt-6">Aliquam vitae turpis in diam convallis finibus in at risus. Nullam in scelerisque leo.</p>
                        </div>
                        <div className="mt-8 max-w-[680px]">
                            <div className="flex items-center w-full px-3 py-3 -h-12 md:h-20 rounded-sm border border-customGray-100 focus-within:ring focus-within:ring-primary-500">
                                <input type="text" placeholder="Job title, Keyword..." className="text-customGray-900 text-sm sm:text-base lg:text-lg outline-none px-2  w-full" />
                                <button className="ml-auto text-white bg-primary-500 hover:bg-primary-600 font-semibold rounded-[3px] px-3 py-1 md:py-2 cursor-pointer duration-150 text-nowrap">
                                    <img src="fi_search_white.png" className="h-6" />
                                </button>
                            </div>
                        </div>

                    </div>

                    <img src="illustration.png" className="max-w-[492px] w-full" />
                </div>



                <div className="flex flex-wrap justify-center xl:justify-normal gap-4 mt-15 ">
                    
                    <div className="p-5 flex gap-5 bg-white rounded-lg w-[290px] lg:w-[312px] drop-shadow-md">
                        <img src="briefcase_home.png" className="w-[72px] h-[72px]" />
                        <div className="flex flex-col gap-1.5">
                            <span className="text-[18191c] text-xl sm:text-2xl">300+</span>
                            <span className="text-customGray-500 text-sm sm:text-base">Live Jobs</span>
                        </div>
                    </div>

                    <div className="p-5 flex gap-5 bg-white rounded-lg w-[290px] lg:w-[312px] drop-shadow-md">
                        <img src="company_home.png" className="w-[72px] h-[72px]" />
                        <div className="flex flex-col gap-1.5">
                            <span className="text-[18191c] text-xl sm:text-2xl">22</span>
                            <span className="text-customGray-500 text-sm sm:text-base">Companies</span>
                        </div>
                    </div>

                    <div className="p-5 flex gap-5 bg-white rounded-lg w-[290px] lg:w-[312px] drop-shadow-md">
                        <img src="candidates_home.png" className="w-[72px] h-[72px]" />
                        <div className="flex flex-col gap-1.5">
                            <span className="text-[18191c] text-xl sm:text-2xl">12,000</span>
                            <span className="text-customGray-500 text-sm sm:text-base">Candidates</span>
                        </div>
                    </div>

                    <div className="p-5 flex gap-5 bg-white rounded-lg w-[290px] lg:w-[312px] drop-shadow-md">
                        <img src="briefcase_home.png" className="w-[72px] h-[72px]" />
                        <div className="flex flex-col gap-1.5">
                            <span className="text-[18191c] text-xl sm:text-2xl">18</span>
                            <span className="text-customGray-500 text-sm sm:text-base">New Jobs this week</span>
                        </div>
                    </div>

                </div>


            </section>


            <section className="px-4 md:px-14 lg:px-20 py-10 md:py-16 lg:py-24 ">
                <h2 className="font-medium text-[25px] ">Popular Categories</h2>
                
                    <div className="py-3 px-2 mt-12 flex gap-5 overflow-x-auto lg:overflow-visible lg:grid lg:grid-cols-4 scroll-smooth snap-x snap-mandatory [scrollbar-width:none]">
                    <Category icon="categories/pen.png" name={"Graphics & Design"} openCount={12}/>
                    <Category icon="categories/code.png" name={"Programming"} openCount={7}/>
                    <Category icon="categories/speaker.png" name={"Digital Marketing"} openCount={26}/>
                    <Category icon="categories/video.png" name={"Video and Animation"} openCount={2}/>
                    <Category icon="categories/graph.png" name={"Finance & Accounting"} openCount={45}/>
                    <Category icon="categories/db.png" name={"Data & Informaion"} openCount={8}/>
                </div>

            </section>


        </>
    )
}

Home.layout = page => <Layout children={page} />

export default Home