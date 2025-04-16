
import CandidateDashboardLayout from "../../../Layouts/CandidateDashboardLayout"
import Layout from "../../../Layouts/Layout"

function AppliedJobs() {
    return (
        <div className="">

            <h1 className="text-3xl">Applied Jobs here</h1>
        </div>
    )
}


AppliedJobs.layout = page => (
    <Layout>
        <CandidateDashboardLayout children={page} />  
    </Layout>

)

export default AppliedJobs 