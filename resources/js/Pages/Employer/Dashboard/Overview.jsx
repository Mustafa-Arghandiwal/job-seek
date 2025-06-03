
import EmployerDashboardLayout from "../../../Layouts/EmployerDashboardLayout"
import EmployerLayout from "../../../Layouts/EmployerLayout"



function Overview() {
    return (
        <div className="">
            <h1 className="font-medium text-2xl">Overview page</h1>
            Employer Overview This Is
        </div>
    )
}


Overview.layout = page => (
    <EmployerLayout>
        <EmployerDashboardLayout children={page} />
    </EmployerLayout>

)

export default Overview
