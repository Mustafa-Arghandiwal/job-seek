import { useState, useRef, useEffect } from "react"
import { useForm, Link, usePage } from "@inertiajs/react"
import { EyeIcon, EyeClosedIcon, UsersIcon, BriefCaseIcon, BuildingIcon, SimpleBriefCaseIcon, RightArrowIcon, CaretIcon, ChessBackground } from "../../utils/svgs"

export default function SignUp({ userType, liveJobsCount, companiesCount, candidatesCount }) {
    const { data, setData, post, errors, processing } = useForm({
        full_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        agree_terms: false,
        user_type: userType
    })
    const [dropdownVisible, setDropdownVisible] = useState(false)
    const dropDownBtn = useRef(null)
    const caret = useRef(null)
    const [passVis, setPassVis] = useState(false)
    const [confirmPassVis, setConfirmPassVis] = useState(false)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (e.target !== dropDownBtn.current && e.target !== caret.current) {
                setDropdownVisible(false)
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault()
        post("/sign-up")
    }

    return (
        <div className="font-inter min-h-screen grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-1 pt-10 sm:pt-0">

            <div className="flex flex-col justify-center items-center w-full px-4 py-2">
                <Link href="/" className="absolute top-2 left-8 flex items-center gap-1">
                    <SimpleBriefCaseIcon className="w-10 h-10 text-primary-500" />
                    <span className="font-semibold text-2xl text-customGray-900">JobSeek</span>
                </Link>

                <div className="flex flex-col items-center  max-w-[536px] w-full">
                    <div className="flex flex-row justify-between items-center flex-wrap gap-2 px-4 py-2 w-full max-w-[520px] ">
                        <div className="flex flex-col">
                            <h1 className="text-customGray-900 text-[32px]">Create account.</h1>
                            <div className="flex flex-wrap gap-0.5 mt-2 sm:mt-0">
                                <p className="text-customGray-600">Already have an account?</p>
                                <Link className="text-primary-500" href="/sign-in"> Sign In</Link>

                            </div>
                        </div>

                        <div className="relative ml-auto">
                            <button ref={dropDownBtn} className="mt-5 text-sm text-customGray-600 h-12 flex justify-between px-7 items-center border border-customGray-100 rounded-md w-[150px] gap-2 cursor-pointer"
                                onClick={() => setDropdownVisible(prev => !prev)}>
                                {(data.user_type).charAt(0).toUpperCase() + (data.user_type).slice(1)}
                                <CaretIcon ref={caret} className={`transition-all duration-200 ${dropdownVisible ? "rotate-180" : ""}`} />
                            </button>
                            <div className={`absolute bg-white shadow-[0px_12px_32px_rgba(25,31,51,0.08)] z-10 top-full flex flex-col w-[150px] border border-customGray-100 rounded-md p-3 text-sm text-customGray-700 ${dropdownVisible ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-3 invisible"}  transition-all duration-300 ease-in-out`}>
                                <span onClick={() => setData("user_type", "candidate")} className="w-full rounded-xs flex px-2 py-1 hover:text-primary-500 hover:bg-primary-50 cursor-pointer">Candidate</span>
                                <span onClick={() => setData("user_type", "employer")} className="w-full rounded-xs flex px-2 py-1 hover:text-primary-500 hover:bg-primary-50 cursor-pointer">Employer</span>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className=" flex flex-col flex-1   px-4 py-2 w-full max-w-[520px]">

                        <div className=" flex flex-col gap-5 md:gap-2 mb-2 xs:mb-0 ">
                            <div className="h-16">
                                <input type="text" placeholder={data.user_type === "candidate" ? "Full Name" : "Company Name"} value={data.full_name} onChange={(e) => setData('full_name', e.target.value)} className="h-12 w-full rounded-md border border-customGray-100  px-3 outline-none focus:ring-1 focus:ring-primary-500" />
                                {errors.full_name && <p className="text-sm text-danger-600">{errors.full_name}</p>}
                            </div>
                            <div className="h-16">
                                <input type="text" placeholder="Email Address" value={data.email} onChange={(e) => setData('email', e.target.value)} className="h-12 w-full rounded-md border border-customGray-100  px-3 outline-none focus:ring-1 focus:ring-primary-500" />
                                {errors.email && <p className="text-sm text-danger-600">{errors.email}</p>}
                            </div>

                            <div className="h-16">
                                <div className="relative">
                                    <input type={passVis ? 'text' : 'password'} placeholder="Password" value={data.password} onChange={(e) => setData('password', e.target.value)} className="h-12 w-full rounded-md border border-customGray-100  px-3 outline-none focus:ring-1 focus:ring-primary-500" />
                                    <button tabIndex="-1" type="button" onClick={() => setPassVis(prev => !prev)} className="w-[22px] absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer ">
                                        <EyeIcon className={`absolute top-1/2 -translate-y-1/2 transition-opacity duration-300 text-customGray-900 ${passVis ? "opacity-0" : "opacity-100"}`} />
                                        <EyeClosedIcon className={`absolute top-1/2 -translate-y-1/2 transition-opacity duration-300 text-customGray-900 ${passVis ? "opacity-100" : "opacity-0"}`} />
                                    </button>
                                </div>
                                {errors.password && <p className="text-sm text-danger-600">{errors.password}</p>}
                            </div>

                            <div className="h-16">
                                <div className="relative">
                                    <input type={confirmPassVis ? 'text' : 'password'} placeholder="Confirm Password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} className="h-12 w-full rounded-md border border-customGray-100  px-3 outline-none focus:ring-1 focus:ring-primary-500" />
                                    <button tabIndex="-1" type="button" onClick={() => setConfirmPassVis(prev => !prev)} className="w-[22px] absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer">
                                        <EyeIcon className={`absolute top-1/2 -translate-y-1/2 transition-opacity duration-300 text-customGray-900 ${confirmPassVis ? "opacity-0" : "opacity-100"}`} />
                                        <EyeClosedIcon className={`absolute top-1/2 -translate-y-1/2 transition-opacity duration-300 text-customGray-900 ${confirmPassVis ? "opacity-100" : "opacity-0"}`} />
                                    </button>
                                </div>
                                {errors.password && <p className="text-sm text-danger-600">{errors.password}</p>}
                            </div>
                        </div>

                        <div className="flex gap-5 mt-5">
                            <label className="text-sm text-customGray-600 flex gap-2 cursor-pointer">
                                <input type="checkbox" checked={data.agree_terms} onChange={(e) => setData('agree_terms', e.target.checked)} className={`w-5 h-5 cursor-pointer transition-all ${errors.agree_terms && !data.agree_terms ? "ring-2 ring-offset-2 ring-danger-600" : ""}`} />
                                <div className="flex flex-wrap gap-0.5">
                                    <p>I've read and agree with your</p>
                                    <Link href="#" className="text-primary-500"> Terms of Service</Link>
                                </div>
                            </label>
                        </div>

                        <button disabled={processing} className="border rounded-sm flex justify-center items-center gap-3 h-14 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-100 text-white font-semibold  cursor-pointer mt-2">
                            Create Account
                            <RightArrowIcon className="w-6 h-6" />
                        </button>
                    </form>
                </div>

            </div>

            <div className="relative hidden md:w-[50vw] lg:block">
                <ChessBackground className="absolute w-full h-full inset-0" />
                <div className="flex flex-col gap-10 max-w-[600px]  absolute bottom-10 left-22">
                    <h2 className="text-[40px] font-medium text-white">
                        Join thousands of professionals finding better jobs and talents
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
