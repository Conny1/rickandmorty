import React from "react";

const Header = () => {
  return (
    <div className="w-full flex justify-center ">
      <form className="flex-1 max-w-96 h-28 flex items-center ">
        <input
          className="w-full rounded-lg h-10 p-3 "
          type="search"
          placeholder="search"
        />
      </form>
    </div>
  );
};

export default Header;
