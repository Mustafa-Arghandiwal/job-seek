import OpenPosition from "../../Components/OpenPosition"
import Layout from "../../Layouts/Layout"
import { TwitterIcon, LinkedInIcon, FacebookIcon, InstagramIcon, YouTubeIcon } from "./socialMediaSvgs"


function SingleEmployerPage({ id }) {

    return (
        <div className="lg:px-24 xl:px-48 pb-10">
            <div className="h-[20dvh] border border-customGray-100 overflow-hidden  rounded-b-lg z-10 bg-[url('/chess_pattern_cover.png')] relative hover:z-40 hover:h-[30dvh]  hover:opacity-95 duration-100 bg-cover bg-center ">
                {/* <img src="/chess_pattern_cover.png" alt="cover photo" className="w-full h-full object-cover bg-repeat-x" /> */}
            </div>

            <div className=" mx-4 sm:mx-24 -mt-9 sm:-mt-[60px]  ">

                <div className="rounded-xl z-10 border bg-white shadow-lg border-customGray-100 relative px-4 sm:px-10 py-3 sm:py-6 flex gap-3 flex-col lg:flex-row justify-between sm:items-center">
                    <div className="flex gap-6">
                        <div className="h-16 min-w-16 bg-cover bg-center rounded-md" style={{ backgroundImage: "url('/chess_pattern.png')" }}></div>
                        <div className=" flex flex-col gap-[10px] ">
                            <p className="text-customGray-900 font-medium text-xl sm:text-2xl">Some Random Company</p>
                            <p className="text-customGray-600 text-sm sm:text-base line-clamp-1">Transportations</p>
                        </div>

                    </div>

                    <button className="flex gap-3 justify-center rounded-sm font-semibold  text-white bg-primary-500 hover:bg-primary-600 cursor-pointer px-6 py-3 duration-150 text-nowrap">
                        View Open Positions
                        <svg className="rotate-90 duration-150  " width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>


                <div className="flex flex-col lg:flex-row gap-10 mt-12">

                    <div className="max-w-[724px] ">
                        <h2 className="text-customGray-900 text-xl font-medium">Description</h2>
                        <p className="text-customGray-600 mt-4">
                            Fusce et erat at nibh maximus fermentum. Mauris ac justo nibh. Praesent nec lorem lorem. Donec ullamcorper lacus mollis tortor pretium malesuada. In quis porta nisi, quis fringilla orci. Donec porttitor, odio a efficitur blandit, orci nisl porta elit, eget vulputate quam nibh ut tellus. Sed ut posuere risus, vitae commodo velit. Nullam
                        </p>
                    </div>

                    <div className="">

                        <div className="  max-w-[360px] w-full flex  flex-col sm:flex-row  gap-6   p-8 border border-primary-200  rounded-lg">

                            <div className=" flex flex-col gap-6 ">
                                <div className=" min-w-40">
                                    <div className="w-8 h-8">
                                        <img src="/single-employer-view-icons/founded-in.png" />
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-xs text-customGray-500 max-w-32">FOUNDED IN:</p>
                                        <p className="mt-2 text-sm font-medium text-customGray-900 sm:h-10 sm:max-w-32">13 June, 2021</p>
                                    </div>
                                </div>
                                <div className=" min-w-40">
                                    <div className="w-8 h-8">
                                        <img src="/single-employer-view-icons/user.png" />
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-xs text-customGray-500  max-w-32">TEAM SIZE</p>
                                        <p className="mt-2 text-sm font-medium sm:h-10  text-customGray-900 sm:max-w-32">120-300 Employees</p>
                                    </div>
                                </div>

                            </div>


                            <div className=" flex flex-col gap-6 ">
                                <div className=" min-w-40">

                                    <div className="w-8 h-8">
                                        <img src="/single-employer-view-icons/org-type.png" />
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-xs text-customGray-500  max-w-32">ORGANIZATION TYPE</p>
                                        <p className="mt-2  sm:h-10 text-sm font-medium text-customGray-900 sm:max-w-32">Telecommunication Company</p>
                                    </div>
                                </div>
                                <div className=" min-w-40">
                                    <div className="w-8 h-8">
                                        <img src="/single-employer-view-icons/industry-type.png" />
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-xs text-customGray-500  max-w-32">INDUSTRY TYPE</p>
                                        <p className="mt-2 text-sm font-medium sm:h-10 text-customGray-900 sm:max-w-32 ">Technology (IT of things)</p>
                                    </div>
                                </div>

                            </div>



                        </div>






                        {/*contact info*/}
                        <div className="border border-primary-200 rounded-lg p-8 mt-6 max-w-[360px]  w-full">

                            <h3 className="text-customGray-900 font-medium text-xl ">Contact Information</h3>

                            <div className="flex items-center gap-4 py-6 border-b border-b-customGray-100">
                                <div className="w-8 h-8 shrink-0">
                                    <img src="/single-employer-view-icons/website.png" className="-0" />
                                </div>
                                <div className="">
                                    <p className="text-xs text-customGray-500">WEBSITE</p>
                                    <p className="mt-2 text-sm font-medium  max-w-[290px] break-all  text-customGray-900">www.somelongasswebsitedomainmorewords.com</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 py-6 border-b border-b-customGray-100">
                                <div className="w-8 h-8 shrink-0">
                                    <img src="/single-employer-view-icons/phone.png" className="" />
                                </div>
                                <div className="">
                                    <p className="text-xs text-customGray-500">PHONE</p>
                                    <p className="mt-2 text-sm font-medium text-customGray-900">+1-202-555-0141</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 pt-6 ">
                                <div className="w-8-h-8 shrink-0">
                                    <img src="/single-employer-view-icons/envelope.png" className="shrink-0" />
                                </div>
                                <div className="">
                                    <p className="text-xs text-customGray-500">EMAIL ADDRESS</p>
                                    <p className="mt-2 text-sm font-medium max-w-[290px] break-all text-customGray-900">contact@acme.org</p>
                                </div>
                            </div>

                        </div>



                        {/* Follow us on */}
                        <div className="border border-primary-200 p-7 sm:p-8 rounded-lg mt-6 max-w-[360px] w-full">
                            <h3 className="text-customGray-900 font-medium text-xl ">Follow us on:</h3>
                            <div className="flex gap-3 mt-4 flex-wrap">
                                <div className=" text-primary-50 hover:text-primary-100">
                                    <LinkedInIcon />
                                </div>
                                <div className=" text-primary-50 hover:text-primary-100">
                                    <TwitterIcon />
                                </div>
                                <div className=" text-primary-50 hover:text-primary-100">
                                    <FacebookIcon />
                                </div>
                                <div className=" text-primary-50 hover:text-primary-100">
                                    <InstagramIcon />
                                </div>
                                <div className=" text-primary-50 hover:text-primary-100">
                                    <YouTubeIcon />
                                </div>

                            </div>

                        </div>


                    </div>

                </div>

            </div>

            <hr className="text-customGray-200  mt-32" />



            {/* Open positions */}

            <div className="mt-20">
                <h3 className="text-customGray-900 mb-12 ml-4 font-medium text-4xl">Open Positions</h3>
                <div className="pb-5 px-4 flex gap-6 sm:flex-wrap   scroll-smooth snap-x snap-mandatory [scrollbar-width:none] overflow-x-auto  sm:overflow-visible">
                    <OpenPosition title={"Visual Designer"} />
                    <OpenPosition title={"Frontend Development Intern - temporary"} />
                    <OpenPosition title={"UI/UX Designer"} />
                    <OpenPosition title={"UI/UX Designer"} />
                    {/* <OpenPosition title={"UI/UX Designer"} /> */}
                </div>
            </div>
        </div >
    )
}



SingleEmployerPage.layout = page => <Layout children={page} />
export default SingleEmployerPage
