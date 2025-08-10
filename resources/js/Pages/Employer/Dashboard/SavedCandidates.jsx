

import EmployerDashboardLayout from "../../../Layouts/EmployerDashboardLayout"
import EmployerLayout from "../../../Layouts/EmployerLayout"



function SavedCandidates() {
    return (
        <div className="border">
            <h1 className="font-medium text-2xl">Saved Candidates</h1>
        </div>
    )
}


SavedCandidates.layout = page => (
    <EmployerLayout>
        <EmployerDashboardLayout children={page} />
    </EmployerLayout>

)

export default SavedCandidates
