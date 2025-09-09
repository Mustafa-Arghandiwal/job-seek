import { Link, usePage } from "@inertiajs/react"
import Job from "../../../Components/Job"
import CandidateDashboardLayout from "../../../Layouts/CandidateDashboardLayout"
import Layout from "../../../Layouts/Layout"
import { formatSalary } from "../../../utils/formatSalary"
import CandidateAppliedJob from "../../../Components/CandidateAppliedJob"



function Overview({ appliedJobsCount, savedJobsCount, applications }) {

    const candidateName = usePage().props.auth.user.full_name


    const applicationEls = applications.map(app => {
        const logo = app.vacancy.employer.detail?.logo_path ? "/storage/" + app.vacancy.employer.detail.logo_path : "/chess_patter.png"
        const salary = formatSalary(app.vacancy.salary_type, app.vacancy.fixed_salary, app.vacancy.min_salary, app.vacancy.max_salary)
        const appliedAt = new Date(app.applied_at).toLocaleString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
        return <CandidateAppliedJob key={app.id} vacancyId={app.vacancy_id} logo={logo} title={app.vacancy.job_title}
            type={app.vacancy.job_type} city={app.vacancy.city} salary={salary} appliedAt={appliedAt} />

    })



    return (
        <>
            <h2 className="font-medium text-lg text-customGray-900 ">Hello {candidateName}</h2>
            <p className="text-sm text-customGray-500 mt-2">Here are some highlights</p>


            <div className="flex sm:gap-6 flex-wrap sm:flex-nowrap">

                <div className="flex justify-between w-[312px] rounded-lg bg-primary-50 p-6 mt-6">
                    <div>
                        <div className="font-semibold text-customGray-900 text-2xl">{appliedJobsCount}</div>
                        <div className="text-customGray-600 text-sm">Applied Job{appliedJobsCount !== 1 && 's'}</div>
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
                        <div className="font-semibold text-customGray-900 text-2xl">{savedJobsCount}</div>
                        <div className="text-customGray-600 text-sm">Saved Job{savedJobsCount !== 1 && 's'}</div>
                    </div>
                    <div className="grid place-items-center p-4 bg-white rounded-[5px]">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 28L15.9991 23L8 28V6C8 5.73478 8.10536 5.48043 8.29289 5.29289C8.48043 5.10536 8.73478 5 9 5H23C23.2652 5 23.5196 5.10536 23.7071 5.29289C23.8946 5.48043 24 5.73478 24 6V28Z" fill="#FFF6E6" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>

            </div>

            <div className="flex justify-between mt-8">
                <h3 className="font-medium text-customGray-900">Recently Applied Jobs</h3>
                {applications.length !== 0 &&
                    <Link href="/employer/vacancies" className="flex items-center gap-1 cursor-pointer font-medium text-customGray-500 hover:text-primary-500 duration-100">
                        <span>View all</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                }
            </div>



            {applications.length !== 0 ?
                <div className="overflow-x-auto scrollbar-custom  ">
                    <table className="mt-5 w-full text-left  ">
                        <thead className="text-customGray-700 text-xs bg-customGray-50 rounded-sm ">
                            <tr>
                                <td className="px-5 py-3" scope="col">JOB</td>
                                <td className="px-5 py-3" scope="col">DATE APPLIED</td>
                                <td className="px-5 py-3" scope="col">ACTION</td>
                            </tr>
                        </thead>

                        <tbody>
                            {applicationEls}
                        </tbody>

                    </table>
                </div>
                :

                <div className="h-[25dvh] mt-6 flex items-center justify-center gap-2   text-customGray-600 ">
                    <p>You haven't applied to any jobs yet.</p>
                    <Link className="text-primary-500 underline" href="/vacancies">
                        Find a Job
                    </Link>

                </div>
            }



        </>
    )
}


Overview.layout = page => (
    <Layout>
        <CandidateDashboardLayout children={page} />
    </Layout>

)

export default Overview
