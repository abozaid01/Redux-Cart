import { Link, useNavigate } from "react-router";

function LinkButton({ children, to }) {
  const navigate = useNavigate();

  const style = "text-sm text-blue-500 hover:text-blue-600 hover:underline";

  if (to === "-1")
    return (
      <button className={style} onClick={() => navigate(-1)}>
        &larr; Go back
      </button>
    );

  return (
    <Link className={style} to={to}>
      {children}
    </Link>
  );
}

export default LinkButton;
