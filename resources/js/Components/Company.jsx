

export default function Company(props) {

    return (
        <div className="flex flex-col justify-around sm:justify-normal gap-8 border h-[215px] sm:h-auto border-customGray-50 rounded-xl p-6 sm:p-8 max-w-[300px] sm:min-w-[290px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] hover:shadow-xl duration-150 snap-center">
            <div className="flex gap-4">
                <div
                    className="h-16 min-w-16 bg-cover bg-center"
                    style={{ backgroundImage: `url(${props.companyLogo})` }}>
                </div>
                <div className="flex flex-col gap-1.5">
                    <div className="flex justify-center items-center gap-2">
                        <h4 className="text-[#191F33] font-medium text-base sm:text-lg">{props.companyName}</h4>
                        {props.companyFeatured && <span className="px-2 grid items-center text-xs sm:text-sm bg-danger-50 text-danger-500 rounded-[52px] cursor-default">Featured</span>}
                    </div>
                    <div className="flex items-center gap-1 text-[#5E6670] text-sm "><img src="map-pin.png" className="h-4" />{props.companyLocation}</div>
                </div>
            </div>

            <button className="rounded-sm text-sm sm:text-base font-semibold text-primary-500 hover:text-white bg-primary-50 hover:bg-primary-500 px-11 sm:px-[70px] py-3 duration-150 text-nowrap cursor-pointer   ">Open Positions</button>
        </div>
    )
}