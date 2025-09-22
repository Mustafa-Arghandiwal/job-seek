import { router, useForm, usePage } from "@inertiajs/react"
import Layout from "../../Layouts/Layout"
import Employer from "../../Components/Employer"
import { useEffect, useRef, useState } from "react"
import { FilterIcon } from "../../utils/svgs"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../../Components/Pagination"
import PaginationLinks from "../../utils/getPaginationLinks"



function FindEmployers({ employers, type }) {
    // console.log(employers)

    const [showFilter, setShowFilter] = useState(false)
    const filterBtn = useRef(null)
    const filterDropDown = useRef(null)



    const [employerType, setEmployerType] = useState(type)
    const handleFilterChange = (e) => {
        const selectedVal = e.target.value
        if (selectedVal !== employerType) { //this prevents redundant request on same filter click
            setEmployerType(selectedVal)
            if (selectedVal !== "all") {
                router.get('/employers', { type: selectedVal }, { preserveState: true })
            } else {
                router.get('/employers', {}, { preserveState: true })
            }
        }
    }



    const employerEls = employers.data.map(emp => (
        <Employer key={emp.user_id} id={emp.id} companyName={emp.user.full_name} logo={emp.detail?.logo_path} location={emp.contact?.city} />
    ))



    const employerTypes = ['all', 'government', 'private', 'startup', 'agency', 'ngo', 'un']
    const radioBtnsSidebar = employerTypes.map(type => (
        <label key={type} className="cursor-pointer w-fit text-sm text-customGray-700">
            <input className="cursor-pointer" type="radio" onClick={() => setShowFilter(false)} checked={type === employerType} name="orgTypeSidebar" value={type} onChange={handleFilterChange} /> <span className={`${['ngo', 'un'].includes(type) ? 'uppercase' : 'capitalize'} ml-2`}>{type}</span>
        </label>
    ))
    const radioBtnsDropdown = employerTypes.map(type => (
        <label key={type} className="cursor-pointer w-fit text-sm text-customGray-700">
            <input className="cursor-pointer" type="radio" onClick={() => setShowFilter(false)} checked={type === employerType} name="orgTypeDropdown" value={type} onChange={handleFilterChange} /> <span className={`${['ngo', 'un'].includes(type) ? 'uppercase' : 'capitalize'} ml-2`}>{type}</span>
        </label>

    ))


    useEffect(() => {
        const handleClickOutside = (e) => {
            if ((filterBtn.current && !filterBtn.current.contains(e.target)) && (filterDropDown.current && !filterDropDown.current.contains(e.target))) {
                setShowFilter(false)
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)

    }, [filterBtn, filterDropDown])




    return (
        <div className="xl:px-[150px] 2xl:px-[230px] pt-2">
            <div className=" mt-8 px-3 xs:px-10  lg:hidden relative ">
                <button ref={filterBtn} onClick={() => setShowFilter(prev => !prev)} className="flex text-nowrap gap-3 px-4 py-2 text-white rounded-[3px] bg-primary-500 hover:bg-primary-600 disabled:bg-primary-100 font-semibold cursor-pointer">
                    <FilterIcon />
                    Filter
                </button>

                <div ref={filterDropDown} className={`drop-shadow-xl  rounded-lg p-5 absolute z-20 bg-white ${showFilter ? 'opacity-100' : 'opacity-0 pointer-events-none'} duration-100`}>
                    <p className="font-medium text-customGray-400 uppercase text-xs">Organization Type</p>
                    <div className="flex flex-col gap-3 mt-3">
                        {radioBtnsDropdown}
                    </div>
                </div>

            </div>

            <div className="min-h-[512px] flex ">
                <div className=" max-w-96 w-full  py-6 px-8  hidden lg:block  ">
                    <div className=" flex flex-col gap-4 border rounded-xl sticky top-4 pl-8 pb-8 pt-6 border-customGray-50">
                        <p className="font-medium text-customGray-900 text-lg">Organization Type</p>
                        {radioBtnsSidebar}

                    </div>
                </div>

                <div className="w-full px-3 xs:px-10 py-6 flex flex-col gap-6 mb-12">
                    {employerEls.length === 0
                        ?
                        <div className="text-customGray-900 mt-28 mx-auto"><span className="font-medium">No employers found</span> for this organization type. Please try a different filter.</div>
                        :
                        employerEls}

                    <PaginationLinks paginator={employers} />

                </div>
            </div>
        </div>
    )
}

FindEmployers.layout = page => <Layout children={page} />
export default FindEmployers
