import React from "react";
import Client from "./client";
import { getClassSubjects } from "@/queries/subjects";

export const Subjects = async () => {
  const response = await getClassSubjects();

  console.log(response);

  if ("data" in response) {
    return (
      <>
        <h2 className="text-[1.3rem] font-semibold">
          {" "}
          All Classes and their Subjects
        </h2>

        <Client subjectsData={response.data} />
      </>
    );
  } else {
    // handle the error case
    return <div>Error loading classes and subjects table</div>;
  }
};
