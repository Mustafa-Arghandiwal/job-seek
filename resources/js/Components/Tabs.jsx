import { Children, useState } from "react"


export default function Tabs(props) {
    const [activeIndex, setActiveIndex] = useState(0)
    const tabsArr = Children.toArray(props.children)


    return (
        <>
            <div className="flex border-b border-b-customGray-100 mt-4 overflow-x-auto md:overflow-visible scroll-smooth snap-x snap-mandatory [scrollbar-width:none] ">
                {tabsArr.map((tab, index) => (
                    <button key={index} onClick={() => setActiveIndex(index)} role="tab" aria-selected={index === activeIndex}
                        className={`${activeIndex === index ? "after:w-full text-primary-500 " : "after:w-0"} relative text-nowrap text-customGray-500 flex items-center gap-0.5 cursor-pointer text-sm hover:bg-customGray-50/50
                     snap-center rounded-sm px-[20px] py-[14px] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded-2xl after:h-0.5  after:duration-200 after:bg-primary-500`}>
                        {tab.props.icon}
                        {tab.props.title}
                    </button>

                ))}
            </div>

            <div className="mt-12   " role="tabpanel">
                {/* {tabsArr[activeIndex]} */}
                {tabsArr.map((tab, index) => (
                    <div key={index} className={index === activeIndex ? 'block' : 'hidden'}
                    >
                        {tab}
                    </div>
                ))}
            </div>
        </>

    )
}
