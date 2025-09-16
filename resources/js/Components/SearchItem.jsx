import { LocationIcon } from "../utils/svgs";


export default function SearchItem() {


    return (
        <div className="flex px-4 py-3 items-center gap-4 w-full hover:bg-customGray-50/60 cursor-pointer duration-150">
            <div className="h-10 w-10 bg-cover bg-center" style={{backgroundImage: `url('/chess_pattern.png')`}}>
            </div>
            <div>
                <p className="text-[#191F33]">UI/UX Designer</p>
                <div className="flex items-center gap-1 text-customGray-600">
                    <LocationIcon className="text-customGray-300 w-4 "/>
                    Kabul
                </div>

            </div>
        </div>
    )
}
