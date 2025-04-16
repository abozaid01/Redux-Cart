import React from "react";
import { Link } from "react-router";

function Button({ children, disabled, to, type, onClick }) {
  const base =
    "text-sm inline-block bg-yellow-400 hover:bg-yellow-300 transition-colors duration-300 rounded-full font-semibold text-stone-800 focus:outline-none focus:ring focus:bg-yellow-300 focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed";

  const styles = {
    primary: base + " py-3 px-4 md:px-6 md:py-4 uppercase",
    small: base + " px-2.5 py-2 md:px-5 text-xs",
    round: base + " px-2 py-1 md:px-2.5 md:py-1.5 text-sm",
    secondary:
      "text-sm py-2.5 px-4 md:px-6 md:py-3.5 inline-block border-2 border-stone-300 hover:bg-stone-300 hover:text-stone-800 transition-colors duration-300 rounded-full font-semibold text-stone-400 focus:outline-none focus:ring focus:bg-stone-300 focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed",
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  return (
    <button onClick={onClick} disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
