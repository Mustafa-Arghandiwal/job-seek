import { closestCorners, DndContext, DragOverlay, PointerSensor, pointerWithin, rectIntersection, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import DashboardApplication from "../../../Components/DashboardApplication";
import EmployerDashboardLayout from "../../../Layouts/EmployerDashboardLayout";
import EmployerLayout from "../../../Layouts/EmployerLayout";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import ColumnContainer from "../../../Components/ColumnContainer";
import { RiDragDropFill } from "react-icons/ri";
import { createPortal } from "react-dom";
import { router, useForm } from "@inertiajs/react";

function Applications({ jobTitle, applicationDetails, vacancyId }) {

    const [columns, setColumns] = useState([{ id: "all", title: "All Applications" }, { id: "shortlisted", title: "Shortlisted" }])

    const [apps, setApps] = useState(applicationDetails)

    const [activeApp, setActiveApp] = useState(null)

    useEffect(() => {
        return () => {
            const shortlistedIDs = apps.filter(app => app.column_id === "shortlisted").map(app => app.id)
            // if (shortlistedIDs.length > 0) {
                router.post('/employer/vacancies/applications/updateShortlistStatus', { shortlistedIDs })
            // }
        }
    }, [apps])



    const onDragStart = (event) => {

        // document.body.style.cursor = "grabbing"

        const data = event.active.data.current
        if (data?.type === "Application") {
            setActiveApp({ id: event.active.id, details: data.details })
            return
        }

    }

    const onDragOver = (event) => {
        const { active, over } = event
        if (!over) return
        if (active.id === over.id) return

        const isActiveAnApplication = active.data.current?.type === "Application"
        const isOverAnApplication = over.data.current?.type === "Application"

        if (!isActiveAnApplication) return

        if (isActiveAnApplication && isOverAnApplication) {
            setApps(apps => {
                const activeIndex = apps.findIndex(app => app.app_id === active.id)
                const overIndex = apps.findIndex(app => app.app_id === over.id)

                if (apps[activeIndex].column_id !== apps[overIndex].column_id) {
                    apps[activeIndex].column_id = apps[overIndex].column_id

                }

                return arrayMove(apps, activeIndex, overIndex)
            })
        }

        const isOverAColumn = over.data.current?.type === "Column"
        if (isActiveAnApplication && isOverAColumn) {

            setApps(apps => {
                const activeIndex = apps.findIndex(app => app.app_id === active.id)
                apps[activeIndex].column_id = over.id

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

            <DndContext onDragOver={onDragOver} onDragStart={onDragStart}  sensors={sensors} collisionDetection={pointerWithin}>

                <div className="flex xs:grid xs:grid-cols-[1fr_1fr] gap-6 mt-3">
                    <SortableContext items={["all", "shortlisted"]}>
                        {columns.map(col => (
                            <ColumnContainer key={col.id} id={col.id} title={col.title}
                                applications={apps.filter(app => app.column_id === col.id)} vacancyId={vacancyId}
                            />
                        ))}
                    </SortableContext>
                </div>


                {createPortal(
                    <DragOverlay>
                        {activeApp && (
                            <DashboardApplication key={activeApp.id} id={activeApp.id}
                                columnId={activeApp.details.column_id} appDetails={activeApp.details} />
                        )}

                    </DragOverlay>, document.body
                )}

                {/* <DashboardApplication key={activeApp.id} id={activeApp.id} name={activeApp.full_name} title={activeApp.title} /> */}
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
