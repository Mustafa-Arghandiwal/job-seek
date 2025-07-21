import { usePage } from "@inertiajs/react"
import Layout from "../../Layouts/Layout"



function FindEmployers() {

    console.log(usePage().props.employers)
    return (
        <>
            Hi there
        </>
    )
}

FindEmployers.layout = page => <Layout children={page} />
export default FindEmployers
