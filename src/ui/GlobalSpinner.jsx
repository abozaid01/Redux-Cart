import React from "react";

function GlobalSpinner() {
  return (
    <div className="absolute bg-slate-200/20 backdrop-blur-xs flex items-center justify-center inset-0 z-10">
      <div className="loader"></div>
    </div>
  );
}

export default GlobalSpinner;
