

import EmployerSavedCandidate from "../../../Components/EmployerSavedCandidate"
import EmployerDashboardLayout from "../../../Layouts/EmployerDashboardLayout"
import EmployerLayout from "../../../Layouts/EmployerLayout"



function SavedCandidates({ savedCandidates }) {

    const savedCandidateEls = savedCandidates.map(candidate => {
        const profilePic = candidate?.profile_picture ? "/storage/" + candidate.profile_picture : "/chess_pattern.png"
        return <EmployerSavedCandidate key={candidate.id} candidateId={candidate.candidate_id} profilePic={profilePic} name={candidate.full_name} title={candidate.title} />
    })


    return (
        <div className="">
            <h1 className="font-medium text-xl text-customGray-900 mb-3">Saved Candidates</h1>
            {savedCandidates.length !== 0 ?
                savedCandidateEls
                :
                <div className="h-[40dvh] grid place-items-center font-medium text-lg text-customGray-600 ">You haven't saved any candidates yet.</div>
            }
        </div>
    )
}


SavedCandidates.layout = page => (
    <EmployerLayout>
        <EmployerDashboardLayout children={page} />
    </EmployerLayout>

)

export default SavedCandidates
