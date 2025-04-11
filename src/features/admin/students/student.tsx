// This is the Overview component that will be rendered in the admin dashboard
// It will contain the Client component
// The Client component will contain the stats cards and the dynamic table

import { getStudents } from "@/queries/students";
import { Client } from "./Client";

export const Student = async () => {
  const response = await getStudents(1, 0);

  console.log(response);

  if ("data" in response) {
    return (
      <>
        <h2 className="text-[1.3rem] font-semibold">All Students</h2>

        <Client studentsData={response.data} />
      </>
    );
  } else {
    // handle the error case
    return <div>Error loading students table</div>;
  }
};
