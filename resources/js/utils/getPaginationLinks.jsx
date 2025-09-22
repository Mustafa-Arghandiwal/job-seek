import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../Components/Pagination"

export default function PaginationLinks({ paginator, showIfItemsMoreThan }) {

    const activeLink = paginator.links.find(link => link.active)
    const activeLabel = activeLink ? Number(activeLink.label) : 1
    const lastLabel = Number(paginator.last_page)
    const paginationLinks = paginator.links.map((link, index) => {
        if (isNaN(link.label)) return
        const currLabel = Number(link.label)
        let show = false
        if (lastLabel <= 5) {
            show = true
        } else if (currLabel === activeLabel) {
            show = true
        } else if (activeLabel <= 2) {
            show = currLabel <= 5
        } else if (activeLabel >= lastLabel - 1) {
            show = currLabel >= lastLabel - 4
        } else {
            show = currLabel >= (activeLabel - 2) && currLabel <= (activeLabel + 2)
        }
        if (!show) return
        return (
            <PaginationItem key={index}>
                <PaginationLink href={link.url} isActive={link.active}>{link.label}</PaginationLink>
            </PaginationItem>
        )
    })

    return (

        <>
            {paginator.total > paginator.data.length &&
                <Pagination className=" mt-10">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href={paginator.prev_page_url} />
                        </PaginationItem>

                        {(paginator.last_page > 5 && paginator.current_page > 3) &&
                            < PaginationItem >
                                <PaginationEllipsis />
                            </PaginationItem>
                        }

                        {paginationLinks}

                        {(paginator.last_page > 5 && (paginator.current_page <= (paginator.last_page - 3))) &&
                            < PaginationItem >
                                <PaginationEllipsis />
                            </PaginationItem>
                        }

                        <PaginationItem>
                            <PaginationNext href={paginator.next_page_url} />
                        </PaginationItem>

                    </PaginationContent>
                </Pagination>
            }
        </>
    )


}
