import GetMarks from "@/libs/components/GetMarks";
import React from 'react'
import PostMarks from "@/libs/components/PostMarks";
import FilterComponents from "@/libs/components/FilterComponents";
function page() {
    return (
        <div>
            <GetMarks />
            <PostMarks />
            {/* FilterComponents are only under testing */}
        </div>
    )
}
export default page
