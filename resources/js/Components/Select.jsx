import { useEffect, useRef, useState } from "react"



export default function Select(props) {

    const [dropdownVisible, setDropdownVisible] = useState(false)
    const dropdownBtn = useRef(null)
    const caret = useRef(null)
    // const [placeholder, setPlaceholder] = useState('Select...')
    useEffect(() => {
        const handleClickOutside = (e) => {
            if(e.target !== dropdownBtn.current && e.target !== caret.current) {
                setDropdownVisible(false)
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [])



    return (
        <div className="relative">
            <button type="button" ref={dropdownBtn} className={`w-full  ${props.placeholder === '' ? 'text-customGray-400' : 'text-customGray-900'} ${dropdownVisible && "ring-1 ring-primary-500"} h-12 flex justify-between px-3 items-center border border-customGray-100 rounded-md gap-2 cursor-pointer`}
                onClick={() => setDropdownVisible(prev => !prev)}>
                {props.placeholder === '' ? 'Select...' : props.placeholder}
                <img ref={caret} className={`w-3.5 transition-all duration-200 ${dropdownVisible ? "rotate-180" : ""}`} src="/CaretDown.svg" />
            </button>
            <div className={`absolute mt-0.5 bg-white shadow-[0px_12px_32px_rgba(25,31,51,0.08)] z-10 top-full flex flex-col w-full border border-customGray-100 rounded-md p-3 text-sm text-customGray-700 ${dropdownVisible ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-3 invisible"}  transition-all duration-300 ease-in-out`}>
                {/* <span onClick={() => setData("user_type", "candidate")} className="w-full rounded-xs flex px-2 py-1 hover:text-primary-500 hover:bg-[#E8F1FF] cursor-pointer">Candidate</span>
                <span onClick={() => setData("user_type", "employer")} className="w-full rounded-xs flex px-2 py-1 hover:text-primary-500 hover:bg-[#E8F1FF] cursor-pointer">Employer</span> */}
                {props.options.map((option, index) => {
                    return <span key={index} onClick={() => {props.onValueChange(option) }}
                     className="w-full rounded-sm flex px-2 py-1 hover:text-primary-500 hover:bg-[#E8F1FF] cursor-pointer">{option}</span>
                })}
            </div>
        </div>
    )
}
