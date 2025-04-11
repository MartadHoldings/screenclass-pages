// This is the Overview component that will be rendered in the admin dashboard
// It will contain the Guardian data
// The Client component will contain the dynamic table, events and functions

import { Client } from "./Client";
import { getGuardians } from "@/queries/guardian";

export const Guardian = async () => {
  const response = await getGuardians();

  console.log(response);

  if ("data" in response) {
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
