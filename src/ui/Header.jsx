import React from "react";
import { Link } from "react-router";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

function Header() {
  return (
    <header className="flex justify-between border-b border-stone-200 bg-yellow-400 px-4 py-3 sm:px-6">
      <Link className="uppercase tracking-widest" to={"/"}>
        Fast Recat Pizza Co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
