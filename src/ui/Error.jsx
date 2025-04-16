import { useRouteError } from "react-router";
import LinkButton from "./LinkButton";

function NotFound() {
  const error = useRouteError();

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data}</p>
      <LinkButton to="-1">Go Back</LinkButton>
    </div>
  );
}

export default NotFound;
