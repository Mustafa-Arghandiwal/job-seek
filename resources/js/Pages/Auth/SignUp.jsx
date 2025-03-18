import { useState, useRef, useEffect } from "react"
import { useForm, Link } from "@inertiajs/react"

export default function SignUp() {
    const {data, setData, post, errors, processing} = useForm({
        full_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        agree_terms: false,
        role: 'Candidate'
    })
    const [dropdownVisible, setDropdownVisible] = useState(false)
    const dropDownBtn = useRef(null)
    const caret = useRef(null)
    const [passVis, setPassVis] = useState(false)
    const [confirmPassVis, setConfirmPassVis] = useState(false)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if(e.target !== dropDownBtn.current && e.target !== caret.current) {
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
                <div className="absolute top-2 left-8 flex items-center gap-1">
                    <img src="briefcase.svg" />
                    <span className="font-semibold text-2xl">JobSeek</span>
                </div>

                <div className="flex flex-col items-center  max-w-[536px] w-full">
                <div className="flex flex-row justify-between items-center flex-wrap gap-2 px-4 py-2 w-full max-w-[520px] ">
                    <div className="flex flex-col">
                        <h1 className="text-gray-900 text-[32px]">Create account.</h1>
                        <div className="flex flex-wrap gap-0.5 mt-2 sm:mt-0">
                            <p className="text-gray-600">Already have an account?</p>
                            <Link className="text-[#0A65CC]" href="/sign-in"> Sign In</Link>

                        </div>
                    </div>

                    <div className="relative ml-auto">
                        <button ref={dropDownBtn} className="text-[14px] text-gray-600 h-12 flex justify-between px-7 items-center border border-gray-100 rounded-md w-[150px] gap-2 cursor-pointer"
                            onClick={() => setDropdownVisible(prev => !prev)}>
                                {data.role} 
                            <img ref={caret} className={`w-3.5 transition-all duration-200 ${dropdownVisible ? "rotate-180" : ""}`} src="CaretDown.svg" />
                        </button>
                        <div className={`absolute bg-white shadow-[0px_12px_32px_rgba(25,31,51,0.08)] z-10 top-full flex flex-col w-[150px] border border-gray-100 rounded-md p-3 text-sm text-gray-700 ${dropdownVisible ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-3 invisible"}  transition-all duration-300 ease-in-out`}>
                            <span onClick={() => setData("role", "Candidate")} className="w-full rounded-xs flex px-2 py-1 hover:text-primary-500 hover:bg-[#E8F1FF] cursor-pointer">Candidate</span>
                            <span onClick={() => setData("role", "Employer")} className="w-full rounded-xs flex px-2 py-1 hover:text-primary-500 hover:bg-[#E8F1FF] cursor-pointer">Employer</span>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col flex-1 px-4 py-2 w-full max-w-[520px]">
                    <div className="h-16">
                        <input type="text" placeholder="Full Name"  value={data.full_name} onChange={(e) => setData('full_name', e.target.value)} className="h-12 w-full rounded-md border border-gray-100  px-3 outline-none" />
                            {errors.full_name && <p className="text-sm text-danger-600">{errors.full_name}</p>}    
                    </div>
                    <div className="h-16">
                        <input type="text" placeholder="Email Address" value={data.email} onChange={(e) => setData('email', e.target.value)} className="h-12 w-full rounded-md border border-gray-100  px-3 outline-none" />
                            {errors.email && <p className="text-sm text-danger-600">{errors.email}</p>}
                    </div>

                    <div className="h-16">
                        <div className="relative">
                            <input type={passVis ? 'text' : 'password'} placeholder="Password" value={data.password} onChange={(e) => setData('password', e.target.value)} className="h-12 w-full rounded-md border border-gray-100  px-3 outline-none" />
                            <button tabIndex="-1" type="button" onClick={() => setPassVis(prev => !prev)} className="w-[22px] absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer ">
                                <img src="fi_eye.png" className={`absolute top-1/2 -translate-y-1/2 transition-opacity duration-300 ${passVis ? "opacity-0" : "opacity-100"}`} />
                                <img src="fi_eye-off.png" className={`absolute top-1/2 -translate-y-1/2 transition-opacity duration-300 ${passVis ? "opacity-100" : "opacity-0"}`} />
                            </button>
                        </div>
                            {errors.password && <p className="text-sm text-danger-600">{errors.password}</p>}
                    </div>
                                
                    <div className="h-16">
                        <div className="relative">
                            <input type={confirmPassVis ? 'text' : 'password'} placeholder="Confirm Password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} className="h-12 w-full rounded-md border border-gray-100  px-3 outline-none" />
                             <button tabIndex="-1" type="button" onClick={() => setConfirmPassVis(prev => !prev)} className="w-[22px] absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer">
                                <img src="fi_eye.png" className={`absolute top-1/2 -translate-y-1/2 transition-opacity duration-300 ${confirmPassVis ? "opacity-0" : "opacity-100"}`} />
                                <img src="fi_eye-off.png" className={`absolute top-1/2 -translate-y-1/2 transition-opacity duration-300 ${confirmPassVis ? "opacity-100" : "opacity-0"}`} />
                            </button>
                         </div>
                            {errors.password && <p className="text-sm text-danger-600">{errors.password}</p>}
                    </div>
                    <div className="flex gap-5 mt-5">

                        <input type="checkbox" checked={data.agree_terms} onChange={(e) => setData('agree_terms', e.target.checked)} className={`w-5 h-5 cursor-pointer transition-all ${errors.agree_terms && !data.agree_terms ? "ring-2 ring-offset-2 ring-danger-600" : ""}`}/>
                        <label className="text-sm text-gray-600 flex gap-2 cursor-pointer">
                            <div className="flex flex-wrap gap-0.5">
                                <p>I've read and agree with your</p>
                                <Link href="#" className="text-[#0A65CC] text-sm"> Terms of Service</Link>

                            </div>
                        </label>
                        
                    </div>
                        

                    <button disabled={processing} className="border rounded-sm flex justify-center items-center gap-3 h-14 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-100 text-white font-semibold  cursor-pointer mt-8">
                            Create Account <img src="arrow-right.svg" />
                    </button>
                    </form>
                </div>

            </div>

            <div className="relative bg-[url('bg2.jpg')] bg-cover bg-center hidden md:w-[50vw] lg:block">
                <div className="flex flex-col gap-10 max-w-[500px]  absolute bottom-10 left-22">
                    <h2 className="text-[40px] font-medium text-white">
                        Over 300 companies waiting for good employees
                    </h2>
                    <div className="flex justify-between gap-5 w-3/4">
                        <div className="flex flex-col gap-8">
                            <img src="briefcase-bg.svg" className="w-16 h-16" />
                            <div>
                                <p className="text-xl text-white">2,000</p>
                                <p className="text-sm text-gray-400">Live Jobs</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-8">
                            <img src="company-bg.svg" className="w-16 h-16" />
                            <div>
                                <p className="text-xl text-white">300+</p>
                                <p className="text-sm text-gray-400">Companies</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-8">
                            <img src="briefcase-bg.svg" className="w-16 h-16" />
                            <div>
                                <p className="text-xl text-white">56</p>
                                <p className="text-sm text-gray-400">New Jobs Today</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}