import { closestCorners, DndContext, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useMemo, useState } from "react";
import DashboardApplication from "../../../Components/DashboardApplication";
import EmployerDashboardLayout from "../../../Layouts/EmployerDashboardLayout";
import EmployerLayout from "../../../Layouts/EmployerLayout";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import ColumnContainer from "../../../Components/ColumnContainer";
import { RiDragDropFill } from "react-icons/ri";

function Applications({ jobTitle }) {

    const [columns, setColumns] = useState([{ id: "A", title: "All Applications" }, { id: "B", title: "Shortlisted" }])

    const [apps, setApps] = useState([
        { id: 1, columnId: "A", name: 'Eqbal Sharaf', title: 'IT Technician (CCNP)' },
        { id: 2, columnId: "A", name: 'Ahmad Ahmadi', title: 'IT Professional' },
        { id: 3, columnId: "A", name: 'Mark Twain', title: 'Writer' },
        { id: 4, columnId: "A", name: 'Mustafa Arghandiwal', title: 'Plumber' },
        //This is for that weird behavior, when there is nothing in column B, should drag a lot to the right. Will hide this in UI.
        { id: 1000000, columnId: "B", name: '', title: '' },
        { id: 1000001, columnId: "A", name: '', title: '' },
    ])


    // const onDragEnd = (event) => {
    //     const { active, over } = event
    //     if (!over) return;

    //     if (active.id !== over.id) {
    //         if (active.data.current.sortable.containerId !== over.data.current.sortable.containerId) {
    //             return
    //         }
    //         if (active.data.current.sortable.containerId === "all-apps") {
    //             setApps(apps => {
    //                 const oldIndex = apps.findIndex(app => app.id === active.id)
    //                 const newIndex = apps.findIndex(app => app.id === over.id)
    //                 return arrayMove(apps, oldIndex, newIndex)

    //             })
    //         } else if (active.data.current.sortable.containerId === "shortlisted") {
    //             setShortlisted(shortlisted => {
    //                 const oldIndex = shortlisted.findIndex(sh => sh.id === active.id)
    //                 const newIndex = shortlisted.findIndex(sh => sh.id === over.id)
    //                 return arrayMove(shortlisted, oldIndex, newIndex)

    //             })

    //         }
    //     }
    // }

    const onDragOver = (event) => {
        const { active, over } = event
        if (!over) return
        if (active.id === over.id) return

        const isActiveAnApplication = active.data.current?.type === "Application"
        const isOverAnApplication = over.data.current?.type === "Application"

        if (!isActiveAnApplication) return

        //Dropping task over another task
        if (isActiveAnApplication && isOverAnApplication) {
            setApps(apps => {
                const activeIndex = apps.findIndex(app => app.id === active.id)
                const overIndex = apps.findIndex(app => app.id === over.id)

                if (apps[activeIndex].columnId !== apps[overIndex].columnId) {
                    apps[activeIndex].columnId = apps[overIndex].columnId

                }

                return arrayMove(apps, activeIndex, overIndex)
            })
        }

        const isOverAColumn = over.data.current?.type === "Column"
        if (isActiveAnApplication && isOverAColumn) {
            console.log('over')
            setApps(apps => {
                const activeIndex = apps.findIndex(app => app.id === active.id)

                apps[activeIndex].columnId = over.id

                return arrayMove(apps, activeIndex, activeIndex)
            })

        }


    }

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3,
            }
        }),
        useSensor(TouchSensor)
    )
    return (

        <div className="">
            <h1 className="font-medium text-xl text-customGray-900">
                Applications for <span className="italic">{jobTitle}</span>
            </h1>
            <div className="sm:flex gap-1 items-center mt-6 text-customGray-700">
            <p>Drag applications to shortlist them</p>
                <RiDragDropFill className="w-8 h-8 " />
            </div>

            <DndContext onDragOver={onDragOver} sensors={sensors} collisionDetection={closestCorners}>

                <div className="flex gap-2  xs:grid xs:grid-cols-[1fr_1fr] xs:gap-6 mt-3">
                    <SortableContext items={["A", "B"]}>
                        {columns.map(col => (
                            <ColumnContainer key={col.id} id={col.id} title={col.title}
                                applications={apps.filter(app => app.columnId === col.id)}
                            />
                        ))}
                    </SortableContext>
                </div>
            </DndContext >

        </div >

    );
}

Applications.layout = (page) => (
    <EmployerLayout>
        <EmployerDashboardLayout children={page} />
    </EmployerLayout>
);

export default Applications;
