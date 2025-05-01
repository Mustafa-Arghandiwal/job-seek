

import CandidateDashboardLayout from "../../../Layouts/CandidateDashboardLayout"
import Layout from "../../../Layouts/Layout"



function FavoriteJobs() {
    return (
        <h1 className="text-3xl">Favorite Jobs</h1>
    )
}


FavoriteJobs.layout = page => (
    <Layout>
        <CandidateDashboardLayout children={page} />  
    </Layout>

)

export default FavoriteJobs 