import { Link } from "@inertiajs/react"
import Layout from "../Layouts/Layout"
import Category from "../Components/Category"
import Job from "../Components/Job"
import Company from "../Components/Company"
import EmployerLayout from "../Layouts/EmployerLayout"
import { AddAccountIcon, BarChartIcon, BriefCaseIcon, BuildingIcon, CameraIcon, CheckmarkIcon, FindPlusIcon, HomePageCover, LineChartIcon, ProcessorIcon, RightArrowIcon, UploadIcon, UsersIcon } from "../utils/svgs.jsx"
import Tilt from "react-parallax-tilt"
function Home(props) {

    const latestJobEls = props.latestJobs.map(job => (
        <Job key={job.id} id={job.id} logo={job.employer?.detail?.logo_path} title={job.job_title} type={job.job_type} location={job.city} deadline={job.deadline}
            salaryType={job.salary_type} fixedSalary={job.fixed_salary} minSalary={job.min_salary} maxSalary={job.max_salary} />
    ))


    const activeCompanyEls = props.activeCompanies.map(emp => (
        <Company key={emp.employer_id} id={emp.employer_id} logo={emp.logo_path} location={emp.city} name={emp.full_name} />
    ))



    return (

        <>
            <section className=" bg-customGray-50 flex flex-col items-center  px-4 md:px-14 lg:px-20 py-12 md:py-28 ">

                <div className="flex flex-col lg:flex-row  sm:gap-10 justify-between items-center">
                        <div className=" max-w-[652px]">
                            <h1 className="font-medium  text-4xl md:text-[56px] text-customGray-900  ">Find a job that suits your interest and skills.</h1>
                            <p className="text-base/5 md:text-lg/5 text-customGray-600  mt-6">Aliquam vitae turpis in diam convallis finibus in at risus. Nullam in scelerisque leo.</p>
                        </div>


                    {/* <img src="/Illustration.png" className="max-w-[492px] w-full" /> */}
                    <HomePageCover className="text-primary-500 hue-animation max-w-[492px] w-full " />
                </div>



                <div className="flex flex-wrap justify-center xl:justify-normal gap-4 mt-4 sm:mt-15 ">

                    <div className="p-5 flex gap-5 bg-white rounded-lg w-[290px] lg:w-[312px] drop-shadow-md group">
                        <div className="bg-primary-50 p-4 rounded-sm group-hover:bg-primary-500 duration-150">
                            <BriefCaseIcon className="text-primary-500 group-hover:text-white duration-150" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <span className=" text-customGray-900 text-xl sm:text-2xl">{props.liveJobsCount}+</span>
                            <span className="text-customGray-500 text-sm sm:text-base">Live Jobs</span>
                        </div>
                    </div>

                    <div className="p-5 flex gap-5 bg-white rounded-lg w-[290px] lg:w-[312px] drop-shadow-md group">
                        <div className="bg-primary-50 p-4 rounded-sm group-hover:bg-primary-500 duration-150">
                            <BuildingIcon className="text-primary-500 group-hover:text-white duration-150" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <span className="text-customGray-900  text-xl sm:text-2xl">{props.companiesCount}</span>
                            <span className="text-customGray-500 text-sm sm:text-base">Companies</span>
                        </div>
                    </div>

                    <div className="p-5 flex gap-5 bg-white rounded-lg w-[290px] lg:w-[312px] drop-shadow-md group">
                        <div className="bg-primary-50 p-4 rounded-sm group-hover:bg-primary-500 duration-150">
                            <UsersIcon className="text-primary-500 group-hover:text-white duration-150" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <span className="text-customGray-900 text-xl sm:text-2xl">{props.candidatesCount}</span>
                            <span className="text-customGray-500 text-sm sm:text-base">Candidates</span>
                        </div>
                    </div>

                    <div className="p-5 flex gap-5 bg-white rounded-lg w-[290px] lg:w-[312px] drop-shadow-md group">
                        <div className="bg-primary-50 p-4 rounded-sm group-hover:bg-primary-500 duration-150">
                            <BriefCaseIcon className="text-primary-500 group-hover:text-white duration-150" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <span className="text-customGray-900 text-xl sm:text-2xl">{props.jobsLastSevenDaysCount}</span>
                            <span className="text-customGray-500 text-sm sm:text-base">New Jobs (Last 7 Days)</span>
                        </div>
                    </div>

                </div>


            </section>


            <section className="  xl:px-4 py-10 md:py-16 lg:py-24 max-w-[1320px]  mx-auto">
                <h2 className="font-medium text-[25px] px-4 ">Popular Categories</h2>
                <div className=" px-4 md:px-8 pt-2 pb-5 mt-12 flex gap-5 overflow-x-auto lg:overflow-visible lg:grid lg:grid-cols-4 scroll-smooth snap-x snap-mandatory [scrollbar-width:none]">
                    <Category icon={<BarChartIcon className="" />} name={"Finance & Accounting"} openCount={props.financeJobsCount} />
                    <Category icon={<CameraIcon className="" />} name={"Media & Art"} openCount={props.mediaJobsCount} />
                    <Category icon={<ProcessorIcon className="" />} name={"Technology & Engineering"} openCount={props.techJobsCount} />
                    <Category icon={<LineChartIcon className="" />} name={"Management & Operations"} openCount={props.managementJobsCount} />
                </div>
            </section>

            <section className="bg-customGray-50 gap-6 rounded-xl">
                <div className=" xl:px-4 py-10 md:py-16 lg:py-24 max-w-[700px] lg:max-w-[1320px]   mx-auto">
                    <h2 className="text-center text-4xl lg:text-[40px] font-medium text-customGray-900">JobSeek is Simple</h2>

                    <div className="grid  grid-cols-2 lg:grid-cols-4 gap-4 mt-[50px] px-4  relative ">

                        <img src="extra/arrow.png" className="absolute invisible w-[150px] lg:visible  lg:top-4 lg:left-[19%] pointer-events-none" />
                        <img src="extra/arrow.png" className="absolute invisible w-[150px] lg:visible  lg:top-16 lg:rotate-180 lg:-scale-x-100 lg:left-[44%] pointer-events-none" />
                        <img src="extra/arrow.png" className="absolute invisible w-[150px] lg:visible  lg:top-4 lg:right-[19%] pointer-events-none" />

                        <div className="flex flex-col max-w-[312px]  justify-center items-center gap-3  p-6 pb-10 rounded-xl hover:bg-white group duration-150">
                            <div className="w-18 h-18 rounded-full bg-white group-hover:bg-primary-500 grid place-items-center duration-150">
                                <AddAccountIcon className="text-primary-500 group-hover:text-white" />
                            </div>
                            <span className="text-base lg:text-lg font-medium text-customGray-900 mt-3 text-center">Create an Account</span>
                        </div>


                        <div className="flex flex-col max-w-[312px]  justify-center items-center gap-3  p-6 pb-10 rounded-xl hover:bg-white group duration-150">
                            <div className="w-18 h-18 rounded-full bg-white group-hover:bg-primary-500 grid place-items-center duration-150">
                                <UploadIcon className="text-primary-500 group-hover:text-white" />
                            </div>
                            <span className="text-base lg:text-lg font-medium text-customGray-900 mt-3 text-center">Upload CV/Resume</span>
                        </div>


                        <div className="flex flex-col max-w-[312px]  justify-center items-center gap-3  p-6 pb-10 rounded-xl hover:bg-white group duration-150">
                            <div className="w-18 h-18 rounded-full bg-white group-hover:bg-primary-500 grid place-items-center duration-150">
                                <FindPlusIcon className="text-primary-500 group-hover:text-white" />
                            </div>
                            <span className="text-base lg:text-lg font-medium text-customGray-900 mt-3 text-center">Find Your Job</span>
                        </div>


                        <div className="flex flex-col max-w-[312px]  justify-center items-center gap-3  p-6 pb-10 rounded-xl hover:bg-white group duration-150">
                            <div className="w-18 h-18 rounded-full bg-white group-hover:bg-primary-500 grid place-items-center duration-150">
                                <CheckmarkIcon className="text-primary-500 group-hover:text-white" />
                            </div>
                            <span className="text-base lg:text-lg font-medium text-customGray-900 mt-3 text-center">Apply</span>
                        </div>
                    </div>
                </div>

            </section>


            <section className="mb-10 py-4">
                <div className="xl:px-4 py-10 md:py-16 lg:py-24 max-w-[1320px]  mx-auto">
                    <div className="w-full flex items-center justify-between px-4">
                        <h2 className="font-medium text-xl md:text-[25px] px-4 ">Latest Jobs</h2>
                        <Link href="/vacancies" className="flex items-center gap-1 rounded-sm font-semibold text-primary-500 hover:text-primary-600 border border-primary-50 hover:border-primary-600 hover:bg-primary-50 w-32 h-12 justify-center duration-150 text-nowrap">View All<RightArrowIcon /></Link>
                    </div>

                    <div className="pb-5 px-4 flex gap-4 mt-12 overflow-x-auto sm:flex-col sm:overflow-visible  scroll-smooth snap-x snap-mandatory [scrollbar-width:none]">
                        {latestJobEls}
                    </div>

                </div>
            </section>


            <section className="sm:px-4 py-10 md:py-16 lg:py-24 max-w-[1320px] mx-auto   ">
                <div className="w-full flex items-center justify-between px-4">
                    <h2 className="font-medium text-xl md:text-[25px] px-4 ">Active Companies</h2>
                    <Link href="/employers" className="flex items-center gap-1 rounded-sm font-semibold text-primary-500 hover:text-primary-600 border border-primary-50 hover:border-primary-600 hover:bg-primary-50 w-32 h-12 justify-center duration-150 text-nowrap ">View All<RightArrowIcon /></Link>
                </div>
                <div className=" px-4 sm:px-0 pt-2 pb-5 mt-12 flex gap-5 overflow-x-auto lg:overflow-visible md:flex md:flex-wrap md:justify-center scroll-smooth snap-x snap-mandatory [scrollbar-width:none]">
                    {activeCompanyEls}
                </div>

            </section>


            <hr className="  text-customGray-200" />


            <section className="flex gap-6 flex-wrap sm:flex-nowrap justify-center items-center sm:px-4 py-10 mb-10 md:py-16 lg:py-24 px-4 md:px-8 max-w-[1320px]   mx-auto ">

                <Tilt className="w-full">
                    <div className="bg-customGray-100 max-w-[648px] w-full  p-[50px] rounded-xl shadow-lg">
                        <h4 className="text-[32px] font-medium">Become a Candidate</h4>
                        <p className="text-sm max-w-[312px] text-customGray-600 mt-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad perferendis adipisci odit saepe! Non.</p>
                        <Link href="/sign-up?user_type=candidate" className="max-w-48 mt-[26px] group flex gap-3 rounded-sm font-semibold text-primary-500 hover:text-white bg-white hover:bg-primary-500 cursor-pointer px-6 py-3 duration-150 text-nowrap">Register Now
                            <RightArrowIcon className="w-6 h-6" />
                        </Link>

                    </div>
                </Tilt>


                <Tilt className="w-full" glareEnable={true} glareColor="#ffffff" glareMaxOpacity={0.3}>
                    <div className="bg-primary-600 max-w-[648px] w-full  p-[50px] rounded-xl shadow-2xl duration-150">
                        <h4 className="text-[32px] text-white   font-medium" style={{ transform: "translateZ(40px)" }}>Become an Employer</h4>
                        <p className="text-sm max-w-[312px] text-white mt-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad perferendis adipisci odit saepe! Non.</p>
                        <Link href="/sign-up?user_type=employer" className="max-w-48   mt-[26px] group flex gap-3 rounded-sm font-semibold  text-white hover:text-primary-600  bg-primary-500 hover:bg-white cursor-pointer px-6 py-3 duration-150 text-nowrap">Register Now
                            <RightArrowIcon className="w-6 h-6" />
                        </Link>

                    </div>
                </Tilt>

            </section>

        </>
    )
}

Home.layout = page => {
    const userType = page.props.auth.user?.user_type
    return userType === 'employer' ? <EmployerLayout children={page} /> : <Layout children={page} />

}

export default Home
