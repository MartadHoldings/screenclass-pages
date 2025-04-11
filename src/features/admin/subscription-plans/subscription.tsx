import { getSubscriptionPlans } from "@/queries/subscription";
import Client from "./client";

export const Subscriptions = async () => {
  const response = await getSubscriptionPlans();

  if ("data" in response) {
    return (
      <>
        <h2 className="text-[1.3rem] font-semibold">All Subscription Plans</h2>

        <Client subscriptionData={response.data} />
      </>
    );
  } else {
    // handle the error case
    return <div>Error loading plans</div>;
  }
};
