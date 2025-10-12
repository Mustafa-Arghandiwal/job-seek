

import EmployerSavedCandidate from "../../../Components/EmployerSavedCandidate"
import EmployerDashboardLayout from "../../../Layouts/EmployerDashboardLayout"
import EmployerLayout from "../../../Layouts/EmployerLayout"
import PaginationLinks from "../../../utils/getPaginationLinks"



function SavedCandidates({ savedCandidates }) {

    const savedCandidateEls = savedCandidates.data.map(candidate => {
        const profilePic = candidate.profile_picture
        return <EmployerSavedCandidate key={candidate.id} candidateId={candidate.candidate_id} profilePic={profilePic} name={candidate.full_name} title={candidate.title} />
    })


    return (
        <>
            <h1 className="font-medium text-xl text-customGray-900 mb-6">Saved Candidates</h1>
            {savedCandidates.data.length !== 0 ?
                <>
                    {savedCandidateEls}
                    <PaginationLinks paginator={savedCandidates} />
                </>
                :
                <div className="h-[40dvh] grid place-items-center font-medium text-lg text-customGray-600 ">You have no saved candidates.</div>
            }
        </>
    )
}


SavedCandidates.layout = page => (
    <EmployerLayout>
        <EmployerDashboardLayout children={page} />
    </EmployerLayout>

)

export default SavedCandidates
