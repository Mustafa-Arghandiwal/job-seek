import { useForm, usePage } from "@inertiajs/react"
import { useState, useEffect, useRef } from "react"
import DeleteModal from "../../../../Components/DeleteModal"


export default function AccountTabContent() {

    const { props } = usePage()

    const contactForm = useForm({
        phone: props.auth.user.employer_phone || '',
        email: props.auth.user.employer_contact_email || '',
        city: props.auth.user.employer_city || '',
    })

    const changePassForm = useForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const deleteAccountForm = useForm({})

    const [currPassVis, setCurrPassVis] = useState(false)
    const [newPassVis, setNewPassVis] = useState(false)
    const [confPassVis, setConfPassVis] = useState(false)


    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const deleteAccountBtnRef = useRef(null)

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
        contactForm.post('/employer/settings/contact', {
            onSuccess: () => {
                setContactSuccessMsg(props.flash.contactSuccess)
            }
        })
    }

    const handleChangePassSubmit = (e) => {
        e.preventDefault()
        changePassForm.post('/employer/settings/change-password', {
            onSuccess: () => {
                setChangePassSuccessMsg(props.flash.changePassSuccess);
                changePassForm.reset()
            }
        })
    }

    const handleDeleteAccountSubmit = (e) => {
        e.preventDefault()
        deleteAccountForm.post('/employer/settings/delete-account')

    }
    // ________________________________________________________________________


    return (
        <div className="relative">

            <form className="" onSubmit={handleContactFormSubmit}>
                <h2 className="font-medium text-customGray-900 text-lg">Contact Info</h2>

                <div className="flex flex-col md:flex-row gap-2 md:gap-6  mt-5">

                    <div className="flex flex-col gap-2  max-w-96 w-full md:w-1/2 relative">
                        <label htmlFor="phone" className="text-sm text-customGray-900">Phone</label>
                        <input type="tel" id="phone" value={contactForm.data.phone} onChange={(e) => contactForm.setData('phone', e.target.value)} placeholder="+93 xxx xxx xxx" className="border h-12 border-customGray-100 rounded-md px-[20px] outline-none  placeholder:text-customGray-400 text-customGray-900 focus:ring-1 focus:ring-primary-500 " />
                        <div className="text-sm w-full text-danger-600 min-h-5">
                            {contactForm.errors.phone || ''}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2  max-w-96 w-full md:w-1/2 relative">
                        <label htmlFor="email" className="text-sm text-customGray-900">Email</label>
                        <input type="text" id="email" value={contactForm.data.email} onChange={(e) => contactForm.setData('email', e.target.value)} placeholder="example@email.com" className="border h-12 border-customGray-100 rounded-md px-[20px] outline-none  placeholder:text-customGray-400 text-customGray-900 focus:ring-1 focus:ring-primary-500" />
                        <div className="text-sm w-full text-danger-600 min-h-5">
                            {contactForm.errors.email}
                        </div>
                    </div>

                </div>


                <div>
                    <div className="flex flex-col gap-2  max-w-96 w-full md:w-1/2 mt-2 relative">
                        <label htmlFor="city" className="text-sm text-customGray-900">City</label>
                        <input type="text" id="city" value={contactForm.data.city} onChange={(e) => contactForm.setData('city', e.target.value)} placeholder="e.g. Kabul, Afghanistan" className="border h-12 border-customGray-100 rounded-md px-[20px] outline-none  placeholder:text-customGray-400 text-customGray-900 focus:ring-1 focus:ring-primary-500" />
                        <div className="text-sm w-full text-danger-600 min-h-5">
                            {contactForm.errors.city}
                        </div>
                    </div>
                </div>


                <div className="flex flex-wrap mt-8  items-center gap-2">
                    <button disabled={contactForm.processing} className="text-nowrap px-8 py-4 text-white rounded-sm bg-primary-500 hover:bg-primary-600 disabled:bg-primary-100 font-semibold cursor-pointer  transition-all duration-100">
                        Save Changes
                    </button>
                    <span className={`text-success-500  h-6 w-52 w-auto text-sm ${contactSuccessMsg ? 'opacity-100' : 'opacity-0'}  transition-all duration-300 `}>
                        {contactSuccessMsg}
                    </span>
                </div>
            </form>




            <hr className="border-none h-[1px] bg-customGray-50 my-8" />


            <form onSubmit={handleChangePassSubmit} className="flex flex-col gap-5">

                <h2 className="font-medium text-customGray-900 text-lg">Change Password</h2>

                <div className="flex flex-col lg:flex-row gap-4 ">
                    <div className=" flex flex-col  w-full max-w-96 relative">
                        <label htmlFor="currentPassword" className="text-sm text-customGray-900">Current Password</label>
                        <div className="relative mt-2">
                            <input type={currPassVis ? 'text' : 'password'} id="currentPassword" placeholder="Enter current password" value={changePassForm.data.currentPassword} onChange={(e) => changePassForm.setData('currentPassword', e.target.value)}
                                className=" h-12 w-full rounded-md border border-customGray-100  px-3 outline-none placeholder:text-customGray-400 placeholder:text-sm sm:placeholder:text-base text-customGray-900 focus:ring-1 focus:ring-primary-500" />
                            <button tabIndex={-1} type="button" onClick={() => setCurrPassVis(prev => !prev)} className="w-[22px] absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer ">
                                <img src="/fi_eye.png" className={`absolute top-1/2 -translate-y-1/2 transition-opacity duration-300 ${currPassVis ? "opacity-0" : "opacity-100"}`} />
                                <img src="/fi_eye-off.png" className={`absolute top-1/2 -translate-y-1/2 transition-opacity duration-300 ${currPassVis ? "opacity-100" : "opacity-0"}`} />
                            </button>
                        </div>
                        <div className="text-sm w-full text-danger-600 min-h-5">
                            {changePassForm.errors.currentPassword}
                        </div>

                    </div>


                    <div className="flex flex-col  w-full max-w-96 relative">
                        <label htmlFor="newPass" className="text-sm text-customGray-900">New Password</label>
                        <div className="relative mt-2">
                            <input type={newPassVis ? 'text' : 'password'} id="newPass" placeholder="Create a new password" value={changePassForm.data.newPassword} onChange={(e) => changePassForm.setData('newPassword', e.target.value)}
                                className=" h-12 w-full rounded-md border border-customGray-100  px-3 outline-none placeholder:text-customGray-400 placeholder:text-sm sm:placeholder:text-base text-customGray-900 focus:ring-1 focus:ring-primary-500" />
                            <button tabIndex={-1} type="button" onClick={() => setNewPassVis(prev => !prev)} className="w-[22px] absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer ">
                                <img src="/fi_eye.png" className={`absolute top-1/2 -translate-y-1/2 transition-opacity duration-300 ${newPassVis ? "opacity-0" : "opacity-100"}`} />
                                <img src="/fi_eye-off.png" className={`absolute top-1/2 -translate-y-1/2 transition-opacity duration-300 ${newPassVis ? "opacity-100" : "opacity-0"}`} />
                            </button>
                        </div>
                        <div className="text-sm w-full text-danger-600 min-h-5">
                            {changePassForm.errors.newPassword}
                        </div>
                    </div>


                    <div className="flex flex-col   w-full max-w-96 relative">
                        <label htmlFor="confirmPass" className="text-sm text-customGray-900">Confirm Password</label>
                        <div className="relative mt-2">
                            <input type={confPassVis ? 'text' : 'password'} id="confirmPass" placeholder="Re-enter new password" value={changePassForm.data.confirmPassword} onChange={(e) => changePassForm.setData('confirmPassword', e.target.value)}
                                className=" h-12 w-full rounded-md border border-customGray-100  px-3 outline-none placeholder:text-customGray-400  placeholder:text-sm sm:placeholder:text-base text-customGray-900 focus:ring-1 focus:ring-primary-500" />
                            <button tabIndex={-1} type="button" onClick={() => setConfPassVis(prev => !prev)} className="w-[22px] absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer ">
                                <img src="/fi_eye.png" className={`absolute top-1/2 -translate-y-1/2 transition-opacity duration-300 ${confPassVis ? "opacity-0" : "opacity-100"}`} />
                                <img src="/fi_eye-off.png" className={`absolute top-1/2 -translate-y-1/2 transition-opacity duration-300 ${confPassVis ? "opacity-100" : "opacity-0"}`} />
                            </button>
                        </div>
                        <div className="text-sm w-full text-danger-600 min-h-5">
                            {changePassForm.errors.confirmPassword}
                        </div>

                    </div>

                </div>

                <div className="flex flex-wrap mt-6  items-center gap-2 ">
                    <button disabled={changePassForm.processing} className="text-nowrap px-8 py-4 text-white rounded-sm bg-primary-500 hover:bg-primary-600 disabled:bg-primary-100 font-semibold cursor-pointer transition-all duration-100">
                        Save Changes
                    </button>
                    <span className={`text-success-500  h-6 w-56 sm:w-auto  text-sm ${changePassSuccessMsg ? 'opacity-100' : 'opacity-0'}  transition-all duration-300 `}>
                        {changePassSuccessMsg}
                    </span>
                </div>
            </form>

            <hr className="border-none h-[1px] bg-customGray-50 my-8" />




            <form onSubmit={handleDeleteAccountSubmit}>
                <h2 className="font-medium text-customGray-900 text-lg" >Delete Your Account</h2>
                <p className="text-sm text-customGray-500 max-w-lg mt-3">
                    Deleting your account is permanent. You’ll lose access to your account and data. This action cannot be undone.
                </p>
                <button
                    ref={deleteAccountBtnRef}
                    disabled={deleteAccountForm.processing} type="button" onClick={() => setShowDeleteModal(prev => !prev)}
                    className={` group cursor-pointer relative flex items-center gap-1 hover: mt-5 text-danger-500 font-medium text-sm px-4 py-4 rounded-md active:scale-95 duration-150 hover:shadow-2xl `} >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" >
                        <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="currentColor" strokeWidth="1.3" strokeMiterlimit="10" />
                        <path d="M12.5 7.5L7.5 12.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12.5 12.5L7.5 7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="absolute rounded-full top-0 left-0 w-0 h-[1px] bg-danger-500 group-hover:w-full transition-all duration-150"></span>
                    <span className="absolute rounded-full top-0 right-0 w-[1px] h-0 bg-danger-500 group-hover:h-full transition-all duration-150"></span>
                    <span className="absolute rounded-full bottom-0 right-0 w-0 h-[1px] bg-danger-500 group-hover:w-full transition-all duration-200"></span>
                    <span className="absolute rounded-full bottom-0 left-0 w-[1px] h-0 bg-danger-500 group-hover:h-full transition-all duration-200"></span>
                    <span>Delete Account</span>
                </button>

                {/* Confirmation modal */}
                <DeleteModal
                    showDeleteModal={showDeleteModal}
                    setShowDeleteModal={setShowDeleteModal}
                    deleteAccountBtnRef={deleteAccountBtnRef}
                    handleDeleteAccountSubmit={handleDeleteAccountSubmit}
                />
            </form>


        </div>
    )
}
