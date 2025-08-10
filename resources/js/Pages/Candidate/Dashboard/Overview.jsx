import Job from "../../../Components/Job"
import CandidateDashboardLayout from "../../../Layouts/CandidateDashboardLayout"
import Layout from "../../../Layouts/Layout"



function Overview() {
    return (
        <div className=" ">
            <h1 className="text-3xl">Overview page</h1>
            <div>
                <Job />
                <Job />
                <Job />
                <Job />
                <Job />
                <Job />
                <Job />
            </div>
        </div>
    )
}


Overview.layout = page => (
    <Layout>
        <CandidateDashboardLayout children={page} />
    </Layout>

)

export default Overview
