import OpenPosition from "../../Components/OpenPosition"
import Layout from "../../Layouts/Layout"
import EmployerLayout from "../../Layouts/EmployerLayout"
import { formatSalary } from "../../utils/formatSalary"
import PaginationLinks from "../../utils/getPaginationLinks"
import { TwitterIcon, LinkedInIcon, FacebookIcon, InstagramIcon, YouTubeIcon, GitHubIcon } from "./socialMediaSvgs"
import { RightArrowIcon, CalendarIcon, UserIcon, BuildingIcon2, GlobeIcon, SimpleBriefCaseIcon, MailIcon, PhoneIcon } from "../../utils/svgs"


function SingleEmployerPage({ employerDetails, vacancies }) {
    const ed = employerDetails[0]
    const logo = ed.detail?.logo_path ? "/storage/" + ed.detail.logo_path : null
    const banner = ed.detail?.banner_path ? "/storage/" + ed.detail.banner_path : null
    const companyName = ed.user.full_name
    const industryType = ed.detail?.industry_type
    const orgType = ed.detail?.company_type
    const about = ed.detail?.about
    const establishDate = ed.detail?.establish_date
    const teamSize = ed.detail?.team_size
    const website = ed.detail?.company_website
    const phone = ed.contact?.phone
    const email = ed.contact?.email
    const socialLinks = ed.social_link

    const openPositions = vacancies.data.map(vacancy => {
        const salary = formatSalary(vacancy.salary_type, vacancy.fixed_salary, vacancy.min_salary, vacancy.max_salary)

            return <OpenPosition key={vacancy.id} id={vacancy.id} title={vacancy.job_title} city={vacancy?.city} companyName={companyName}
                jobType={vacancy.job_type} salary={salary} logo={logo} />
    })


    const socialIcons = socialLinks.map(link => {
        if (link.social_type === "LinkedIn") {
            return (
                <a href={link.url} target="_blank" key={link.id} className=" text-primary-50 hover:text-primary-100">
                    <LinkedInIcon />
                </a>
            )

        } else if (link.social_type === "X") {
            return (
                <a href={link.url} target="_blank" key={link.id} className=" text-primary-50 hover:text-primary-100">
                    <TwitterIcon />
                </a>
            )
        } else if (link.social_type === "GitHub") {
            return (
                <a href={link.url} target="_blank" key={link.id} className=" text-primary-50 hover:text-primary-100">
                    <GitHubIcon />
                </a>
            )
        } else if (link.social_type === "Instagram") {
            return (
                <a href={link.url} target="_blank" key={link.id} className=" text-primary-50 hover:text-primary-100">
                    <InstagramIcon />
                </a>
            )
        }
        else {
            return null
        }
    })

    return (
        <div className="lg:px-24 xl:px-48 pb-30">

            <div className={`h-[30dvh] sm:h-[40dvh] border border-customGray-100 overflow-hidden rounded-b-lg z-10 relative duration-200 bg-cover bg-center `}
                style={{ backgroundImage: `url(${banner || "/chess_pattern_cover.png"})` }}
            >
            </div>

            <div className=" mx-4 sm:mx-24 -mt-9 sm:-mt-[60px]  ">

                <div className="rounded-xl z-10 border bg-white shadow-lg border-customGray-100 relative px-4 sm:px-10 py-3 sm:py-6 flex gap-3 flex-col lg:flex-row justify-between sm:items-center">
                    <div className="flex gap-6">
                        <div className="h-16 min-w-16 bg-cover bg-center rounded-md" style={{ backgroundImage: `url(${logo || "/chess_pattern.png"})` }}></div>
                        <div className=" flex flex-col gap-[10px] ">
                            <p className="text-customGray-900 font-medium text-xl sm:text-2xl">{companyName}</p>
                            <p className="text-customGray-600 text-sm sm:text-base line-clamp-1">{industryType}</p>
                        </div>

                    </div>

                    <a href="#open-positions-section" className="flex gap-3 justify-center rounded-sm font-semibold  text-white bg-primary-500 hover:bg-primary-600 cursor-pointer px-6 py-3 duration-150 text-nowrap">
                        View Open Positions
                        <RightArrowIcon className="w-6 h-6 rotate-90" />
                    </a>
                </div>


                <div className="flex flex-col lg:flex-row gap-10 mt-12  lg:justify-between">

                    <div className="max-w-[600px] w-full">
                        <h2 className="text-customGray-900 text-xl font-medium">About Company</h2>
                        {about
                            ? <div className="mt-4 space-y-4 [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-lg [&_h1,_h2,_h3]:text-customGray-900
                                [&_h1]:font-bold [&_h2,_h3]:font-semibold  [&_p]:text-customGray-600 [&_hr]:text-customGray-200
                                [&_ul]:list-disc [&_li]:ml-6  [&_ul_li::marker]:text-customGray-700
                                [&_ol]:list-decimal [&_ol_li]:ml-6 [&_ol_li::marker]:text-customGray-900 [&_a]:text-primary-500 [&_a]:underline "
                                dangerouslySetInnerHTML={{ __html: about }} />
                            : <p className="text-customGray-400 mt-4">Not Provided</p>}
                    </div>

                    <div className="">

                        <div className="  max-w-[340px] w-full flex  flex-col sm:flex-row  gap-6   p-8 border border-primary-200  rounded-lg">

                            <div className=" flex flex-col gap-6 ">
                                <div className=" min-w-40">
                                    <div className="w-8 h-8">
                                        <CalendarIcon className="w-8 h-8 text-primary-500" />
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-xs text-customGray-500 max-w-32">FOUNDED IN:</p>
                                        <p className={`mt-2 text-sm  sm:h-10 sm:max-w-32 ${establishDate ? "font-medium text-customGray-900" : "text-customGray-400"}`}>{establishDate || "Not provided"}</p>
                                    </div>
                                </div>
                                <div className=" min-w-40">

                                    <div className="w-8 h-8">
                                        <BuildingIcon2 className="text-primary-500 w-8 h-8" />
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-xs text-customGray-500  max-w-32">ORGANIZATION TYPE</p>
                                        <p className={`mt-2 text-sm  sm:h-10 sm:max-w-32 ${orgType ? "font-medium text-customGray-900" : "text-customGray-400"}`}>{orgType || "Not provided"}</p>
                                    </div>
                                </div>
                            </div>


                            <div className=" flex flex-col gap-6 ">
                                <div className=" min-w-40">
                                    <div className="w-8 h-8">
                                        <UserIcon className="w-8 h-8 text-primary-500"/>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-xs text-customGray-500  max-w-32">TEAM SIZE</p>
                                        <p className={`mt-2 text-sm  sm:h-10 sm:max-w-32 ${teamSize ? "font-medium text-customGray-900" : "text-customGray-400"}`}>{teamSize || "Not provided"}</p>
                                    </div>
                                </div>
                                <div className=" min-w-40">
                                    <div className="w-8 h-8">
                                        <SimpleBriefCaseIcon className="w-8 h-8 text-primary-500" />
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-xs text-customGray-500  max-w-32">INDUSTRY TYPE</p>
                                        <p className={`mt-2 text-sm  sm:h-10 sm:max-w-32 ${industryType ? "font-medium text-customGray-900" : "text-customGray-400"}`}>{industryType || "Not provided"}</p>
                                    </div>
                                </div>

                            </div>



                        </div>






                        {/*contact info*/}
                        <div className="border border-primary-200 rounded-lg p-8 mt-6 max-w-[340px]  w-full">

                            <h3 className="text-customGray-900 font-medium text-xl ">Contact Information</h3>

                            <div className="flex items-center gap-4 py-6 border-b border-b-customGray-100">
                                <div className="w-8 h-8 shrink-0">
                                    <GlobeIcon className="text-primary-500"/>
                                </div>
                                <div className="">
                                    <p className="text-xs text-customGray-500">WEBSITE</p>
                                    <p className={`mt-2 text-sm max-w-[290px] break-all ${website ? "text-customGray-900 font-medium" : "text-customGray-400"}`}>{website || "Not provided"}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 py-6 border-b border-b-customGray-100">
                                <div className="w-8 h-8 shrink-0">
                                    <PhoneIcon />
                                </div>
                                <div className="">
                                    <p className="text-xs text-customGray-500">PHONE</p>
                                    <p className={`mt-2 text-sm max-w-[290px] break-all ${phone ? "text-customGray-900 font-medium" : "text-customGray-400"}`}>{phone || "Not provided"}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 pt-6 ">
                                <div className="w-8-h-8 shrink-0">
                                    <MailIcon className="w-8 h-8 text-primary-500"/>
                                </div>
                                <div className="">
                                    <p className="text-xs text-customGray-500">EMAIL ADDRESS</p>
                                    <p className={`mt-2 text-sm max-w-[290px] break-all ${email ? "text-customGray-900 font-medium" : "text-customGray-400"}`}>{email || "Not provided"}</p>
                                </div>
                            </div>

                        </div>



                        {/* Follow us on */}
                        <div className="border border-primary-200 p-7 sm:p-8 rounded-lg mt-6 max-w-[340px] w-full">
                            <h3 className="text-customGray-900 font-medium text-xl ">Follow us on:</h3>
                            {socialIcons.length !== 0 ?

                                <div className="flex gap-3 mt-4 flex-wrap">
                                    {socialIcons}
                                </div>
                                :
                                <p className="text-customGray-400 mt-4">Not provided</p>
                            }

                        </div>


                    </div>

                </div>

            </div>

            <hr className="text-customGray-200  mt-32 " />



            {/* Open positions */}

            <div className="mt-20 " id="open-positions-section">
                <h3 className="text-customGray-900 mb-12 ml-4 font-medium text-4xl">Open Positions</h3>
                {openPositions.length !== 0 ?
                    <div className="pb-5 px-4 flex gap-6 sm:flex-wrap sm:justify-center scroll-smooth snap-x snap-mandatory [scrollbar-width:none]  overflow-x-auto  sm:overflow-visible">
                        {openPositions}
                        <PaginationLinks paginator={vacancies}/>
                    </div>
                    :
                    <div className="grid px-4 place-items-center h-[10dvh] text-customGray-500 text-lg text-center sm:text-xl">
                        This employer has no open positions at the moment.
                    </div>
                }
            </div>
        </div >
    )
}



// SingleEmployerPage.layout = page => <Layout children={page} />

SingleEmployerPage.layout = page => {
    const userType = page.props?.auth?.user?.user_type
    if (userType === "employer") {
        return <EmployerLayout>{page}</EmployerLayout>
    }
    return <Layout>{page}</Layout>
}

export default SingleEmployerPage
