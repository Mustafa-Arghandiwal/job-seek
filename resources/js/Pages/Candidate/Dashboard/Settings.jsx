import CandidateDashboardLayout from "../../../Layouts/CandidateDashboardLayout"
import Layout from "../../../Layouts/Layout"



function Settings() {
    return (
        <h1 className="text-3xl">Settings</h1>
    )
}


Settings.layout = page => (
    <Layout>
        <CandidateDashboardLayout children={page} />  
    </Layout>

)

export default Settings 