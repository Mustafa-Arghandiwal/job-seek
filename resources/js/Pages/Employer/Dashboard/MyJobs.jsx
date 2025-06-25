

import EmployerJob from "../../../Components/EmployerJob"
import EmployerDashboardLayout from "../../../Layouts/EmployerDashboardLayout"
import EmployerLayout from "../../../Layouts/EmployerLayout"



function Overview() {
    return (
        <>
            <h1 className="font-medium text-2xl">My Jobs</h1>
            <table className="mt-8 w-full text-left overflow-x-auto min-w-[600px]">

                <thead className="text-customGray-700 text-xs bg-customGray-50 rounded-sm font-medium">
                    <tr>
                        <th className="px-5 py-3" scope="col">JOBS</th>
                        <th className="px-5 py-3" scope="col">STATUS</th>
                        <th className="px-5 py-3" scope="col">APPLICATIONS</th>
                        <th className="px-5 py-3" scope="col">ACTIONS</th>
                    </tr>
                </thead>

                <tbody>
                    <EmployerJob />
                    <EmployerJob />
                    <EmployerJob />
               </tbody>

            </table>
        </>
    )
}


Overview.layout = page => (
    <EmployerLayout>
        <EmployerDashboardLayout children={page} />
    </EmployerLayout>

)

export default Overview
