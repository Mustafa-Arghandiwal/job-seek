

export default function Category(props) {
    return (
        <div className=" min-w-[180px] drop-shadow-lg cursor-pointer border border-transparent hover:border-primary-300 transition-all duration-100  rounded-xl grid place-items-center gap-6  py-8 bg-customGray-50 snap-center">
            <img src={props.icon} className="h-[72px] w-[72px]" />
            <div className="flex flex-col gap-1.5 w-full items-center px-2">
                <span className="text-[18191c] text-xl sm:text-2xl text-center">{props.name}</span>
                <span className="text-customGray-500 text-sm sm:text-base">{props.openCount} open positions</span>
            </div>
        </div>
    )
}