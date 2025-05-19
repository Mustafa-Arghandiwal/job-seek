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
        currentPass: '',
        newPass: '',
        confirmPass: ''
    })

    const [currPassVis, setCurrPassVis] = useState(false)
    const [newPassVis, setNewPassVis] = useState(false)
    const [confPassVis, setConfPassVis] = useState(false)




    const [successMsg, setSuccessMsg] = useState('')
    useEffect(() => {
        if (successMsg) {

            const timer = setTimeout(() => setSuccessMsg(''), 5000)
            return () => clearTimeout(timer)
        }
    }, [successMsg])

    console.log(props.flash)
    useEffect(() => {
        if (props.flash.contactSuccess) {
            setSuccessMsg(props.flash.contactSuccess)
        }
    }, [props.flash.contactSuccess])


    console.log(contactForm)
    const handleSubmit = (e) => {
        e.preventDefault()
        contactForm.post('/candidate/settings/contact', {
            onSuccess: () => {
                setSuccessMsg(props.flash.contactSuccess)
            }
        })
    }

    return (
        <div className="">

            <form className="" onSubmit={handleSubmit}>
                <h2 className="font-medium text-customGray-900 text-lg">Contact Info</h2>

                <div className="flex flex-col md:flex-row gap-4 mt-5">

                    <div className="flex flex-col gap-2  max-w-96 w-full md:w-1/2 relative">
                        <label htmlFor="phone" className="text-sm text-customGray-900">Phone</label>
                        <input type="tel" id="phone" value={contactForm.data.phone} onChange={(e) => contactForm.setData('phone', e.target.value)} placeholder="+93 xxx xxx xxx" className="border h-12 border-customGray-100 rounded-md px-[20px] outline-none  placeholder:text-customGray-400 text-customGray-900 focus:ring-1 focus:ring-primary-500" />
                        <span className="text-xs w-full text-danger-600 absolute left-0 -bottom-4" >
                            {contactForm.errors.phone || ''}
                        </span>
                    </div>
                    <div className="flex flex-col gap-2  max-w-96 w-full md:w-1/2 relative">
                        <label htmlFor="email" className="text-sm text-customGray-900">Email</label>
                        <input type="text" id="email" value={contactForm.data.email} onChange={(e) => contactForm.setData('email', e.target.value)} placeholder="example@email.com" className="border h-12 border-customGray-100 rounded-md px-[20px] outline-none  placeholder:text-customGray-400 text-customGray-900 focus:ring-1 focus:ring-primary-500" />
                        <span className="text-xs w-full text-danger-600 absolute left-0 -bottom-4" >
                            {contactForm.errors.email || ''}
                        </span>
                    </div>

                </div>


                <div>
                    <div className="flex flex-col gap-2  max-w-96 w-full md:w-1/2 mt-5 relative">
                        <label htmlFor="city" className="text-sm text-customGray-900">City</label>
                        <input type="text" id="city" value={contactForm.data.city} onChange={(e) => contactForm.setData('city', e.target.value)} placeholder="e.g. Kabul, Afghanistan" className="border h-12 border-customGray-100 rounded-md px-[20px] outline-none  placeholder:text-customGray-400 text-customGray-900 focus:ring-1 focus:ring-primary-500" />
                        <span className="text-xs w-full text-danger-600 absolute left-0 -bottom-4" >
                            {contactForm.errors.city || ''}
                        </span>
                    </div>
                </div>


                <div className="flex flex-wrap mt-8  items-center gap-2">
                    <button disabled={contactForm.processing} className="text-nowrap px-8 py-4 text-white rounded-sm bg-primary-500 hover:bg-primary-600 disabled:bg-primary-100 font-semibold cursor-pointer">
                        Save Changes
                    </button>
                    <span className={`text-success-500  h-6 w-52 text-sm ${successMsg ? 'opacity-100' : 'opacity-0'}  transition-all duration-300 `}>
                        {successMsg}
                    </span>
                </div>
            </form>




            <hr className="border-none h-[1px] bg-customGray-50 my-8" />


            <form className="flex gap-5 flex-col lg:flex-row ">

                <div className="h-20 flex flex-col gap-2 w-full max-w-96">
                    <label htmlFor="currentPass" className="text-sm text-customGray-900">Current Password</label>
                    <div className="relative">
                        <input type={currPassVis ? 'text' : 'password'} id="currentPass" placeholder="Password" value={changePassForm.data.currentPass} onChange={(e) => changePassForm.setData('currentPass', e.target.value)} className="h-12 w-full rounded-md border border-customGray-100  px-3 outline-none placeholder:text-customGray-400 text-customGray-900 focus:ring-1 focus:ring-primary-500" />
                        <button tabIndex="-1" type="button" onClick={() => setCurrPassVis(prev => !prev)} className="w-[22px] absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer ">
                            <img src="/fi_eye.png" className={`absolute top-1/2 -translate-y-1/2 transition-opacity duration-300 ${currPassVis ? "opacity-0" : "opacity-100"}`} />
                            <img src="/fi_eye-off.png" className={`absolute top-1/2 -translate-y-1/2 transition-opacity duration-300 ${currPassVis ? "opacity-100" : "opacity-0"}`} />
                        </button>
                    </div>
                    {changePassForm.errors.currentPass && <p className="text-sm text-danger-600">{changePassForm.errors.currentPass}</p>}

                </div>


                <div className="h-20 flex flex-col gap-2 w-full max-w-96">
                    <label htmlFor="newPass" className="text-sm text-customGray-900">New Password</label>
                    <div className="relative">
                        <input type={newPassVis ? 'text' : 'password'} id="newPass" placeholder="Password" value={changePassForm.data.newPass} onChange={(e) => changePassForm.setData('newPass', e.target.value)} className="h-12 w-full rounded-md border border-customGray-100  px-3 outline-none placeholder:text-customGray-400 text-customGray-900 focus:ring-1 focus:ring-primary-500" />
                        <button tabIndex="-1" type="button" onClick={() => setNewPassVis(prev => !prev)} className="w-[22px] absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer ">
                            <img src="/fi_eye.png" className={`absolute top-1/2 -translate-y-1/2 transition-opacity duration-300 ${newPassVis ? "opacity-0" : "opacity-100"}`} />
                            <img src="/fi_eye-off.png" className={`absolute top-1/2 -translate-y-1/2 transition-opacity duration-300 ${newPassVis ? "opacity-100" : "opacity-0"}`} />
                        </button>
                    </div>
                    {changePassForm.errors.newPass && <p className="text-sm text-danger-600">{changePassForm.errors.newPass}</p>}

                </div>


                <div className="h-20 flex flex-col gap-2  w-full max-w-96">
                    <label htmlFor="confirmPass" className="text-sm text-customGray-900">Confirm Password</label>
                    <div className="relative">
                        <input type={confPassVis ? 'text' : 'password'} id="confirmPass" placeholder="Password" value={changePassForm.data.confirmPass} onChange={(e) => changePassForm.setData('confirmPass', e.target.value)} className="h-12 w-full rounded-md border border-customGray-100  px-3 outline-none placeholder:text-customGray-400 text-customGray-900 focus:ring-1 focus:ring-primary-500" />
                        <button tabIndex="-1" type="button" onClick={() => setConfPassVis(prev => !prev)} className="w-[22px] absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer ">
                            <img src="/fi_eye.png" className={`absolute top-1/2 -translate-y-1/2 transition-opacity duration-300 ${confPassVis ? "opacity-0" : "opacity-100"}`} />
                            <img src="/fi_eye-off.png" className={`absolute top-1/2 -translate-y-1/2 transition-opacity duration-300 ${confPassVis ? "opacity-100" : "opacity-0"}`} />
                        </button>
                    </div>
                    {changePassForm.errors.confirmPass && <p className="text-sm text-danger-600">{changePassForm.errors.confirmPass}</p>}

                </div>
            </form>


        </div>
    )
}
