import { useState, useRef, useEffect } from "react"
import { useForm, Link } from "@inertiajs/react"
import { EyeIcon, EyeClosedIcon, UsersIcon, BriefCaseIcon, BuildingIcon, SimpleBriefCaseIcon, RightArrowIcon } from "../../utils/svgs"

export default function SignIn({ liveJobsCount, companiesCount, candidatesCount }) {
    const { data, setData, post, errors, processing } = useForm({
        email: '',
        password: '',
        remember_me: false,
    })

    const [passVis, setPassVis] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        post('/sign-in')
    }

    return (
        <div className="font-inter min-h-screen grid grid-cols-1 lg:grid-rows-1 lg:grid-cols-2">
            <div className="flex flex-col justify-center items-center w-full px-4 py-2 ">

                <div className="absolute top-2 left-8 flex items-center gap-1">
                    <SimpleBriefCaseIcon className="w-10 h-10 text-primary-500" />
                    <span className="font-semibold text-customGray-900 text-2xl">JobSeek</span>
                </div>

                <div className="flex flex-col  gap-7 px-4 py-2 max-w-[536px] w-full">

                    <div className=" ">
                        <h1 className="text-customGray-900 text-[32px]">Sign in</h1>
                        <div className="flex flex-wrap gap-1 mt-2 sm:mt-0">
                            <p className="text-customGray-600">Don't have an account?</p>
                            <Link className="text-primary-500" href="/sign-up"> Create Account</Link>

                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="flex  flex-col gap-4 flex-1 w-full max-w-[520px]">

                        <div className="h-16">
                            <input type="text" placeholder="Email Address" value={data.email} onChange={(e) => setData('email', e.target.value)} className="h-12 w-full rounded-md border border-customGray-100 px-3 outline-none focus:ring-1 focus:ring-primary-500" />
                            {errors.email && <p className="text-sm text-danger-600">{errors.email}</p>}
                        </div>

                        <div className="h-16">
                            <div className="relative">
                                <input type={passVis ? 'text' : 'password'} placeholder="Password" value={data.password} onChange={(e) => setData('password', e.target.value)} className="h-12 w-full rounded-md border border-customGray-100 px-3 outline-none focus:ring-1 focus:ring-primary-500" />
                                <button tabIndex="-1" type="button" onClick={() => setPassVis(prev => !prev)} className="w-[22px] absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer ">
                                    <EyeIcon className={`absolute top-1/2 -translate-y-1/2 transition-opacity duration-300 text-customGray-900 ${passVis ? "opacity-0" : "opacity-100"}`} />
                                    <EyeClosedIcon className={`absolute top-1/2 -translate-y-1/2 transition-opacity duration-300 text-customGray-900 ${passVis ? "opacity-100" : "opacity-0"}`} />
                                </button>
                            </div>
                            {errors.password && <p className="text-sm text-danger-600">{errors.password}</p>}
                        </div>

                        <div className="flex justify-between gap-2 flex-wrap ">
                            <label className="text-sm text-customGray-600 flex gap-2 cursor-pointer">
                                <input type="checkbox" checked={data.remember_me} onChange={(e) => setData('remember_me', e.target.checked)} className={`w-5 h-5 cursor-pointer transition-all ${errors.agree_terms && !data.agree_terms ? "ring-2 ring-offset-2 ring-danger-600" : ""}`} />
                                Remember Me
                            </label>

                            <Link className="text-primary-500 text-sm font-medium" href="/forgot-password">Forgot password?</Link>
                        </div>

                        <div className="h-20">
                            <div className="h-5">
                                {errors.failed && <p className="text-sm text-danger-600">{errors.failed}</p>}
                            </div>

                            <button disabled={processing} className="w-full border rounded-sm flex justify-center items-center gap-3 h-14 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-100 text-white font-semibold cursor-pointer">
                                Sign In
                                <RightArrowIcon className="w-6 h-6" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="relative bg-[url('/bg2.jpg')]  bg-cover bg-center hidden lg:block md:w-[50vw]">
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
