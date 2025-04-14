import { usePage, useForm, Link } from "@inertiajs/react"
import Layout from "../Layouts/Layout"
import Category from "../Components/Category"
import Job from "../Components/Job"
import Company from "../Components/Company"

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


            <section className="  xl:px-4 py-10 md:py-16 lg:py-24 max-w-[1320px]  mx-auto">
                <h2 className="font-medium text-[25px] px-4 ">Popular Categories</h2>

                <div className=" px-4 md:px-8 pt-2 pb-5 mt-12 flex gap-5 overflow-x-auto lg:overflow-visible lg:grid lg:grid-cols-4 scroll-smooth snap-x snap-mandatory [scrollbar-width:none]">
                    <Category icon="categories/pen.png" name={"Graphics & Design"} openCount={12} />
                    <Category icon="categories/code.png" name={"Programming"} openCount={7} />
                    <Category icon="categories/speaker.png" name={"Digital Marketing"} openCount={26} />
                    <Category icon="categories/video.png" name={"Video and Animation"} openCount={2} />
                    <Category icon="categories/graph.png" name={"Finance & Accounting"} openCount={45} />
                    <Category icon="categories/db.png" name={"Data & Informaion"} openCount={8} />
                </div>

            </section>

            <section className="bg-customGray-50 gap-6 rounded-xl">
                <div className=" xl:px-4 py-10 md:py-16 lg:py-24 max-w-[700px] lg:max-w-[1320px]   mx-auto">
                    <h2 className="text-center text-4xl lg:text-[40px] font-medium text-gray-900">JobSeek is Simple</h2>

                    <div className="grid  grid-cols-2 lg:grid-cols-4 gap-4 mt-[50px] px-4  relative ">

                        <img src="extra/arrow.png" className="absolute invisible w-[150px] lg:visible  lg:top-4 lg:left-[19%]" />
                        <img src="extra/arrow.png" className="absolute invisible w-[150px] lg:visible  lg:top-16 lg:rotate-180 lg:-scale-x-100 lg:left-[44%]" />
                        <img src="extra/arrow.png" className="absolute invisible w-[150px] lg:visible  lg:top-4 lg:right-[19%]" />

                        <div className="flex flex-col max-w-[312px]  justify-center items-center gap-3  p-6 pb-10 rounded-xl shadow-md">
                            <img src="extra/create-account.png" className="max-h-[72px]" />
                            <span className="text-base lg:text-lg font-medium text-customGray-900 mt-3 text-center">Create an Account</span>
                            {/* <span className="text-gray-500 text-sm text-center">Create a candidate account</span> */}
                        </div>

                        <div className="flex flex-col max-w-[312px] justify-center items-center  gap-3  p-6 pb-10 rounded-xl shadow-md">
                            <img src="extra/upload.png" className="max-h-[72px]" />
                            <span className="text-base lg:text-lg font-medium text-customGray-900 mt-3  text-center">Upload CV/Resume</span>
                            {/* <span className="text-gray-500 text-sm text-center">Upload your resume (PDF/Word document) to your profile</span> */}
                        </div>

                        <div className="flex flex-col max-w-[312px] justify-center items-center gap-3  shadow-md p-6 pb-10 rounded-xl">
                            <img src="extra/find.png" className="max-h-[72px]" />
                            <span className="text-base lg:text-lg font-medium text-customGray-900 mt-3 text-center">Find Your Job</span>
                            {/* <span className="text-gray-500 text-sm text-center">Find a job that suits you</span> */}
                        </div>

                        <div className="flex flex-col max-w-[312px] justify-center items-center gap-3 shadow-md p-6 pb-10 rounded-xl">
                            <img src="extra/apply.png" className="max-h-[72px]" />
                            <span className="text-base lg:text-lg font-medium text-customGray-900 mt-3 text-center">Apply</span>
                            {/* <span className="text-gray-500 text-sm text-center">Apply in seconds!</span> */}
                        </div>
                    </div>
                </div>

            </section>


            <section className="mb-10 py-4">
                <div className="xl:px-4 py-10 md:py-16 lg:py-24 max-w-[1320px]  mx-auto">
                    <div className="w-full flex justify-between px-4">
                        <h2 className="font-medium text-xl md:text-[25px] px-4 ">Featured Jobs</h2>
                        <Link href="#" className="flex flex-wrap gap-3 rounded-sm font-semibold text-primary-500 hover:text-primary-600 border border-primary-50 hover:border-primary-600 hover:bg-primary-50 px-2 sm:px-6 py-1 sm:py-3 duration-150 text-nowrap">View all <img className="w-6" src="arrow.svg" /></Link>
                    </div>

                    <div className="pb-5 px-4 flex gap-4 mt-12 overflow-x-auto sm:flex-col sm:overflow-visible  scroll-smooth snap-x snap-mandatory [scrollbar-width:none]">
                        <Job employerLogo={"up-logo.png"} jobTitle={"Senior UX Designer"} jobType={"Full-time"} jobLocation={"Kabul"} jobDeadline={"4 days remaining"} bookmarkIcon={"bookmark.png"} />
                        <Job employerLogo={"apple-logo.png"} jobTitle={"Software Engineer"} jobType={"Full-time"} jobLocation={"Kabul"} jobDeadline={"18 days remaining"} bookmarkIcon={"bookmark.png"} />
                        <Job employerLogo={"up-logo.png"} jobTitle={"Senior UX Designer"} jobType={"Full-time"} jobLocation={"Kabul"} jobDeadline={"4 days remaining"} bookmarkIcon={"bookmark.png"} />
                        <Job employerLogo={"apple-logo.png"} jobTitle={"Software Engineer"} jobType={"Full-time"} jobLocation={"Kabul"} jobDeadline={"18 days remaining"} bookmarkIcon={"bookmark.png"} />
                        <Job employerLogo={"up-logo.png"} jobTitle={"Senior UX Designer"} jobType={"Full-time"} jobLocation={"Kabul"} jobDeadline={"4 days remaining"} bookmarkIcon={"bookmark.png"} />
                        <Job employerLogo={"apple-logo.png"} jobTitle={"Junior Telecommunication Officer"} jobType={"Full-time"} jobLocation={"Kabul"} jobDeadline={"18 days remaining"} bookmarkIcon={"bookmark.png"} />
                    </div>

                </div>
            </section>


            <section className="sm:px-4 py-10 md:py-16 lg:py-24 max-w-[1320px]  mx-auto ">
                <h2 className="font-medium text-[25px] px-4 ">Top Companies</h2>
                {/* px-4 md:px-8    */}
                <div className=" px-4 sm:px-0 pt-2 pb-5 mt-12 flex gap-5 overflow-x-auto lg:overflow-visible md:flex md:flex-wrap md:justify-center scroll-smooth snap-x snap-mandatory [scrollbar-width:none]">
                    <Company companyLogo={"up-logo.png"} companyLocation={"Kabul"} companyFeatured={true} companyName={"Upwork"} />
                    <Company companyLogo={"apple-logo.png"} companyLocation={"Kabul"} companyFeatured={false} companyName={"Apple"} />
                    <Company companyLogo={"up-logo.png"} companyLocation={"Kabul"} companyFeatured={true} companyName={"Upwork"} />
                    <Company companyLogo={"apple-logo.png"} companyLocation={"Kabul"} companyFeatured={false} companyName={"Apple"} />
                    <Company companyLogo={"up-logo.png"} companyLocation={"Kabul"} companyFeatured={true} companyName={"Upwork"} />
                    <Company companyLogo={"apple-logo.png"} companyLocation={"Kabul"} companyFeatured={false} companyName={"Apple"} />
                    <Company companyLogo={"up-logo.png"} companyLocation={"Kabul"} companyFeatured={true} companyName={"Upwork"} />
                    <Company companyLogo={"apple-logo.png"} companyLocation={"Kabul"} companyFeatured={false} companyName={"Apple"} />
                </div>

            </section>


            <section className="bg-customGray-50 gap-6 rounded-xl">
                <div className=" xl:px-4 py-10 md:py-16 lg:py-24 max-w-[700px] lg:max-w-[1320px] border   mx-auto">

                </div>

            </section>


            <section className="flex gap-6 flex-wrap sm:flex-nowrap justify-center items-center sm:px-4 py-10 mb-10 md:py-16 lg:py-24 px-4 md:px-8 max-w-[1320px]   mx-auto ">
                <div className="bg-customGray-100 max-w-[648px] w-full  p-[50px] rounded-xl shadow-2xl ">
                    <h4 className="text-[32px] font-medium">Become a Candidate</h4>
                    <p className="text-sm max-w-[312px] text-gray-600 mt-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad perferendis adipisci odit saepe! Non.</p>
                    <button className="mt-[26px] group flex gap-3 rounded-sm font-semibold text-primary-500 hover:text-white bg-white hover:bg-primary-500 cursor-pointer px-6 py-3 duration-150 text-nowrap">Register Now
                        <svg className="text-primary-500 group-hover:text-white duration-150" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                </div>


                <div className="bg-primary-600 max-w-[648px] w-full  p-[50px] rounded-xl shadow-2xl duration-150">
                    <h4 className="text-[32px] text-white font-medium">Become an Employer</h4>
                    <p className="text-sm max-w-[312px] text-white mt-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad perferendis adipisci odit saepe! Non.</p>
                    <button className="mt-[26px] group flex gap-3 rounded-sm font-semibold  text-white hover:text-primary-600  bg-primary-500 hover:bg-white cursor-pointer px-6 py-3 duration-150 text-nowrap">Register Now
                        <svg  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                </div>

            </section>

        </>
    )
}

Home.layout = page => <Layout children={page} />

export default Home