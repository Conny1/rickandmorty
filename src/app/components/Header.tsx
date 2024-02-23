import React, { useState } from "react";
import { useAppdata } from "../state/state";

type Props = {
  setsearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  setselectedfilter: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const Header = ({
  search,
  setsearch,
  setselectedfilter,
  setCurrentPage,
}: Props) => {
  const [searchval, setsearchval] = useState("");

  const searchbyLocation = async () => {
    if (!searchval) return alert("Search item cannot be empty");
    setCurrentPage(1);
    setselectedfilter("locations");
    setsearch(searchval);
    setsearchval("");
  };

  const searchBycharactername = async () => {
    if (!searchval) return alert("Search item cannot be empty");
    setCurrentPage(1);
    setselectedfilter("searchchar");
    setsearch(searchval);
    setsearchval("");
  };

  return (
    <div className="w-full flex justify-center flex-col items-center ">
      <form className="flex-1 max-w-96 h-28 flex items-center ">
        <input
          value={searchval}
          onChange={(ev) => setsearchval(ev.target.value)}
          className="w-full rounded-lg h-10 p-3 "
          type="search"
          placeholder={`search by name or location`}
        />
      </form>
      <p className="uppercase">search by:</p>
      <div className=" flex gap-5  flex-wrap flex-col sm:flex-row ">
        {/* reset search results */}
        {search && (
          <button
            onClick={() => {
              setselectedfilter("locations");
              setsearch("");
            }}
            className="p-2 rounded-lg bg-blue-600 capitalize text-sm font-semibold"
          >
            reset
          </button>
        )}
        <button
          onClick={searchbyLocation}
          className="p-2 rounded-lg bg-blue-600 capitalize text-sm font-semibold"
        >
          Location name -{" "}
          <span className="text-xs text-red-300 font-bold">default</span>
        </button>

        <button
          onClick={searchBycharactername}
          className="p-2 rounded-lg bg-blue-600 capitalize text-sm font-semibold "
        >
          Character name
        </button>
      </div>
    </div>
  );
};

export default Header;
