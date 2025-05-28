import { useForm, usePage } from "@inertiajs/react"
import { useEffect, useState } from "react"



export default function VerifyNotice() {

    const {auth, flash} = usePage().props
    const {post, processing} = useForm()
    const [flashVisible, setFlashVisible] = useState(!flash.message)

    useEffect(() => {
        if(flash.message) {
            setFlashVisible(true)
            const timer = setTimeout(() => {
                setFlashVisible(false)
            }, 3500);
            return () => clearTimeout(timer)
        }
    }, [flash.message])


    const handleSubmit = (e) => {
        e.preventDefault()
        post('/email/verification-notification')
    }


    return (
        <div className="h-[100svh] border relative grid place-items-center px-5 ">

            <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center select-none ">
                    <img src="../briefcase.svg" alt="logo" />
                    <span className="font-semibold text-2xl">JobSeek</span>
            </div>


            <div className="max-w-[536px] flex flex-col gap-6">
                <h1 className="font-medium text-[32px] text-center">Email Verification</h1>

                <div className="text-center  text-customGray-500">
                    <p>We just sent an email to <span className="text-customGray-900">{auth.user.email}</span>.</p>
                    <p>Please click the link in the email to verify your account</p>
                </div>



                <div className="text-customGray-600 text-center">
                    <p>Didn't receive any code?</p>
                    <form onSubmit={handleSubmit}>
                        <button disabled={processing} className="text-primary-500 font-medium ml-1 cursor-pointer disabled:text-primary-100 disabled:cursor-default">Resend</button>
                    </form>
                    <p className={`font-medium text-success-600 opacity-0 transition-opacity h-12 mt-1 duration-500 ease-in-out ${flashVisible ? "opacity-100": "opacity-0"} `} >
                        {flash.message}
                    </p>
                </div>

            </div>

        </div>
    )
}
