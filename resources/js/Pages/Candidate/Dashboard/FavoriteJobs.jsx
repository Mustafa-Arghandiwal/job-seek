

import CandidateFavoriteJob from "../../../Components/CandidateFavoriteJob"
import CandidateDashboardLayout from "../../../Layouts/CandidateDashboardLayout"
import Layout from "../../../Layouts/Layout"



function FavoriteJobs() {

    return (
        <div className="">
            <h1 className="text-customGray-900 font-medium text-lg">Favorite Jobs <span className="text-customGray-400 font-normal">(17)</span></h1>

            <div className="mt-2">
                <CandidateFavoriteJob logo={'/chess_pattern.png'} title={"Yob"} type={'Full Time'} location={'kabulll'} salary={'1200/month'} deadline={'today'}/>
                <CandidateFavoriteJob logo={'/chess_pattern.png'} title={"Yob"} type={'Full Time'} location={'kabulll'} salary={'1200/month'} deadline={'today'}/>
                <CandidateFavoriteJob logo={'/chess_pattern.png'} title={"Yob"} type={'Full Time'} location={'kabulll'} salary={'1200/month'} deadline={'today'}/>
            </div>
        </div>
    )
}


FavoriteJobs.layout = page => (
    <Layout>
        <CandidateDashboardLayout children={page} />
    </Layout>

)

export default FavoriteJobs
