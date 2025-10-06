
import { useState, useRef, useEffect } from "react"
import { CircleXIcon } from "../utils/svgs"




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

    const inputRef = useRef(null)

    const selectedLink = props.linkObjects.find(linkObj => linkObj.selectedBy === props.linkNumber)
    const placeholder = selectedLink ? selectedLink.type : 'Select...'


    const errorMsg = (props.error[`links.${props.linkNumber}.url`])?.replace(`links.${props.linkNumber}.url`, 'URL');


    return (
        <div className="relative">

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
                                        onClick={() => { props.onValueChange(linkObj.type, props.linkNumber), setTimeout(() => { inputRef.current?.focus() }, 0) }}
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


                    <input type="text"
                        ref={inputRef}
                        disabled={!selectedLink}
                        value={selectedLink ? selectedLink.url : ''}
                        onChange={(e) => {
                            if (selectedLink) {
                                props.handleSetUrl(selectedLink.type, e.target.value)
                            }
                        }}
                        className="w-full  h-12 shrink-0 xs:shrink text-customGray-900 rounded-md border  border-customGray-100 xs:border-none xs:rounded-none  px-5 py-1 outline-none" placeholder="https://www.example.com/username" />

                </div>

                <button type="button" onClick={() => props.handleRemoveLink(props.linkNumber)}
                    className=" rounded-md bg-customGray-50 absolute right-0 top-0 xs:static   w-12 h-12 grid place-items-center cursor-pointer group hover:text-danger-500 duration-100 ">
                    {/* <img src="/Xcircle.png" /> */}
                    <CircleXIcon className="group-hover:scale-125 group-active:scale-95 duration-100" />
                </button>

            </div>



            {errorMsg &&

            <span className="min-h-5  text-sm text-danger-500">
                {errorMsg}
            </span>
            }
        </div>
    )
}

