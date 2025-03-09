import { usePage, useForm } from "@inertiajs/react"
import Layout from "../Layouts/Layout"

function Home() {
    const {auth} = usePage().props
    const {post} = useForm({})
    const handleLogout = (e) => {
        e.preventDefault()
        post('/sign-out')
    }
    return (

        <div className="">
            
            <form onSubmit={handleLogout}>
                <button className="w-32 mt-10 ml-10 rounded text-white font-semibold hover:bg-primary-600 cursor-pointer h-12 bg-primary-500">Logout</button>

            </form>
        </div>
    )
}

Home.layout = page => <Layout children={page} />

export default Home