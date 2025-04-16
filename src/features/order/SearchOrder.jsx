import React, { useState } from "react";
import { useNavigate } from "react-router";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) return;

    navigate(`/order/${query}`);
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search Order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-yellow-100 w-36 sm:w-64 text-xs sm:text-sm placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500/50 rounded-full py-2 px-4 sm:focus:w-72 transition-all duration-300"
      />
    </form>
  );
}

export default SearchOrder;
