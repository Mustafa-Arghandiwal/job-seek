import Layout from "../../Layouts/Layout"
import { formatSalary } from "../../utils/formatSalary"


function SingleJobView({ employer, vacancy }) {
    console.log(employer)
    console.log(vacancy)

    const logo = employer.detail?.logo_path ? "/storage/" + employer.detail.logo_path : "/chess_pattern.png"
    const jobTitle = vacancy.job_title
    const companyWebsite = employer.detail?.company_website
    const companyPhone = employer.contact?.phone
    const companyEmail = employer.contact?.email
    const companyFoundingDate = employer.detail?.establish_date
    const companyType = employer.detail?.company_type
    const companySize = employer.detail?.team_size


    const jobPostDate = new Date(vacancy.created_at).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const salary = formatSalary(vacancy.salary_type, vacancy.fixed_salary, vacancy.min_salary, vacancy.max_salary)
    console.log(salary)
    const deadline = new Date(vacancy.deadline).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const jobEducation = vacancy.education
    const location = vacancy?.city || "Remote"
    const jobType = vacancy.job_type
    const jobExperience = vacancy.experience
    const description = vacancy.description
    const responsibilities = vacancy.responsibilities



    console.log(logo)

    return (
        <div className="px-4 sm:px-12 lg:px-24 xl:px-48 pb-30">
            <div className="py-8  flex items-center flex-wrap gap-4  justify-center md:justify-between ">

                <div className="flex gap-6 items-center ">
                    <div className="h-24 min-w-24 bg-cover bg-center rounded-full " style={{ backgroundImage: `url(${logo})` }}></div>
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-2 items-center flex-wrap">
                            <h2 className="text-2xl font-medium text-customGray-900">{jobTitle}</h2>
                            <div className="bg-[#E8F1FF] text-[#0066FF] rounded-full text-sm grid place-items-center h-6 px-3">{jobType}</div>
                        </div>


                        {(companyWebsite || companyPhone || companyEmail) &&
                            <div className="flex flex-wrap gap-2 text-customGray-700 ">
                                {companyWebsite &&
                                    <div className="flex gap-1 items-center ">
                                        <img src="/link_blue.png" className="h-5 w-5" />
                                        <p>{companyWebsite}</p>
                                    </div>
                                }
                                {companyPhone &&
                                    <div className="flex gap-1 items-center">
                                        <img src="/phone_blue.png" className="h-5 w-5" />
                                        <p>{companyPhone}</p>
                                    </div>

                                }
                                {companyEmail &&
                                    <div className="flex gap-1 items-center">
                                        <img src="/envelope_blue.png" className="h-5 w-5" />
                                        <p>{companyEmail}</p>
                                    </div>
                                }

                            </div>
                        }

                    </div>

                </div>

                <div className=" ">
                    <div className="flex gap-3 ">
                        <button className="p-4  rounded-sm cursor-pointer hover:bg-primary-50">
                            <svg width="18" height="18" viewBox="0 0 14 19" fill={`${false ? "#0A65CC" : "none"}`} xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M13 18L6.99931 14.25L1 18V1.5C1 1.30109 1.07902 1.11032 1.21967 0.96967C1.36032 0.829018 1.55109 0.75 1.75 0.75H12.25C12.4489 0.75 12.6397 0.829018 12.7803 0.96967C12.921 1.11032 13 1.30109 13 1.5V18Z"
                                    stroke="#0A65CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                />
                            </svg>
                        </button>

                        <button className="group flex gap-3 rounded-sm font-semibold text-white bg-primary-500 hover:bg-primary-600 cursor-pointer px-6 py-3 duration-150 text-nowrap">Apply Now
                            <svg className="text-white duration-150" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>

                    <p className="text-customGray-500 text-xs text-center xs:text-right mt-2">Job expires on: <span className="text-danger-500">{deadline}</span></p>

                </div>

            </div>


            {/* middle section */}
            <div className="flex flex-col lg:flex-row gap-10 mt-8  justify-between">

                <div className=" max-w-[700px] ">
                    <h2 className="text-customGray-900 text-xl font-medium">Job Description</h2>
                    {(description && description.trim() !== "")
                        ? <div className="mt-4 space-y-4 [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-lg [&_h1,_h2,_h3]:text-customGray-900
                                [&_h1]:font-bold [&_h2,_h3]:font-semibold  [&_p]:text-customGray-600 [&_hr]:text-customGray-200
                                [&_ul]:list-disc [&_li]:ml-6  [&_ul_li::marker]:text-customGray-700
                                [&_ol]:list-decimal [&_ol_li]:ml-6 [&_ol_li::marker]:text-customGray-900"
                            dangerouslySetInnerHTML={{ __html: description }} />
                        : <p className="text-customGray-400 mt-4">Not Provided</p>}


                    <h2 className="text-black text-lg font-medium mt-8">Responsibilities</h2>
                    {(responsibilities && responsibilities.trim() !== "")
                        ? <div className="mt-4 space-y-4 [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-lg [&_h1,_h2,_h3]:text-customGray-900
                                [&_h1]:font-bold [&_h2,_h3]:font-semibold  [&_p]:text-customGray-600 [&_hr]:text-customGray-200
                                [&_ul]:list-disc [&_li]:ml-6  [&_ul_li::marker]:text-customGray-700
                                [&_ol]:list-decimal [&_ol_li]:ml-6 [&_ol_li::marker]:text-customGray-900"
                            dangerouslySetInnerHTML={{ __html: responsibilities }} />
                        : <p className="text-customGray-400 mt-4">Not Provided</p>}

                </div>


                <div className="">

                    <div className="p-8 border border-primary-200  rounded-lg lg:min-w-[400px] max-w-[600px] ">
                        <h3 className="font-medium text-xl text-customGray-900">Job Overview</h3>
                        <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap  gap-2">
                            {/* <div className=" flex flex-col gap-6 "> */}
                                <div className=" min-w-40 ">
                                    <div className="w-8 h-8">
                                        <img src="/single-employer-view-icons/founded-in.png" />
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-xs text-customGray-500 max-w-32">JOB POSTED:</p>
                                        <p className={`mt-2 text-sm  sm:h-10 sm:max-w-32 font-medium text-customGray-900`}>{jobPostDate}</p>
                                    </div>
                                </div>
                                <div className=" min-w-40">
                                    <div className="w-8 h-8">
                                        <img src="/single-employer-view-icons/timer.png" />
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-xs text-customGray-500  max-w-32">JOB EXPIRE ON:</p>
                                        <p className={`mt-2 text-sm  sm:h-10 sm:max-w-32 font-medium text-customGray-900`}>{deadline}</p>
                                    </div>
                                </div>
                            {/* </div> */}


                            {/* <div className=" flex flex-col gap-6 "> */}
                                <div className=" min-w-40">
                                    <div className="w-8 h-8">
                                        <img src="/single-employer-view-icons/grad_cap.png" />
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-xs text-customGray-500  max-w-32">EDUCATION:</p>
                                        <p className={`mt-2 text-sm  sm:h-10 sm:max-w-32 font-medium text-customGray-900`}>{jobEducation}</p>
                                    </div>
                                </div>

                            {/* </div> */}


                            {/* <div className=" flex flex-col gap-6 "> */}
                                <div className=" min-w-40">
                                    <div className="w-8 h-8">
                                        <img src="/single-employer-view-icons/wallet.png" />
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-xs text-customGray-500  max-w-32">SALARY:</p>
                                        <p className={`mt-2 text-sm  sm:h-10 sm:max-w-32 font-medium text-customGray-900`}>{salary}</p>
                                    </div>
                                </div>
                                <div className=" min-w-40">
                                    <div className="w-8 h-8">
                                        <img src="/single-employer-view-icons/location.png" />
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-xs text-customGray-500  max-w-32">LOCATION:</p>
                                        <p className={`mt-2 text-sm  sm:h-10 sm:max-w-32 font-medium text-customGray-900`}>{location}</p>
                                    </div>
                                </div>

                                <div className=" min-w-40">
                                    <div className="w-8 h-8">
                                        <img src="/single-employer-view-icons/industry-type.png" />
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-xs text-customGray-500  max-w-32">EXPERIENCE</p>
                                        <p className={`mt-2 text-sm  sm:h-10 sm:max-w-32 font-medium text-customGray-900`}>{jobExperience}</p>
                                    </div>
                                </div>

                            {/* </div> */}


                        </div>

                    </div>






                    {/*contact info*/}
                    {/* <div className="border border-primary-200 rounded-lg p-8 mt-6 max-w-[340px]  w-full"> */}

                    {/*     <h3 className="text-customGray-900 font-medium text-xl ">Contact Information</h3> */}

                    {/*     <div className="flex items-center gap-4 py-6 border-b border-b-customGray-100"> */}
                    {/*         <div className="w-8 h-8 shrink-0"> */}
                    {/*             <img src="/single-employer-view-icons/website.png" className="-0" /> */}
                    {/*         </div> */}
                    {/*         <div className=""> */}
                    {/*             <p className="text-xs text-customGray-500">WEBSITE</p> */}
                    {/*             <p className={`mt-2 text-sm max-w-[290px] break-all ${website ? "text-customGray-900 font-medium" : "text-customGray-400"}`}>{website || "Not provided"}</p> */}
                    {/*         </div> */}
                    {/*     </div> */}

                    {/*     <div className="flex items-center gap-4 py-6 border-b border-b-customGray-100"> */}
                    {/*         <div className="w-8 h-8 shrink-0"> */}
                    {/*             <img src="/single-employer-view-icons/phone.png" className="" /> */}
                    {/*         </div> */}
                    {/*         <div className=""> */}
                    {/*             <p className="text-xs text-customGray-500">PHONE</p> */}
                    {/*             <p className={`mt-2 text-sm max-w-[290px] break-all ${phone ? "text-customGray-900 font-medium" : "text-customGray-400"}`}>{phone || "Not provided"}</p> */}
                    {/*         </div> */}
                    {/*     </div> */}

                    {/*     <div className="flex items-center gap-4 pt-6 "> */}
                    {/*         <div className="w-8-h-8 shrink-0"> */}
                    {/*             <img src="/single-employer-view-icons/envelope.png" className="shrink-0" /> */}
                    {/*         </div> */}
                    {/*         <div className=""> */}
                    {/*             <p className="text-xs text-customGray-500">EMAIL ADDRESS</p> */}
                    {/*             <p className={`mt-2 text-sm max-w-[290px] break-all ${email ? "text-customGray-900 font-medium" : "text-customGray-400"}`}>{email || "Not provided"}</p> */}
                    {/*         </div> */}
                    {/*     </div> */}

                    {/* </div> */}



                    {/* Follow us on */}
                    {/* <div className="border border-primary-200 p-7 sm:p-8 rounded-lg mt-6 max-w-[340px] w-full"> */}
                    {/*     <h3 className="text-customGray-900 font-medium text-xl ">Follow us on:</h3> */}
                    {/*     {socialIcons.length !== 0 ? */}

                    {/*         <div className="flex gap-3 mt-4 flex-wrap"> */}
                    {/*             {socialIcons} */}
                    {/*         </div> */}
                    {/*         : */}
                    {/*         <p className="text-customGray-400 mt-4">Not provided</p> */}
                    {/*     } */}

                    {/* </div> */}


                </div>

            </div>


        </div>
    )
}



SingleJobView.layout = page => <Layout children={page} />
export default SingleJobView
