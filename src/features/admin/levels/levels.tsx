import React from "react";
import Client from "./client";
import { getLevels } from "@/queries/levels";

export const Levels = async () => {
  const response = await getLevels();

  console.log(response);

  if ("data" in response) {
    return (
      <>
        <h2 className="text-[1.3rem] font-semibold">All Levels</h2>

        <Client levelsData={response.data} />
      </>
    );
  } else {
    // handle the error case
    return <div>Error loading levels table</div>;
  }
};
