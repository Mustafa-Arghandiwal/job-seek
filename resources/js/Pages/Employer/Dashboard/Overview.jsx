
import { Link, usePage } from "@inertiajs/react"
import EmployerDashboardLayout from "../../../Layouts/EmployerDashboardLayout"
import EmployerLayout from "../../../Layouts/EmployerLayout"
import EmployerJob from "../../../Components/EmployerJob"



function Overview({ vacancies, openJobsCount, savedCandidatesCount}) {

    const vacancyEls = vacancies.map(vacancy => (
        <EmployerJob key={vacancy.id} vacancy={vacancy} />
    ))

    const employerName = usePage().props.auth.user.full_name
    return (
        <div className="">
            <h2 className="font-medium text-lg text-customGray-900 ">Hello {employerName}</h2>
            <p className="text-sm text-customGray-500 mt-2">Here are some highlights</p>


            <div className="flex gap-6">

                <div className="flex justify-between w-[312px] rounded-lg bg-primary-50 p-6 mt-6">
                    <div>
                        <div className="font-semibold text-customGray-900 text-2xl">{openJobsCount}</div>
                        <div className="text-customGray-600 text-sm">Open Job{openJobsCount !== 1 && 's'}</div>
                    </div>
                    <div className="grid place-items-center p-4 bg-white rounded-[5px]">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.2" d="M16 19.0004C11.7872 19.007 7.64764 17.8995 4.00098 15.7902V26.0004C4.00098 26.1317 4.02684 26.2618 4.0771 26.3831C4.12735 26.5044 4.20101 26.6147 4.29387 26.7075C4.38673 26.8004 4.49697 26.8741 4.61829 26.9243C4.73962 26.9746 4.86965 27.0004 5.00098 27.0004H27.001C27.1323 27.0004 27.2623 26.9746 27.3837 26.9243C27.505 26.8741 27.6152 26.8004 27.7081 26.7075C27.8009 26.6147 27.8746 26.5044 27.9249 26.3831C27.9751 26.2618 28.001 26.1317 28.001 26.0004V15.7891C24.3539 17.8991 20.2135 19.0071 16 19.0004Z" fill="#0A65CC" />
                            <path d="M27.001 9H5.00098C4.44869 9 4.00098 9.44772 4.00098 10V26C4.00098 26.5523 4.44869 27 5.00098 27H27.001C27.5533 27 28.001 26.5523 28.001 26V10C28.001 9.44772 27.5533 9 27.001 9Z" stroke="#0A65CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M21 9V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H13C12.4696 5 11.9609 5.21071 11.5858 5.58579C11.2107 5.96086 11 6.46957 11 7V9" stroke="#0A65CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M28.0012 15.7891C24.354 17.8991 20.2137 19.007 16.0002 19.0004C11.7873 19.007 7.64768 17.8995 4.00098 15.7901" stroke="#0A65CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M14.5 15H17.5" stroke="#0A65CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
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
                <table className="mt-6 w-full text-left overflow-x-auto min-w-[600px]">
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
                :

                <div className="h-[25dvh] mt-6 flex items-center justify-center gap-2   text-customGray-600 ">
                    <p>You haven't posted any jobs yet.</p>
                    <Link className=" text-primary-500 underline" href="/employer/dashboard/post-job">
                        Post a job
                    </Link>

                </div>
            }

        </div>
    )
}


Overview.layout = page => (
    <EmployerLayout>
        <EmployerDashboardLayout children={page} />
    </EmployerLayout>

)

export default Overview
