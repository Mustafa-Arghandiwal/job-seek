
import { Link, usePage } from "@inertiajs/react"
import EmployerDashboardLayout from "../../../Layouts/EmployerDashboardLayout"
import EmployerLayout from "../../../Layouts/EmployerLayout"
import EmployerJob from "../../../Components/EmployerJob"
import { BriefCaseIcon } from "../../../utils/svgs"



function Overview({ vacancies, openJobsCount, savedCandidatesCount }) {

    const vacancyEls = vacancies.map(vacancy => (
        <EmployerJob key={vacancy.id} vacancy={vacancy} />
    ))

    const employerName = usePage().props.auth.user.full_name
    return (
        <>
            <h2 className="font-medium text-lg text-customGray-900 ">Hello {employerName}</h2>
            <p className="text-sm text-customGray-500 mt-2">Here are some highlights</p>


            <div className="flex sm:gap-6 flex-wrap sm:flex-nowrap">

                <div className="flex justify-between w-[312px] rounded-lg bg-primary-50 p-6 mt-6">
                    <div>
                        <div className="font-semibold text-customGray-900 text-2xl">{openJobsCount}</div>
                        <div className="text-customGray-600 text-sm">Open Job{openJobsCount !== 1 && 's'}</div>
                    </div>
                    <div className="grid place-items-center p-4 bg-white rounded-[5px]">
                        <BriefCaseIcon className="w-8 h-8 text-primary-500" />
                    </div>
                </div>

                <div className="flex justify-between w-[312px] rounded-lg bg-warning-50 p-6 mt-6">
                    <div>
                        <div className="font-semibold text-customGray-900 text-2xl">{savedCandidatesCount}</div>
                        <div className="text-customGray-600 text-sm">Saved Candidate{savedCandidatesCount !== 1 && 's'}</div>
                    </div>
                    <div className="grid place-items-center p-4 bg-white rounded-[5px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path d="M19 14H24" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M19 18H24" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M11.513 18c1.657 0 3-1.343 3-3s-1.343-3-3-3c-1.657 0-3 1.343-3 3s1.343 3 3 3Z" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M7.639 21c.222-.859.723-1.619 1.424-2.162.701-.543 1.563-.838 2.45-.838s1.849.295 2.55.838c.701.543 1.202 1.304 1.424 2.162" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M27 6H5a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h22a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1Z" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>

            </div>

            <div className="flex justify-between mt-8">
                <h3 className="font-medium text-customGray-900">Recently Posted Jobs</h3>
                {vacancies.length !== 0 &&
                    <Link href="/employer/vacancies" className="flex items-center gap-1 cursor-pointer font-medium text-customGray-500 hover:text-primary-500 duration-100">
                        <span>View all</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                }
            </div>


            {vacancies.length !== 0 ?
                <div className="overflow-x-auto scrollbar-custom lg:min-w-[750px]">
                    <table className="mt-6 w-full text-left  ">
                        <thead className="text-customGray-700 text-xs bg-customGray-50 rounded-sm ">
                            <tr>
                                <td className="px-5 py-3" scope="col">JOBS</td>
                                <td className="px-5 py-3" scope="col">STATUS</td>
                                <td className="px-5 py-3" scope="col">APPLICATIONS</td>
                                <td className="px-5 py-3" scope="col">ACTIONS</td>
                            </tr>
                        </thead>
                        <tbody>
                            {vacancyEls}
                        </tbody>
                    </table>

                </div>
                :

                <div className="h-[25dvh] mt-6 flex items-center justify-center gap-2   text-customGray-600 ">
                    <p>You haven't posted any jobs yet.</p>
                    <Link className=" text-primary-500 underline" href="/employer/dashboard/post-job">
                        Post a job
                    </Link>

                </div>
            }

        </>
    )
}


Overview.layout = page => (
    <EmployerLayout>
        <EmployerDashboardLayout children={page} />
    </EmployerLayout>

)

export default Overview
