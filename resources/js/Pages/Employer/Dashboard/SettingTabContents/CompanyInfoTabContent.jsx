
import { useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import RichTextEditor from "../../../../Components/RichTextEditor";
import Select from "../../../../Components/Select";
import DatePicker from "../../../../Components/DatePicker";



export default function CompanyInfoTabContent() {


    const { props } = usePage({})
    console.log(props.errors)
    const employer = props.auth.user
    const { data, setData, processing, progress, errors, post } = useForm({
        logo: null,
        banner: null,
        companyName: employer.full_name || '',
        companyType: employer.company_type || '',
        industryType: employer.industry_type || '',
        teamSize: employer.team_size || '',
        establishDate: (employer.establish_date).slice(0, -3)  || '',
        companyWebsite: employer.company_website || '',
        aboutCompany: employer.about || '',
    })

    const [logoName, setLogoName] = useState('')
    const [logoDragging, setLogoDragging] = useState(false)
    const [logoSizeTooBig, setLogoSizeTooBig] = useState(false)


    const [bannerName, setBannerName] = useState('')
    const [bannerDragging, setBannerDragging] = useState(false)
    const [bannerSizeTooBig, setBannerSizeTooBig] = useState(false)



    const handleCompanyTypeChange = (option) => {
        setData(prevData => ({
            ...prevData,
            companyType: option
        }))
    }

    const handleIndustryTypeChange = (option) => {
        setData(prevData => ({
            ...prevData,
            industryType: option
        }))
    }

    const handleTeamSizeChange = (option) => {
        setData(prevData => ({
            ...prevData,
            teamSize: option
        }))
    }

    const handleYearEstablishedChange = (option) => {
        setData(prevData => ({
            ...prevData,
            establishDate: option
        }))
    }


    const [successMsg, setSuccessMsg] = useState('')
    useEffect(() => {
        if (props.flash.compInfoSuccess) {
            setSuccessMsg(props.flash.compInfoSucess)
        }
    }, [props.flash.compInfoSucess])

    useEffect(() => {
        if (successMsg) {
            const timer = setTimeout(() => setSuccessMsg(''), 5000)
            return () => clearTimeout(timer)
        }
    }, [successMsg])



    //GPT generated function, not gonna take any credits for it
    function shortenFilename(filename, maxLength = 30) {
        if (filename.length <= maxLength) return filename;

        const extIndex = filename.lastIndexOf('.');
        const extension = extIndex !== -1 ? filename.slice(extIndex) : '';
        const base = filename.slice(0, extIndex !== -1 ? extIndex : filename.length);

        const visibleChars = maxLength - extension.length - 3;
        const start = base.slice(0, Math.ceil(visibleChars / 2));
        const end = base.slice(-Math.floor(visibleChars / 2));

        return `${start}...${end}${extension}`;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        post('/employer/settings/company-info')
    }


    return (



        <form onSubmit={handleSubmit}>

            <h2 className="text-lg font-medium text-customGray-900">Company Logo & Banner</h2>

            <div className="flex flex-col md:flex-row mt-5 gap-4 md:gap-12 ">

                <div className=" min-w-40 max-w-60 shrink-0 relative">
                    <span className="text-sm text-customGray-900 ">Company Logo</span>
                    <label onDragOver={e => { e.preventDefault(); setLogoDragging(true) }} onDrop={e => {
                        e.preventDefault()
                        setLogoDragging(false)
                        setData('logo', e.dataTransfer.files[0])
                        setLogoName(shortenFilename(e.dataTransfer.files[0].name))
                        if (e.dataTransfer.files[0].size > 5 * 1024 * 1024) {
                            setLogoSizeTooBig(true)
                        } else {
                            setLogoSizeTooBig(false)
                        }

                    }}
                        htmlFor="logo" className={`relative text-center text-nowrap min-h-60 mt-2 px-[20px] py-[47px] flex flex-col items-center justify-center  text-gray-900 cursor-pointer hover:shadow-lg active:shadow-none
                                                    border rounded-md border-dashed border-customGray-200/70 bg-customGray-50/40 hover:bg-customGray-50 duration-150 ${logoDragging && 'scale-110 drop-shadow-2xl'} `}>

                        <input type="file" id="logo" className="hidden" onChange={e => {
                            setData('logo', e.target.files[0])
                            setLogoName(shortenFilename(e.target.files[0].name))
                            if (e.target.files[0].size > 5 * 1024 * 1024) {
                                setLogoSizeTooBig(true)
                            } else {
                                setLogoSizeTooBig(false)
                            }
                        }} accept="image/*" />

                        <img src="/dashboard/upload-cloud.png" className="pointer-events-none w-12 h-12" alt="logo upload" />
                        <p className="text-sm text-gray-700 mt-3">Browse photos or drop here</p>
                        <p className="text-xs text-gray-500">Max photo size is 5 MB</p>
                        <p className={`text-xs  mt-4 max-w-40  text-wrap ${logoName ? 'text-primary-600' : 'text-gray-500'}`}>
                            {logoName ? `Selected: ${logoName}` : 'No photo selected yet'}
                        </p>

                        {(progress && data.logo !== null) &&
                            <svg viewBox="0 0 24 24" className="absolute bottom-2 right-2 size-5 animate-spin-fast duration-75" >
                                <path
                                    className="text-primary-200"
                                    fill="currentColor"
                                    d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                                    opacity=".25"
                                />
                                <path
                                    className="text-primary-500"
                                    fill="currentColor"
                                    d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
                                />
                            </svg>
                        }

                    </label>

                    <div className="text-sm w-full min-h-5 text-danger-600" >
                        {(logoSizeTooBig && 'File size is too big. Max file size is 5 MB.') || props.errors.logo}
                    </div>


                </div>


                <div className="flex flex-col items-start  gap-6 w-full">
                    <div className=" min-w-40 w-full  shrink-0 relative">
                        <span className="text-sm text-customGray-900 ">Banner Image</span>
                        <label onDragOver={e => { e.preventDefault(); setBannerDragging(true) }} onDrop={e => {
                            e.preventDefault()
                            setBannerDragging(false)
                            setData('banner', e.dataTransfer.files[0])
                            setBannerName(shortenFilename(e.dataTransfer.files[0].name))
                            if (e.dataTransfer.files[0].size > 5 * 1024 * 1024) {
                                setBannerSizeTooBig(true)
                            } else {
                                setBannerSizeTooBig(false)
                            }

                        }}
                            htmlFor="banner" className={`relative text-center text-nowrap min-h-60 mt-2 px-[20px] py-[47px] flex flex-col items-center justify-center  text-gray-900 cursor-pointer hover:shadow-lg active:shadow-none
                                                    border rounded-md border-dashed border-customGray-200/70 bg-customGray-50/40 hover:bg-customGray-50 duration-150 ${bannerDragging && 'scale-110 drop-shadow-2xl'} `}>

                            <input type="file" id="banner" className="hidden" onChange={e => {
                                setData('banner', e.target.files[0])
                                setBannerName(shortenFilename(e.target.files[0].name))
                                if (e.target.files[0].size > 5 * 1024 * 1024) {
                                    setBannerSizeTooBig(true)
                                } else {
                                    setBannerSizeTooBig(false)
                                }
                            }} accept="image/*" />

                            <img src="/dashboard/upload-cloud.png" className="pointer-events-none w-12 h-12" alt="logo upload" />
                            <p className="text-sm text-gray-700 mt-3">Browse photos or drop here</p>
                            <p className="text-xs text-gray-500">Max photo size is 5 MB</p>
                            <p className={`text-xs  mt-4 max-w-40  text-wrap ${bannerName ? 'text-primary-600' : 'text-gray-500'}`}>
                                {bannerName ? `Selected: ${bannerName}` : 'No photo selected yet'}
                            </p>

                            {(progress && data.banner !== null) &&
                                <svg viewBox="0 0 24 24" className="absolute bottom-2 right-2 size-5 animate-spin-fast duration-75" >
                                    <path
                                        className="text-primary-200"
                                        fill="currentColor"
                                        d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                                        opacity=".25"
                                    />
                                    <path
                                        className="text-primary-500"
                                        fill="currentColor"
                                        d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
                                    />
                                </svg>
                            }

                        </label>

                        <div className="text-sm  w-full text-danger-600" >
                            {(bannerSizeTooBig && 'File size is too big. Max file size is 5 MB.') || props.errors.banner}
                        </div>
                    </div>

                </div>



            </div>


            <hr className="border-none h-[1px] bg-customGray-50 my-8" />



            <div className="grid grid-cols-[1fr] sm:grid-cols-[1fr_1fr] gap-2 ">

                <div className="flex flex-col w-full  min-w-44 relative sm:col-span-2">
                    <label htmlFor="comapnyName" className="text-sm text-customGray-900">Company Name</label>
                    <input type="text" placeholder="e.g. Acme Inc." id="companyName" value={data.companyName} onChange={(e) => setData('companyName', e.target.value)} className="mt-2 rounded-md border border-customGray-100 placeholder:text-customGray-400 text-customGray-900 outline-none focus:ring-1 focus:ring-primary-500 py-[11px] px-[18px]" />
                    <div className="text-sm w-full text-danger-600 min-h-5" >
                        {props.errors.companyName}
                    </div>
                </div>



                <div className="relative w-full ">
                    <label className="text-sm text-customGray-900">Company Type</label>
                    <Select options={['Agency', 'Government', 'NGO', 'Private', 'Startup', 'UN']} placeholder={data.companyType} onValueChange={handleCompanyTypeChange} />
                    <div className="text-sm w-full text-danger-600 min-h-5" >
                        {props.errors.companyType || ''}
                    </div>
                </div>

                <div className="relative w-full ">
                    <label className="text-sm text-customGray-900">Industry Type</label>
                    <Select options={['Agriculture', 'Construction', 'Education', 'Energy', 'Finance', 'Government', 'Healthcare', 'Legal', 'Manufacturing', 'Media', 'Real Estate', 'Retail', 'Technology', 'Transportation']} placeholder={data.industryType} onValueChange={handleIndustryTypeChange} />
                    <div className="text-sm w-full text-danger-600 min-h-5" >
                        {props.errors.industryType || ''}
                    </div>
                </div>

                <div className="relative w-full ">
                    <label className="text-sm text-customGray-900">Team Size</label>
                    <Select options={['1-10', '11-50', '51-100', '101-500', '501-1000', '1001-5000', '5000+']} placeholder={data.teamSize} onValueChange={handleTeamSizeChange} />
                    <div className="text-sm w-full text-danger-600 min-h-5" >
                        {props.errors.teamSize || ''}
                    </div>
                </div>

                <div className="  relative w-full ">
                    <label className="text-sm text-customGray-900" htmlFor="dob">Year of Establishment</label>
                    <DatePicker handleChange={handleYearEstablishedChange} currentDate={data.establishDate} type={'month'} />
                    <div className="text-sm w-full text-danger-600 min-h-5" >
                        {props.errors.establishDate || ''}
                    </div>
                </div>

                <div className="w-full md:max-w-1/2  relative sm:col-span-2">
                    <label htmlFor="companyWebsite" className="text-sm text-customGray-900">Company Website</label>
                    <div className="flex items-center gap-3 border mt-2 rounded-md border-customGray-100 placeholder:text-customGray-400 outline-none focus-within:ring-1 focus-within:ring-primary-500 pl-3 pr-[18px]">
                        <img src="/dashboard/url.png" alt="link icon" className="h-6 w-6" />
                        <input type="text" placeholder="Website url..." id="companyWebsite" value={data.companyWebsite} onChange={(e) => setData('companyWebsite', e.target.value)} className="w-full outline-none placeholder:text-customGray-400 text-customGray-900 py-3" />
                    </div>
                    <div className="text-sm w-full text-danger-600 min-h-5" >
                        {props.errors.companyWebsite}
                    </div>
                </div>
            </div>


            <div className="relative mt-6">
                <label className="text-sm text-customGray-900">About Company</label>
                <RichTextEditor content={data.aboutCompany} onChange={newContent => setData('aboutCompany', newContent)}
                    placeholder="Write down about your company here. Let the candidate know who you are..." />
                <div className="text-sm w-full text-danger-600 min-h-5" >
                    {props.errors.aboutCompany || ''}
                </div>
            </div>



            <div className="flex flex-wrap items-center gap-2 mt-8">
                <button disabled={processing} className="text-nowrap px-8 py-4 text-white rounded-sm bg-primary-500 hover:bg-primary-600 disabled:bg-primary-100 font-semibold cursor-pointer">
                    Save Changes
                </button>
                <span className={`text-success-500 h-6 w-52 text-sm ${successMsg ? 'opacity-100' : 'opacity-0'}  transition-all duration-300 `}>
                    {successMsg}
                </span>
            </div>


        </form>
    )
}
