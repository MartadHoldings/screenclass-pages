import { getStats } from "@/queries/app-function";
import Client from "./client";
// import { useEffect } from "react";

// This is the Overview component that will be rendered in the admin dashboard
// It will contain the Client component
// The Client component will contain the stats cards and the dynamic table

export const Overview = async () => {
  const response = await getStats();

  if ("data" in response) {
    return (
      <>
        <Client statsData={response.data} />
      </>
    );
  } else {
    // handle the error case
    return <div>Error loading stats</div>;
  }
};
