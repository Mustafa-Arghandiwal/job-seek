import { useForm, Link, usePage } from "@inertiajs/react"
import { useEffect, useState } from "react"


export default function ForgotPassword() {

    const {data, setData, post, processing, errors} = useForm({
        email: ''
    })
    const {flash} = usePage().props 

    const [flashVisible, setFlashVisible] = useState(!flash.status)
    
        useEffect(() => {
            if(flash.status) {
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
        <div className="font-inter min-h-screen grid grid-cols-1 grid-rows-1 lg:grid-cols-2 lg:grid-rows-1">
            
            <div className="flex flex-col justify-center items-center w-full px-4 py-2">
                <div className="flex items-center gap-1 px-4 pt-2 mb-4">
                    <img src="briefcase.svg" />
                    <span className="font-semibold text-2xl">JobSeek</span>
                </div>

                <div className="flex flex-col justify-center items-center px-4 py-2 h-full">
                        <div>
                            <h1 className="text-gray-900 text-[20px] sm:text-[24px] md:text-[30px] 
                            lg:text-[34px]">Forgot Your Password?</h1>
                            <p className="text-gray-600">Go back to
                                <Link className="text-[#0A65CC]" href="/sign-in"> Sign In</Link>
                            </p>
                            <p className="text-gray-600">Don't have an account?
                                <Link className="text-[#0A65CC]" href="/sign-up"> Create Account</Link>
                            </p>
                        </div>

                        <div className="max-w-[520px] w-full mx-auto">
                            <form onSubmit={handleSubmit} className="flex flex-col flex-1">
                                <div className="h-16">
                                    <input type="text" placeholder="Email Address" value={data.email} onChange={(e) => setData('email', e.target.value)} className="h-12 w-full rounded-md border border-gray-100 px-3 outline-none" />
                                    {errors.email && <p className="text-sm text-danger-600">{errors.email}</p>}
                                </div>

                                <button disabled={processing} className="w-full mt-3 border rounded-sm flex justify-center items-center gap-3 h-14 bg-primary-500 hover:bg-primary-600 disabled:bg-[#CEE0F5] text-white font-semibold cursor-pointer select-none">
                                Send Reset Link <img src="arrow-right.svg" />
                                </button>

                                <p className={`font-medium text-center text-success-600 opacity-0 transition-opacity h-10 mt-1 duration-500 ease-in-out ${flashVisible ? "opacity-100": "opacity-0"} `} >
                                {flash.status}
                                </p>
                            </form>    
                        </div>    
                </div>
            </div>

            <div className="relative bg-[url('bg2.jpg')]  w-[50vw] bg-cover bg-center hidden lg:block">
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