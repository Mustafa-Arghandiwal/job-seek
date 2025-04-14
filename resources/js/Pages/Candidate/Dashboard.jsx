import { useForm, usePage } from "@inertiajs/react"
import Layout from "../../Layouts/Layout"


function Dashboard() {

    const {post} = useForm()
    function handleSubmit(e) {
        e.preventDefault()
        post('/sign-out')


    }
    const userName = usePage().props.auth.user.full_name

    return (
        <div className="h-[51vh]">
            <h1 className="text-4xl">Welcome {userName}</h1>

           
        </div>

        
    )

}

Dashboard.layout = page => <Layout children={page} />
export default Dashboard