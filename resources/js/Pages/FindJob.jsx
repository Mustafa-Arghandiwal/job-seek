import Layout from "../Layouts/Layout"



function FindJob() {
    
    return (
        <div className="text-4xl mt-10 h-[100svh]">
            Find a FUCKING Job!
        </div>
    )
}


FindJob.layout = page => <Layout children={page} />

export default FindJob