

import EmployerJob from "../../../Components/EmployerJob"
import EmployerDashboardLayout from "../../../Layouts/EmployerDashboardLayout"
import EmployerLayout from "../../../Layouts/EmployerLayout"



function MyJobs({ vacancies }) {
    const vacancyEls = vacancies.map(vacancy => (
        <EmployerJob key={vacancy.id} vacancy={vacancy} />
    ))
    return (
        <>
            <h1 className="font-medium text-xl text-customGray-900 flex gap-1">My Jobs
                <span className="font-normal text-customGray-400">({vacancies.length})</span>
            </h1>
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

                <div className="h-[40dvh] mt-6 grid place-items-center font-medium text-lg text-customGray-600 ">Jobs you post will be listed here.</div>
            }
        </>
    )
}


MyJobs.layout = page => (
    <EmployerLayout>
        <EmployerDashboardLayout children={page} />
    </EmployerLayout>

)

export default MyJobs
