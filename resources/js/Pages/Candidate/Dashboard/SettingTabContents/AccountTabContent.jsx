import { useForm, usePage } from "@inertiajs/react"
import { useState, useEffect } from "react"


export default function AccountTabContent() {


    const { props } = usePage()

    const contactForm = useForm({
        phone: props.auth.user.phone || '',
        email: props.auth.user.contactEmail || '',
        city: props.auth.user.city || '',
    })

    const changePassForm = useForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const [currPassVis, setCurrPassVis] = useState(false)
    const [newPassVis, setNewPassVis] = useState(false)
    const [confPassVis, setConfPassVis] = useState(false)




    const [contactSuccessMsg, setContactSuccessMsg] = useState('')
    const [changePassSuccessMsg, setChangePassSuccessMsg] = useState('')

    useEffect(() => {
        if (contactSuccessMsg) {
            const timer = setTimeout(() => setContactSuccessMsg(''), 5000)
            return () => clearTimeout(timer)
        }
    }, [contactSuccessMsg])

    useEffect(() => {
        if (changePassSuccessMsg) {
            const timer = setTimeout(() => setChangePassSuccessMsg(''), 5000)
            return () => clearTimeout(timer)
        }
    }, [changePassSuccessMsg])

    useEffect(() => {
        if (props.flash.contactSuccess) {
            setContactSuccessMsg(props.flash.contactSuccess)
        }
    }, [props.flash.contactSuccess])

    useEffect(() => {
        if (props.flash.changePassSuccess) {
            setChangePassSuccessMsg(props.flash.changePassSuccess)
        }
    }, [props.flash.changePassSuccess])



// ________________________________________________________________________
    const handleContactFormSubmit = (e) => {
        e.preventDefault()
        contactForm.post('/candidate/settings/contact', {
            onSuccess: () => {
                setContactSuccessMsg(props.flash.contactSuccess)
            }
        })
    }

    const handleChangePassSubmit = (e) => {
        e.preventDefault()
        changePassForm.post('/candidate/settings/change-password', {
            onSuccess: () => {
                setChangePassSuccessMsg(props.flash.changePassSuccess),
                changePassForm.reset()
            }
        })
    }
// ________________________________________________________________________


    return (
        <div className="">

            <form className="" onSubmit={handleContactFormSubmit}>
                <h2 className="font-medium text-customGray-900 text-lg">Contact Info</h2>

                <div className="flex flex-col md:flex-row gap-4 mt-5">

                    <div className="flex flex-col gap-2  max-w-96 w-full md:w-1/2 relative">
                        <label htmlFor="phone" className="text-sm text-customGray-900">Phone</label>
                        <input type="tel" id="phone" value={contactForm.data.phone} onChange={(e) => contactForm.setData('phone', e.target.value)} placeholder="+93 xxx xxx xxx" className="border h-12 border-customGray-100 rounded-md px-[20px] outline-none  placeholder:text-customGray-400 text-customGray-900 focus:ring-1 focus:ring-primary-500" />
                        {contactForm.errors.phone && (
                            <span className="text-sm w-full text-danger-600 absolute left-0 -bottom-5">
                                {contactForm.errors.phone}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2  max-w-96 w-full md:w-1/2 relative">
                        <label htmlFor="email" className="text-sm text-customGray-900">Email</label>
                        <input type="text" id="email" value={contactForm.data.email} onChange={(e) => contactForm.setData('email', e.target.value)} placeholder="example@email.com" className="border h-12 border-customGray-100 rounded-md px-[20px] outline-none  placeholder:text-customGray-400 text-customGray-900 focus:ring-1 focus:ring-primary-500" />
                        {contactForm.errors.email && (
                            <span className="text-sm w-full text-danger-600 absolute left-0 -bottom-5">
                                {contactForm.errors.email}
                            </span>
                        )}
                    </div>

                </div>


                <div>
                    <div className="flex flex-col gap-2  max-w-96 w-full md:w-1/2 mt-5 relative">
                        <label htmlFor="city" className="text-sm text-customGray-900">City</label>
                        <input type="text" id="city" value={contactForm.data.city} onChange={(e) => contactForm.setData('city', e.target.value)} placeholder="e.g. Kabul, Afghanistan" className="border h-12 border-customGray-100 rounded-md px-[20px] outline-none  placeholder:text-customGray-400 text-customGray-900 focus:ring-1 focus:ring-primary-500" />
                        {contactForm.errors.city && (
                            <span className="text-sm w-full text-danger-600 absolute left-0 -bottom-5">
                                {contactForm.errors.city}
                            </span>
                        )}
                    </div>
                </div>


                <div className="flex flex-wrap mt-8  items-center gap-2">
                    <button disabled={contactForm.processing} className="text-nowrap px-8 py-4 text-white rounded-sm bg-primary-500 hover:bg-primary-600 disabled:bg-primary-100 font-semibold cursor-pointer">
                        Save Changes
                    </button>
                    <span className={`text-success-500  h-6 w-52 text-sm ${contactSuccessMsg ? 'opacity-100' : 'opacity-0'}  transition-all duration-300 `}>
                        {contactSuccessMsg}
                    </span>
                </div>
            </form>




            <hr className="border-none h-[1px] bg-customGray-50 my-8" />


            <form onSubmit={handleChangePassSubmit} className="flex flex-col gap-5">

                <h2 className="font-medium text-customGray-900 text-lg">Change Password</h2>

                <div className={`flex  flex-col lg:flex-row ${Object.keys(changePassForm.errors).length > 0 ? "gap-11 sm:gap-8" : "gap-8"}`}>
                    <div className="h-20 flex flex-col  w-full max-w-96 relative">
                        <label htmlFor="currentPassword" className="text-sm text-customGray-900">Current Password</label>
                        <div className="relative mt-2">
                            <input type={currPassVis ? 'text' : 'password'} id="currentPassword" placeholder="Enter current password" value={changePassForm.data.currentPassword} onChange={(e) => changePassForm.setData('currentPassword', e.target.value)}
                                className=" h-12 w-full rounded-md border border-customGray-100  px-3 outline-none placeholder:text-customGray-400 placeholder:text-sm sm:placeholder:text-base text-customGray-900 focus:ring-1 focus:ring-primary-500" />
                            <button tabIndex="-1" type="button" onClick={() => setCurrPassVis(prev => !prev)} className="w-[22px] absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer ">
                                <img src="/fi_eye.png" className={`absolute top-1/2 -translate-y-1/2 transition-opacity duration-300 ${currPassVis ? "opacity-0" : "opacity-100"}`} />
                                <img src="/fi_eye-off.png" className={`absolute top-1/2 -translate-y-1/2 transition-opacity duration-300 ${currPassVis ? "opacity-100" : "opacity-0"}`} />
                            </button>
                        </div>
                        {changePassForm.errors.currentPassword && (
                            <span className="text-sm w-full text-danger-600">
                                {changePassForm.errors.currentPassword}
                            </span>
                        )}

                    </div>


                    <div className="h-20 flex flex-col  w-full max-w-96 relative">
                        <label htmlFor="newPass" className="text-sm text-customGray-900">New Password</label>
                        <div className="relative mt-2">
                            <input type={newPassVis ? 'text' : 'password'} id="newPass" placeholder="Create a new password" value={changePassForm.data.newPassword} onChange={(e) => changePassForm.setData('newPassword', e.target.value)}
                                className=" h-12 w-full rounded-md border border-customGray-100  px-3 outline-none placeholder:text-customGray-400 placeholder:text-sm sm:placeholder:text-base text-customGray-900 focus:ring-1 focus:ring-primary-500" />
                            <button tabIndex="-1" type="button" onClick={() => setNewPassVis(prev => !prev)} className="w-[22px] absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer ">
                                <img src="/fi_eye.png" className={`absolute top-1/2 -translate-y-1/2 transition-opacity duration-300 ${newPassVis ? "opacity-0" : "opacity-100"}`} />
                                <img src="/fi_eye-off.png" className={`absolute top-1/2 -translate-y-1/2 transition-opacity duration-300 ${newPassVis ? "opacity-100" : "opacity-0"}`} />
                            </button>
                        </div>
                        {changePassForm.errors.newPassword && (
                            <span className="text-sm w-full text-danger-600">
                                {changePassForm.errors.newPassword}
                            </span>
                        )}
                    </div>


                    <div className="h-20 flex flex-col   w-full max-w-96 relative">
                        <label htmlFor="confirmPass" className="text-sm text-customGray-900">Confirm Password</label>
                        <div className="relative mt-2">
                            <input type={confPassVis ? 'text' : 'password'} id="confirmPass" placeholder="Re-enter new password" value={changePassForm.data.confirmPassword} onChange={(e) => changePassForm.setData('confirmPassword', e.target.value)}
                                className=" h-12 w-full rounded-md border border-customGray-100  px-3 outline-none placeholder:text-customGray-400  placeholder:text-sm sm:placeholder:text-base text-customGray-900 focus:ring-1 focus:ring-primary-500" />
                            <button tabIndex="-1" type="button" onClick={() => setConfPassVis(prev => !prev)} className="w-[22px] absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer ">
                                <img src="/fi_eye.png" className={`absolute top-1/2 -translate-y-1/2 transition-opacity duration-300 ${confPassVis ? "opacity-0" : "opacity-100"}`} />
                                <img src="/fi_eye-off.png" className={`absolute top-1/2 -translate-y-1/2 transition-opacity duration-300 ${confPassVis ? "opacity-100" : "opacity-0"}`} />
                            </button>
                        </div>
                        {changePassForm.errors.confirmPassword && (
                            <span className="text-sm w-full text-danger-600">
                                {changePassForm.errors.confirmPassword}
                            </span>
                        )}

                    </div>

                </div>

                <div className="flex flex-wrap mt-6  items-center gap-2 ">
                    <button disabled={changePassForm.processing} className="text-nowrap px-8 py-4 text-white rounded-sm bg-primary-500 hover:bg-primary-600 disabled:bg-primary-100 font-semibold cursor-pointer">
                        Save Changes
                    </button>
                    <span className={`text-success-500  h-6 w-56  text-sm ${changePassSuccessMsg ? 'opacity-100' : 'opacity-0'}  transition-all duration-300 `}>
                        {changePassSuccessMsg}
                    </span>
                </div>
            </form>

            <hr className="border-none h-[1px] bg-customGray-50 my-8" />


            <form>
                <h2 className="font-medium text-customGray-900 text-lg" >Delete Your Account</h2>
                <p className="text-sm text-customGray-500 max-w-lg mt-3">
                    Deleting your account is permanent. You’ll lose access to your account and data. This action cannot be undone.
                </p>
            </form>
        </div>
    )
}
