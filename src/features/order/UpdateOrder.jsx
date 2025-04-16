import React from "react";
import Button from "../../ui/Button";
import { useFetcher } from "react-router";
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrder() {
  // eslint-disable-next-line no-unused-vars
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

export async function action({ request, params }) {
  const orderId = params.id;
  const data = { priority: true };
  await updateOrder(orderId, data);
  return null;
}

export default UpdateOrder;
