import { getActivities, getCharts, getStats } from "@/queries/overview";
import OverviewClient from "./client";
import { getStudents } from "@/queries/students";

// This is the Overview component that will be rendered in the admin dashboard
// It will contain the Client component
// The Client component will contain the stats cards and the dynamic table

export const Overview = async () => {
  const [statsResponse, studentsResponse, chartsResponse, activitiesResponse] =
    await Promise.all([
      getStats(),
      getStudents(1, 10), //the number passed is a limit ang page to numbers of students fetched, 10 for overview page
      getCharts(),
      getActivities(),
    ]);

  if (
    "data" in statsResponse &&
    "data" in studentsResponse &&
    "data" in chartsResponse &&
    "data" in activitiesResponse
  ) {
    return (
      <>
        <OverviewClient
          statsData={statsResponse?.data}
          studentsData={studentsResponse?.data}
          chartsData={chartsResponse?.data}
          activitesData={activitiesResponse?.data}
        />
      </>
    );
  } else {
    return <div>Error loading data</div>;
  }
};
