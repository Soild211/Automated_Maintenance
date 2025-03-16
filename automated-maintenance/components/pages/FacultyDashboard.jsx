import React from 'react'
import Link from "next/link";
//imporve css for this page
const FacultyDashboard = () => {
    return (
        <>
            <div className="h-screen w-screen">
                <div className="flex items-center justify-center">
                    <h1 className="text-4xl text-wrap font-bold"> Faculty Dashboard </h1>
                </div>

                <div className="flex p-5  justify-center items-center w-screen h-fit">
                    <Link href="/raise-request">
                        <div className="h-28 md:h-64 w-28 md:w-64 m-5 border rounded bg-green-300 flex justify-center items-center">
                            <div>New Issue</div>
                        </div>
                    </Link>
                    <Link href="/previousIssues">
                        <div className="h-28 md:h-64 w-28 md:w-64 m-5 border rounded bg-green-300 flex justify-center items-center">
                            <div>Previous Issues</div>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default FacultyDashboard
