
import { router, useForm, usePage } from "@inertiajs/react";
import Select from "../../../../Components/Select";
import DatePicker from "../../../../Components/DatePicker";
import { useEffect, useRef, useState } from "react";
import RichTextEditor from "../../../../Components/RichTextEditor"


export default function FoundingInfoTabContent() {

    const { props } = usePage()
    const { data, setData, processing, post } = useForm({
        gender: props.auth.user.gender || '',
        maritalStatus: props.auth.user.marital_status || '',
        birthDate: props.auth.user.dob || '',
        biography: props.auth.user.biography || ''
    })


    const handleGenderChagne = (option) => {
        setData(prevData => ({
            ...prevData,
            gender: option
        }))
    }

    const handleMaritalStatusChange = (option) => {
        setData(prevData => ({
            ...prevData,
            maritalStatus: option
        }))
    }

    const handleBirthDateChange = (value) => {
        setData(prevData => ({
            ...prevData,
            birthDate: value,
        }))
    }

    const [successMsg, setSuccessMsg] = useState('')

    useEffect(() => {
        if (successMsg) {

            const timer = setTimeout(() => setSuccessMsg(''), 5000)
            return () => clearTimeout(timer)
        }
    }, [successMsg])

    useEffect(() => {
        if (props.flash.personalSuccess) {
            setSuccessMsg(props.flash.personalSuccess)
        }
    }, [props.flash.personalSuccess])


    const handleSubmit = (e) => {
        e.preventDefault()
        setSuccessMsg('')
        post('/candidate/settings/personal', {
            onSuccess: () => {
                router.reload({ only: ['auth.user', 'flash'] })
                setSuccessMsg(props.flash.personalSuccess)
            }
        })


    }




    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <div className="flex w-full flex-col gap-6 ">

                <div className="w-full  flex gap-4 flex-col sm:flex-row">
                    <div className="relative w-full sm:w-1/2 max-w-96 ">
                        <label className="text-sm text-customGray-900">Gender</label>
                        <Select options={['Male', 'Female', 'Other', 'Prefer not to say']} placeholder={data.gender} onValueChange={handleGenderChagne} />
                        <span className="text-xs w-full text-danger-600 absolute left-0 -bottom-4" >
                            {props.errors.gender || ''}
                        </span>
                    </div>

                    <div className="relative w-full sm:w-1/2 max-w-96">
                        <label className="text-sm text-customGray-900">Marital Status</label>
                        <Select options={['Single', 'Married', 'Separated', 'Prefer not to say']} placeholder={data.maritalStatus} onValueChange={handleMaritalStatusChange} />
                        <span className="text-xs w-full text-danger-600 absolute left-0 -bottom-4" >
                            {props.errors.maritalStatus || ''}
                        </span>
                    </div>
                </div>


                <div className=" flex flex-col relative w-full sm:w-[calc(50%-8px)] max-w-96 ">
                    <label className="text-sm text-customGray-900" htmlFor="dob">Date of Birth</label>
                    <DatePicker handleChange={handleBirthDateChange} currentDate={data.birthDate} />
                    <span className="text-xs w-full text-danger-600 absolute left-0 -bottom-4" >
                        {props.errors.birthDate || ''}
                    </span>
                </div>

            </div>


            <div className="relative">
                <label className="text-sm text-customGray-900">Biography</label>
                <RichTextEditor content={data.biography} onChange={newContent => setData('biography', newContent)} />
                <span className="text-xs w-full text-danger-600 absolute left-0 -bottom-4" >
                    {props.errors.biography || ''}
                </span>
            </div>



            <div className="flex flex-wrap  items-center gap-2 mt-3">
                <button disabled={processing} className="text-nowrap px-8 py-4 text-white rounded-sm bg-primary-500 hover:bg-primary-600 disabled:bg-primary-100 font-semibold cursor-pointer">
                    Save Changes
                </button>
                <span className={`text-success-500  h-6 w-52 text-sm ${successMsg ? 'opacity-100' : 'opacity-0'}  transition-all duration-300 `}>
                    {successMsg}
                </span>
            </div>
        </form>

    )
}
