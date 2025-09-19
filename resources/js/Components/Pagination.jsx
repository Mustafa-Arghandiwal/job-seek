import * as React from "react"
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    MoreHorizontalIcon,
} from "lucide-react"

import {Link} from "@inertiajs/react"
import { cn } from "../utils/cn"
// import { Button, buttonVariants } from "@/components/ui/button"

function Pagination({ className, ...props }) {
    return (
        <nav
            role="navigation"
            aria-label="pagination"
            data-slot="pagination"
            className={cn("mx-auto flex w-full justify-center", className)}
            {...props}
        />
    )
}

function PaginationContent({
    className,
    ...props
}) {
    return (
        <ul
            data-slot="pagination-content"
            className={cn("flex flex-row items-center gap-1", className)}
            {...props}
        />
    )
}

function PaginationItem({ ...props }) {
    return <li data-slot="pagination-item" {...props} />
}


function PaginationLink({
    href,
    children,
    className,
    isActive,
    size = "icon",
    ...props
}) {
    console.log(isActive)
    return (
        <Link
            href={href}
            aria-current={isActive ? "page" : undefined}
            data-slot="pagination-link"
            data-active={isActive}
            className={cn(
                "inline-flex items-center justify-center rounded-md px-3 py-1 text-sm font-medium duration-300 transition-all text-customGray-900",
                isActive
                    ? "ring ring-primary-600 bg-primary-400 text-white"
                    : "hover:bg-customGray-50",
                className
            )}
            {...props}
        >
            {children}
        </Link>
    )
}

function PaginationPrevious({
    className,
    ...props
}) {
    return (
        <PaginationLink
            aria-label="Go to previous page"
            size="default"
            className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
            {...props}
        >
            <ChevronLeftIcon className="text-customGray-900" />
            <span className="hidden sm:block">Previous</span>
        </PaginationLink>
    )
}

function PaginationNext({
    className,
    ...props
}) {
    return (
        <PaginationLink
            aria-label="Go to next page"
            size="default"
            className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
            {...props}
        >
            <span className="hidden sm:block">Next</span>
            <ChevronRightIcon className="text-customGray-900" />
        </PaginationLink>
    )
}

function PaginationEllipsis({
    className,
    ...props
}) {
    return (
        <span
            aria-hidden
            data-slot="pagination-ellipsis"
            className={cn("flex size-9 items-center text-customGray-900 justify-center", className)}
            {...props}
        >
            <MoreHorizontalIcon className="size-4" />
            <span className="sr-only">More pages</span>
        </span>
    )
}

export {
    Pagination,
    PaginationContent,
    PaginationLink,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
}
