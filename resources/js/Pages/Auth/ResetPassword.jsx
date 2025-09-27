import { useForm, usePage } from "@inertiajs/react"
import { useState } from "react"
import { EyeIcon, EyeClosedIcon} from "../../utils/svgs"


export default function ResetPassword() {
    const { props } = usePage()
    const { data, setData, errors, processing, post } = useForm({
        token: props.token,
        email: '',
        password: '',
        password_confirmation: ''
    })


    const [passVis, setPassVis] = useState(false)
    const [confirmPassVis, setConfirmPassVis] = useState(false)


    const handleSubmit = (e) => {
        e.preventDefault()
        post('/reset-password')
    }



    return (
        <div className="h-[100svh] border relative grid place-items-center px-5 ">

            <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center select-none ">
                <img src="../briefcase.svg" />
                <span className="font-semibold text-2xl">JobSeek</span>
            </div>


            <div className="max-w-[536px] min-w-[176px] w-full flex flex-col gap-6">
                <h1 className="font-medium text-[32px] text-center">Reset Password</h1>

                <p className="text-center text-customGray-500">Enter your new password below.</p>


                <form onSubmit={handleSubmit} className=" flex flex-col gap-3 xs:gap-0">
                    <input type="hidden" value={data.token} />

                    <div className="h-20 ">
                        <input type="text" placeholder="Email Address" value={data.email} onChange={(e) => setData('email', e.target.value)} className="h-12 w-full rounded-md border border-customGray-100 px-3 outline-none focus:ring-1 focus:ring-primary-500" />
                        {errors.email && <p className="text-sm text-danger-600">{errors.email}</p>}
                    </div>


                    <div className="h-20">
                        <div className="relative">
                            <input type={passVis ? 'text' : 'password'} placeholder="New Password" value={data.password} onChange={(e) => setData('password', e.target.value)} className="h-12 w-full rounded-md border border-customGray-100  px-3 outline-none focus:ring-1 focus:ring-primary-500" />
                            <button tabIndex="-1" type="button" onClick={() => setPassVis(prev => !prev)} className="w-[22px] absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer ">
                                <EyeIcon className={`absolute top-1/2 -translate-y-1/2 transition-opacity duration-300 text-customGray-900 ${passVis ? "opacity-0" : "opacity-100"}`} />
                                <EyeClosedIcon className={`absolute top-1/2 -translate-y-1/2 transition-opacity duration-300 text-customGray-900 ${passVis ? "opacity-100" : "opacity-0"}`} />

                            </button>
                        </div>
                        {errors.password && <p className="text-sm text-danger-600">{errors.password}</p>}

                    </div>

                    <div className="h-20">
                        <div className="relative">
                            <input type={confirmPassVis ? 'text' : 'password'} placeholder="Confirm Password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} className="h-12 w-full rounded-md border border-customGray-100  px-3 outline-none focus:ring-1 focus:ring-primary-500" />
                            <button tabIndex="-1" type="button" onClick={() => setConfirmPassVis(prev => !prev)} className="w-[22px] absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer">
                                <EyeIcon className={`absolute top-1/2 -translate-y-1/2 transition-opacity duration-300 text-customGray-900 ${confirmPassVis ? "opacity-0" : "opacity-100"}`} />
                                <EyeClosedIcon className={`absolute top-1/2 -translate-y-1/2 transition-opacity duration-300 text-customGray-900 ${confirmPassVis ? "opacity-100" : "opacity-0"}`} />
                            </button>
                        </div>
                        {errors.password && <p className="text-sm text-danger-600">{errors.password}</p>}
                    </div>

                    <button disabled={processing} className="w-full border rounded-sm flex justify-center items-center gap-3 h-14 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-100 text-white font-semibold cursor-pointer select-none">
                        Reset Password <img src="../arrow-right.svg" />
                    </button>

                </form>

            </div>

        </div>
    )
}
