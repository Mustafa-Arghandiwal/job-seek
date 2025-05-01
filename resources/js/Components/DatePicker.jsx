import { useEffect, useRef, useState } from "react"




export default function DatePicker(props) {

    const pickerRef = useRef(null)
    const inputRef = useRef(null)

    useEffect(() => {
        if (pickerRef.current && inputRef.current) {
            const handleClick = () => {
                if (inputRef.current.showPicker) {
                    inputRef.current.showPicker();
                } else {
                    inputRef.current.focus();
                }
            }

            pickerRef.current.addEventListener('click', handleClick);
            return () => {
                if (pickerRef.current) {
                    pickerRef.current.removeEventListener('click', handleClick);

                }
            }
        }
    }, []);


    return (
        <div className="relative">
            <input
                ref={inputRef}
                type="date"
                id="dob"
                onChange={e => props.handleChange(e.target.value)}
                min="1900-01-01"
                max="2025-12-31"
                className="absolute inset-0 pointer-events-none opacity-0"
            />

            <div
                ref={pickerRef}
                className={`z-20 border border-customGray-100 rounded-md py-3 px-4 cursor-pointer ${props.currentDate !== '' ? 'text-customGray-900' : 'text-customGray-400'}`}
            >
                {props.currentDate || 'yyyy-mm-dd'}
            </div>

            <div className="absolute right-4 -z-10 top-1/2 -translate-y-1/2">
                <img src="/calendar.png" />
            </div>
        </div>
    )
}
