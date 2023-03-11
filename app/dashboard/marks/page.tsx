import GetMarks from "@/libs/components/GetMarks";
import React from 'react'
import PostMarks from "@/libs/components/PostMarks";
function page() {
    return (
        <div>
            <GetMarks />
            <PostMarks />
        </div>
    )
}

export default page