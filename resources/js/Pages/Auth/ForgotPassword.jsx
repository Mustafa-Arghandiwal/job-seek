import { useForm, Link, usePage } from "@inertiajs/react"
import { useEffect, useState } from "react"
import { UsersIcon, BriefCaseIcon, BuildingIcon } from "../../utils/svgs"


export default function ForgotPassword({ liveJobsCount, companiesCount, candidatesCount }) {

    const { data, setData, post, processing, errors } = useForm({
        email: ''
    })
    const { flash } = usePage().props

    const [flashVisible, setFlashVisible] = useState(!flash.status)

    useEffect(() => {
        if (flash.status) {
            setFlashVisible(true)
            const timer = setTimeout(() => {
                setFlashVisible(false)
            }, 5000);
            return () => clearTimeout(timer)
        }
    }, [flash.status])


    const handleSubmit = (e) => {
        e.preventDefault()
        post('/forgot-password')
    }

    return (
        <div className="font-inter min-h-screen grid grid-cols-1 lg:grid-rows-1 lg:grid-cols-2">

            <div className="flex flex-col justify-center items-center w-full px-4 py-2">

                <div className="absolute top-2 left-8 flex items-center gap-1">
                    <img src="briefcase.svg" />
                    <span className="font-semibold text-2xl">JobSeek</span>
                </div>

                <div className="flex flex-col  gap-7 px-4 py-2 max-w-[536px] w-full">

                    <div className="flex justify-between items-center">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-customGray-900 text-[26px] sm:text-[32px]">Forgot Your Password?</h1>
                            <div className="flex flex-wrap gap-1">
                                <p className="text-customGray-600">Go back to</p>
                                <Link className="text-primary-500" href="/sign-in">Sign In</Link>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2 sm:mt-0">
                                <p className="text-customGray-600">Don't have an account?</p>
                                <Link className="text-primary-500" href="/sign-up">Create Account</Link>
                            </div>

                        </div>



                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="h-20 xs:h-16">
                            <input type="text" placeholder="Email Address" value={data.email} onChange={(e) => setData('email', e.target.value)} className="h-12 w-full rounded-md border border-customGray-100 px-3 outline-none focus:ring-1 focus:ring-primary-500" />
                            {errors.email && <p className="text-sm text-danger-600">{errors.email}</p>}
                        </div>

                        <button disabled={processing} className="w-full mt-3 border rounded-sm flex justify-center items-center gap-3 h-14 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-100 text-white font-semibold cursor-pointer select-none">
                            Send Reset Link <img src="arrow-right.svg" />
                        </button>

                        <p className={`font-medium text-center text-success-600 opacity-0 transition-opacity h-10 mt-1 duration-500 ease-in-out ${flashVisible ? "opacity-100" : "opacity-0"} `} >
                            {flash.status}
                        </p>
                    </form>

                </div>

            </div>

            <div className="relative bg-[url('bg2.jpg')]  w-[50vw] bg-cover bg-center hidden lg:block md:w-[50vw]">
                <div className="flex flex-col gap-10 max-w-[500px]  absolute bottom-10 left-22">
                    <h2 className="text-[40px] font-medium text-white">
                        Over 300 companies waiting for good employees
                    </h2>
                    <div className="flex justify-between gap-5 w-3/4">
                        <div>
                            <div className="grid place-items-center w-16 h-16 rounded-md bg-customGray-600/20">
                                <BriefCaseIcon className="text-white w-8 h-8 " />
                            </div>
                            <div className="mt-3">
                                <p className="text-xl text-white">{liveJobsCount}</p>
                                <p className="text-sm text-customGray-400">Live Jobs</p>
                            </div>
                        </div>

                        <div>
                            <div className="grid place-items-center w-16 h-16 rounded-md bg-customGray-600/20">
                                <BuildingIcon className="text-white w-8 h-8 " />
                            </div>
                            <div className="mt-3">
                                <p className="text-xl text-white">{companiesCount}</p>
                                <p className="text-sm text-customGray-400">Companies</p>
                            </div>
                        </div>

                        <div>
                            <div className="grid place-items-center w-16 h-16 rounded-md bg-customGray-600/20">
                                <UsersIcon className="text-white w-8 h-8 " />
                            </div>
                            <div className="mt-3">
                                <p className="text-xl text-white">{candidatesCount}</p>
                                <p className="text-sm text-customGray-400">Candidates</p>
                            </div>
                        </div>




                    </div>
                </div>
            </div>
        </div>

    )
}
