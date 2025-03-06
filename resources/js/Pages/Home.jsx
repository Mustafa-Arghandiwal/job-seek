import { usePage, useForm } from "@inertiajs/react"

export default function Home() {
    const {auth} = usePage().props
    const {post} = useForm({})
    const handleLogout = (e) => {
        e.preventDefault()
        post('/sign-out')
    }
    return (

        <>
            <h1 className="text-slate-950 font-inter border text-center">Hey {auth.user?.full_name} ! Welcome to Job Seek, Where you can find your desired job.</h1>
            
            <form onSubmit={handleLogout}>
                <button className="w-80 mt-10 ml-10 rounded text-white font-semibold hover:bg-primary-600 cursor-pointer h-12 bg-primary-500">Logout</button>

            </form>
        </>
    )
}