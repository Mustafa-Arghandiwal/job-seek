import { Link } from "@inertiajs/react";
import { RightArrowIcon } from "../utils/svgs";



export default function FooterLink({children, href}) {

    return (


        <li className="flex items-center   overflow-hidden gap-0.5 group ">
            <RightArrowIcon className="w-0 group-hover:w-5 -translate-x-8 group-hover:block group-hover:translate-x-0 duration-200" />
            <Link href={href}>{children}</Link>
        </li>
    )
}
