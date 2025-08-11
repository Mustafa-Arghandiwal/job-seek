import { closestCorners, DndContext, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useMemo, useState } from "react";
import DashboardApplication from "../../../Components/DashboardApplication";
import EmployerDashboardLayout from "../../../Layouts/EmployerDashboardLayout";
import EmployerLayout from "../../../Layouts/EmployerLayout";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

function Applications({ jobTitle }) {

    const [apps, setApps] = useState([
        { id: 1, name: 'Eqbal Sharaf', title: 'IT Technician (CCNP)' },
        { id: 2, name: 'Ahmad Ahmadi', title: 'IT Professional' },
        { id: 3, name: 'Mark Twain', title: 'Writer' },
    ])
    const appIDs = useMemo(() => apps.map(app => app.id), [apps])

    const [shortlisted, setShortlisted] = useState([
        { id: 11, name: 'Ahmad Ahmadi', title: 'IT Professional' },
        { id: 12, name: 'Mark Twain', title: 'Writer' },
    ])
    const shortlistedIDs = useMemo(() => shortlisted.map(sh => sh.id), [shortlisted])

    const onDragEnd = (event) => {
        const { active, over } = event
        // console.log(event.active.data.current.sortable)
        // console.log(event.over.data.current.sortable)
        console.log(event)
        if (!over) return;

        if (active.id !== over.id) {
            if (active.data.current.sortable.containerId !== over.data.current.sortable.containerId) {
                console.log('hi')
                return
            }
            if (active.data.current.sortable.containerId === "all-apps") {
                setApps(apps => {
                    const oldIndex = apps.findIndex(app => app.id === active.id)
                    const newIndex = apps.findIndex(app => app.id === over.id)
                    return arrayMove(apps, oldIndex, newIndex)

                })
            } else if (active.data.current.sortable.containerId === "shortlisted") {
                setShortlisted(shortlisted => {
                    const oldIndex = shortlisted.findIndex(sh => sh.id === active.id)
                    const newIndex = shortlisted.findIndex(sh => sh.id === over.id)
                    return arrayMove(shortlisted, oldIndex, newIndex)

                })

            }
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

        <div className="border overflow-x-hidden">
            <h1 className="font-medium text-xl text-customGray-900">
                Applications for <span className="italic">{jobTitle}</span>
            </h1>

            <DndContext onDragEnd={onDragEnd} sensors={sensors} collisionDetection={closestCorners}>
                <div className="flex gap-6 mt-6 ">
                    {/* All Applications */}
                    <div className="rounded-md bg-customGray-100 px-5 py-4 min-w-[312px] max-w-[880px] touch-none">
                        <h3 className="text-customGray-900 text-sm">
                            All Applications (xxx)
                        </h3>
                        <SortableContext id="all-apps" items={appIDs}>
                            {apps.map(app => (
                                <DashboardApplication key={app.id} id={app.id} name={app.name} title={app.title} />
                            ))}
                        </SortableContext>
                    </div>


                    {/* Shortlisted */}

                    <div className="rounded-md bg-customGray-100 px-5 py-4 w-[312px] touch-none">
                        <h3 className="text-customGray-900 text-sm">
                            Shortlisted (xx)
                        </h3>
                        <SortableContext id="shortlisted" items={shortlistedIDs}>
                            {shortlisted.map(sh => (
                                <DashboardApplication key={sh.id} id={sh.id} name={sh.name} title={sh.title} />
                            ))}
                        </SortableContext>
                    </div>
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
