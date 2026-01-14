// This is the Overview component that will be rendered in the admin dashboard
// It will contain the Guardian data
// The Client component will contain the dynamic table, events and functions

import { Client } from "./Client";
import { getGuardians } from "@/queries/guardian";

interface GuardianPageProps {
  searchParams: {
    page?: string;
    limit?: string;
  };
}

export const Guardian = async ({ searchParams }: GuardianPageProps) => {
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 10;

  const response = await getGuardians(page, limit);

  console.log(response);

  if ("data" in response && response.data) {
    return (
      <>
        <Client guardianData={response.data} />
      </>
    );
  } else {
    // handle the error case
    return <div>Error loading Guardian table</div>;
  }
};
