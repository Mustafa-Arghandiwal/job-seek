import Layout from "../../Layouts/Layout"
import { TwitterIcon, LinkedInIcon, FacebookIcon, InstagramIcon, YouTubeIcon  } from "./socialMediaSvgs"


function SingleEmployerPage({ id }) {

    console.log(id)
    return (
        <div className=" lg:px-24 xl:px-48 pb-10">
            <div className="h-[20dvh] border border-customGray-100 overflow-hidden  rounded-b-lg z-10 bg-[url('/lightsaber.png')] relative hover:z-40 hover:scale-110 hover:opacity-95 duration-100 bg-cover bg-center ">
                {/* <img src="/chess_pattern_cover.png" alt="cover photo" className="w-full h-full object-cover bg-repeat-x" /> */}
            </div>

            <div className="mx-12 sm:mx-24 -mt-9 sm:-mt-[60px]  ">

                <div className="rounded-xl z-10 border bg-white shadow-lg border-customGray-100 relative px-4 sm:px-10 py-3 sm:py-6 flex gap-3 flex-col sm:flex-row justify-between sm:items-center">
                    <div className="flex gap-6">
                        <div className="h-16 min-w-16 bg-cover bg-center rounded-md" style={{ backgroundImage: "url('/chess_pattern.png')" }}></div>
                        <div className=" flex flex-col gap-[10px] ">
                            <p className="text-customGray-900 font-medium text-xl sm:text-2xl">Twitter</p>
                            <p className="text-customGray-600 text-sm sm:text-base">Information Technology (IT)</p>
                        </div>

                    </div>

                    <button className="hidden sm:flex gap-3 text-sm sm:text-base rounded-sm font-semibold  text-white bg-primary-500 hover:bg-primary-600 cursor-pointer px-6 py-3 duration-150 text-nowrap">
                        View Open Positions
                        <svg className="rotate-90 duration-150" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>


                <div className="flex gap-10 mt-12">

                    <div className="max-w-[724px] ">
                        <h2 className="text-customGray-900 text-xl font-medium">Description</h2>
                        <p className="text-customGray-600 mt-4">
                            Fusce et erat at nibh maximus fermentum. Mauris ac justo nibh. Praesent nec lorem lorem. Donec ullamcorper lacus mollis tortor pretium malesuada. In quis porta nisi, quis fringilla orci. Donec porttitor, odio a efficitur blandit, orci nisl porta elit, eget vulputate quam nibh ut tellus. Sed ut posuere risus, vitae commodo velit. Nullam in lorem dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla tincidunt ac quam quis vehicula. Quisque sagittis ullamcorper magna. Vivamus elementum eu leo et gravida. Sed dignissim placerat diam, ac laoreet eros rutrum sit amet. Donec imperdiet in leo et imperdiet. In hac habitasse platea dictumst. Sed quis nisl molestie diam ullamcorper condimentum. Sed aliquet, arcu eget pretium bibendum, odio enim rutrum arcu, quis suscipit mauris turpis in neque. Vestibulum id vestibulum odio. Sed dolor felis, iaculis eget turpis eu, lobortis imperdiet massa.
                        </p>
                    </div>

                    <div className=" ">

                        <div className=" max-w-[538px] flex  gap-6   p-8 border border-primary-200  rounded-lg">

                            <div className=" flex flex-col gap-6">
                                <div className=" min-w-40">
                                    <div className="w-8 h-8">
                                        <img src="/single-employer-view-icons/founded-in.png" />
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-xs text-customGray-500">FOUNDED IN:</p>
                                        <p className="mt-2 text-sm font-medium text-customGray-900">13 June, 2021</p>
                                    </div>
                                </div>
                                <div className=" min-w-40">
                                    <div className="w-8 h-8">
                                        <img src="/single-employer-view-icons/user.png" />
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-xs text-customGray-500">TEAM SIZE</p>
                                        <p className="mt-2 text-sm font-medium text-customGray-900">120-300 Employees</p>
                                    </div>
                                </div>

                            </div>


                            <div className=" flex flex-col gap-6">
                                <div className=" min-w-40">

                                    <div className="w-8 h-8">
                                        <img src="/single-employer-view-icons/org-type.png" />
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-xs text-customGray-500 ">ORGANIZATION TYPE</p>
                                        <p className="mt-2 text-sm font-medium text-customGray-900">Private Company</p>
                                    </div>
                                </div>
                                <div className=" min-w-40">
                                    <div className="w-8 h-8">
                                        <img src="/single-employer-view-icons/industry-type.png" />
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-xs text-customGray-500">INDUSTRY TYPE</p>
                                        <p className="mt-2 text-sm font-medium text-customGray-900">Technology</p>
                                    </div>
                                </div>

                            </div>



                        </div>






                        {/*contact info*/}
                        <div className="border border-primary-200 rounded-lg p-8 mt-6">

                            <h3 className="text-customGray-900 font-medium text-xl ">Contact Information</h3>

                            <div className="flex items-center gap-4 py-6 border-b border-b-customGray-100">
                                <div className="w-8 h-8">
                                    <img src="/single-employer-view-icons/website.png" className="" />
                                </div>
                                <div className="">
                                    <p className="text-xs text-customGray-500">WEBSITE</p>
                                    <p className="mt-2 text-sm font-medium text-customGray-900">www.acme-official.org</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 py-6 border-b border-b-customGray-100">
                                <div className="w-8 h-8">
                                    <img src="/single-employer-view-icons/phone.png" className="" />
                                </div>
                                <div className="">
                                    <p className="text-xs text-customGray-500">PHONE</p>
                                    <p className="mt-2 text-sm font-medium text-customGray-900">+1-202-555-0141</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 pt-6 ">
                                <div className="w-8-h-8">
                                    <img src="/single-employer-view-icons/envelope.png" className="" />
                                </div>
                                <div className="">
                                    <p className="text-xs text-customGray-500">EMAIL ADDRESS</p>
                                    <p className="mt-2 text-sm font-medium text-customGray-900">contact@acme.org</p>
                                </div>
                            </div>

                        </div>



                        {/* Follow us on */}
                        <div className="border border-primary-200 p-8 rounded-lg mt-6 ">
                            <h3 className="text-customGray-900 font-medium text-xl ">Follow us on:</h3>
                            <div className="flex gap-3 mt-4">
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

        </div >
    )
}



SingleEmployerPage.layout = page => <Layout children={page} />
export default SingleEmployerPage
