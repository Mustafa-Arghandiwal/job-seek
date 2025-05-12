
import { useState, useRef, useEffect } from "react"




export default function SocialLinksItem(props) {

    const [dropdownVisible, setDropdownVisible] = useState(false)
    const dropdownBtn = useRef(null)
    const caret = useRef(null)
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (e.target !== dropdownBtn.current && e.target !== caret.current) {
                setDropdownVisible(false)
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [])

    const selectedLink = props.linkObjects.find(linkObj => linkObj.selectedBy === props.linkNumber)
    const placeholder = selectedLink ? selectedLink.type : 'Select...'
    return (
        <div>

            <label className="text-customGray-900 text-sm">Social Link {props.linkNumber + 1}</label>
            <div className="flex flex-col relative xs:flex-row gap-1 xs:gap-3 mt-2   ">
                <div className="  w-full  max-w-[800px] rounded-md flex flex-col gap-2 xs:gap-0 xs:flex-row gap xs:border border-customGray-100">

                    <div className="relative xs:max-w-40 min-w-28 w-[calc(100%-52px)] xs:w-1/2 h-12 shrink-0  ">
                        <button type="button" ref={dropdownBtn} className={`w-full h-full  ${placeholder === 'Select...' ? 'text-customGray-400' : 'text-customGray-900'} ${dropdownVisible ? "ring-1 ring-primary-500" : "xs:rounded-none"}  flex justify-between px-3 items-center rounded-md  border xs:border-l-transparent xs:border-t-transparent xs:border-b-transparent xs:border-r border-customGray-100  gap-2 cursor-pointer`}
                            onClick={() => setDropdownVisible(prev => !prev)}>
                            {placeholder}
                            <img ref={caret} className={`w-3.5 transition-all duration-200 ${dropdownVisible ? "rotate-180" : ""}`} src="/CaretDown.svg" />
                        </button>
                        <div className={`absolute mt-0.5 bg-white shadow-[0px_12px_32px_rgba(25,31,51,0.08)] z-10 top-full flex flex-col w-full border border-customGray-100 rounded-md p-3 text-sm text-customGray-700 ${dropdownVisible ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-3 invisible"}  transition-all duration-300 ease-in-out`}>
                            {props.linkObjects.map((linkObj, index) => {
                                if (linkObj.selectedBy === null) {
                                    return <span key={index}
                                        onClick={() => { props.onValueChange(linkObj.type, props.linkNumber) }}
                                        className="w-full rounded-sm flex px-2 py-1 hover:text-primary-500 hover:bg-[#E8F1FF] cursor-pointer">{linkObj.type}
                                    </span>
                                } else {
                                    return <span key={index}
                                    className="w-full rounded-sm flex px-2 py-1 text-customGray-200 pointer-events-none ">{linkObj.type}

                                    </span>
                                }
                            })}
                        </div>
                    </div>


                    <input type="text" className="w-full  h-12 shrink-0 xs:shrink rounded-md border  border-customGray-100 xs:border-none xs:rounded-none  px-5 py-1 outline-none" placeholder="profile link/url..." />

                </div>

                <button type="button" onClick={() => props.handleRemoveLink(props.linkNumber) }
                    className=" rounded-md bg-customGray-50 absolute right-0 top-0 xs:static   w-12 h-12 grid place-items-center cursor-pointer group hover:text-danger-500 duration-100 ">
                    {/* <img src="/Xcircle.png" /> */}
                    <svg className=" group-hover:scale-125 group-active:scale-95 duration-100" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" >
                        <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="currentColor" strokeWidth="1.3" strokeMiterlimit="10" />
                        <path d="M12.5 7.5L7.5 12.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12.5 12.5L7.5 7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

        </div>
    )
}

