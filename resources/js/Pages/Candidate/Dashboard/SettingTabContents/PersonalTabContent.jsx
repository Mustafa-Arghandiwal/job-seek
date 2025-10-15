import { router, useForm, usePage } from "@inertiajs/react";
import Select from "../../../../Components/Select";
import DatePicker from "../../../../Components/DatePicker";
import { useEffect, useRef, useState } from "react";
import RichTextEditor from "../../../../Components/RichTextEditor"
import { Asterisk } from "lucide-react";


export default function PersonalTabContent() {

    const { props } = usePage()
    const { data, setData, errors, processing, post } = useForm({
        gender: props.auth.user.gender || '',
        maritalStatus: props.auth.user.marital_status || '',
        birthDate: props.auth.user.dob || '',
        biography: props.auth.user.biography || ''
    })


    const handleSelectChange = (field, option) => {
        setData(prev => ({
            ...prev,
            [field]: option
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

            <div className="flex w-full flex-col gap-2">

                <div className="w-full  flex gap-2 flex-col sm:flex-row">
                    <div className="relative w-full sm:w-1/2 max-w-96 ">
                        <label className="text-sm text-customGray-900 flex">Gender <Asterisk className="w-3 h-3 text-danger-500 "/></label>
                        <Select options={['Male', 'Female', 'Other', 'Prefer not to say']} placeholder={data.gender} onValueChange={(option) => handleSelectChange('gender', option)} />
                        <div className="text-sm w-full text-danger-600 min-h-5" >
                            {props.errors.gender || ''}
                        </div>
                    </div>

                    <div className="relative w-full sm:w-1/2 max-w-96">
                        <label className="text-sm text-customGray-900 flex">Marital Status <Asterisk className="w-3 h-3 text-danger-500 "/></label>
                        <Select options={['Single', 'Married', 'Separated', 'Prefer not to say']} placeholder={data.maritalStatus} onValueChange={(option) => handleSelectChange('maritalStatus', option)} />
                        <div className="text-sm w-full text-danger-600 min-h-5" >
                            {props.errors.maritalStatus || ''}
                        </div>
                    </div>
                </div>


                <div className=" flex flex-col relative w-full sm:w-[calc(50%-8px)] max-w-96 ">
                    <label className="text-sm text-customGray-900 flex" htmlFor="dob">Date of Birth <Asterisk className="w-3 h-3 text-danger-500 "/></label>
                    <DatePicker handleChange={handleBirthDateChange} currentDate={data.birthDate} type={'date'} dateRange={'past'} />
                    <div className="text-sm w-full text-danger-600 min-h-5" >
                        {props.errors.birthDate || ''}
                    </div>
                </div>

            </div>


            <div className="relative">
                <label className="text-sm text-customGray-900 flex">Biography <Asterisk className="w-3 h-3 text-danger-500 "/></label>
                <RichTextEditor content={data.biography} onChange={newContent => setData('biography', newContent)}
                    placeholder="Write down your biography here. Let the employers know who you are..." />
                <div className="text-sm w-full text-danger-600 min-h-5  " >
                    {props.errors.biography || ''}
                </div>
            </div>



            <div className="flex flex-wrap  items-center gap-2 mt-3">
                <button disabled={processing} className="text-nowrap px-8 py-4 text-white rounded-sm bg-primary-500 hover:bg-primary-600 disabled:bg-primary-100 font-semibold cursor-pointer">
                    Save Changes
                </button>
                <div className={`text-success-500  h-6 w-52 sm:w-auto text-sm ${successMsg ? 'opacity-100' : 'opacity-0'}  transition-all duration-300 `}>
                    {successMsg}
                </div>
                {Object.keys(errors).length !== 0 &&
                    <span className="text-sm text-danger-600">Form contains errors, please review and try again.</span>
                }
            </div>
        </form>

    )
}
