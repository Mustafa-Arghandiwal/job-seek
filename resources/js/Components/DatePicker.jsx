import { useEffect, useRef, useState } from "react"
import {CalendarIcon} from '../utils/svgs'




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



    function getFormattedDate(type) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');

        if (type === 'month') {
            return `${yyyy}-${mm}`;
        } else if (type === 'day') {
            const dd = String(today.getDate()).padStart(2, '0');
            return `${yyyy}-${mm}-${dd}`;
        }
    }

    let min
    let max
    if (props.type === 'date') {
        if (props.dateRange === 'past') {
            min = '1900-01-01';
            max = getFormattedDate('day')
        } else if (props.dateRange === 'future') {
            min = getFormattedDate('day');
            max = undefined //being a bit explicit here to avoid confusion
        }
    } else if (props.type === 'month') {
        if (props.dateRange === 'past') {
            min = '1900-01';
            max = getFormattedDate('month')
        } else if (props.dateRange === 'future') {
            min = getFormattedDate('month');
            max = undefined
        }
    }




    return (
        <div className="relative">
            <input
                ref={inputRef}
                type={props.type}
                id="date"
                onChange={e => props.handleChange(e.target.value)}
                min={min}
                max={max}
                className="absolute inset-0 pointer-events-none opacity-0"
            />

            <div
                ref={pickerRef}
                className={`z-20 mt-2 border border-customGray-100  rounded-md py-[11px] px-4 cursor-pointer ${props.currentDate !== '' ? 'text-customGray-900' : 'text-customGray-400'}`}
            >
                {props.currentDate || (props.type === 'date' && 'yyyy-mm-dd' || 'yyyy-mm')}
            </div>

            <div className="absolute right-4 -z-10 top-[55%] -translate-y-1/2">
                <CalendarIcon className="text-customGray-600"/>
            </div>
        </div>
    )
}
