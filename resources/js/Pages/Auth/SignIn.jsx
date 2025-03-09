import { useState, useRef, useEffect } from "react"
import { useForm, Link } from "@inertiajs/react"

export default function SignIn() {
    const {data, setData, post, errors, processing} = useForm({
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
        <div className="font-inter grid grid-cols-1 md:grid-rows-1 md:grid-cols-2 h-[100svh] relative">
            <div className="flex flex-col relative">

                <div className="flex gap-1 px-4 py-2 mb-4">
                    <img src="briefcase.svg" />
                    <span className="font-semibold text-2xl">JobSeek</span>
                </div>

                <div className="flex flex-col items-center gap-7 px-4 py-2">

                        <div className="">
                            <h1 className="text-gray-900 text-[32px]">Sign in</h1>
                            <p className="text-gray-600">Don't have an account?
                                <a className="text-[#0A65CC]" href="/sign-up"> Create Account</a>
                            </p>
                        </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1 w-full max-w-[520px]">
                        
                        <div className="h-16">
                            <input type="text" placeholder="Email Address" value={data.email} onChange={(e) => setData('email', e.target.value)} className="h-12 w-full rounded-md border border-gray-100 px-3 outline-none" />
                            {errors.email && <p className="text-sm text-danger-600">{errors.email}</p>}
                        </div>

                        <div className="h-16">
                            <div className="relative">
                                <input type={passVis ? 'text' : 'password'} placeholder="Password" value={data.password} onChange={(e) => setData('password', e.target.value)} className="h-12 w-full rounded-md border border-gray-100 px-3 outline-none" />
                                <button tabIndex="-1" type="button" onClick={() => setPassVis(prev => !prev)} className="w-[22px] absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer ">
                                    <img src="fi_eye.png" className={`absolute top-1/2 -translate-y-1/2 transition-opacity duration-300 ${passVis ? "opacity-0" : "opacity-100"}`} />
                                    <img src="fi_eye-off.png" className={`absolute top-1/2 -translate-y-1/2 transition-opacity duration-300 ${passVis ? "opacity-100" : "opacity-0"}`} />
                                </button>
                            </div>
                            {errors.password && <p className="text-sm text-danger-600">{errors.password}</p>}
                        </div>

                        <div className="flex justify-between gap-0.5 ">
                            <label className="text-sm text-gray-600 flex gap-2 cursor-pointer">
                                <input type="checkbox" checked={data.remember_me} onChange={(e) => setData('remember_me', e.target.checked)} className={`w-5 h-5 cursor-pointer transition-all ${errors.agree_terms && !data.agree_terms ? "ring-2 ring-offset-2 ring-danger-600" : ""}`}/>
                                    Remember Me
                            </label>

                            <Link className="text-primary-500 text-sm font-medium" href="/forgot-password">Forgot password?</Link>
                        </div>
                        
                        <div className="h-20">
                            <div className="h-5">
                                {errors.failed && <p className="text-sm text-danger-600">{errors.failed}</p>}
                            </div>
                           
                            <button disabled={processing} className="w-full border rounded-sm flex justify-center items-center gap-3 h-14 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-100 text-white font-semibold cursor-pointer">
                                Sign In <img src="arrow-right.svg" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="relative bg-[url('bg2.jpg')]  bg-cover bg-center invisible md:visible md:w-[50vw]">
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