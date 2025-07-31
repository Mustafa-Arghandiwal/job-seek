
export default function OpenPosition(props) {

    return (
        <div className=" relative border border-primary-50 hover:border-primary-500 flex flex-col min-w-[260px] max-w-[350px] min-h-[242px]  w-full justify-between gap-3 flex-wrap  p-8  rounded-xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)] hover:shadow-xl peer duration-150 snap-center">
            <div className="flex  gap-5">
                <div className="h-14 min-w-14 bg-cover bg-center rounded-sm" style={{ backgroundImage: `url(/chess_pattern.png)` }}></div>
                <div className="flex gap-1.5 flex-col w-32 sm:w-auto break-words">
                    <h4 title={"title"} className="text-[#191F33] font-medium  line-clamp-3  text-xl">Twitter</h4>
                    <div className="flex items-center gap-1.5 text-[#5E6670] text-sm "><img src="/map-pin.png" className="h-5" />Mozambique</div>
                </div>
            </div>

                <p title={props.title} className="text-customGray-900 line-clamp-2 font-medium text-xl mt-4">{props.title}</p>
                <div className="flex flex-wrap items-center gap-2">
                    <p className="text-customGray-600 text-sm">Full Time</p>
                    {/* Don't show if not available */}
                    <div className="text-customGray-600">&bull;</div>

                    <p className="text-customGray-600 text-sm">$10K-$15K</p>
                </div>

        </div>
    )

}
