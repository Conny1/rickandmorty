"use client";
import React, { useEffect, useState } from "react";
import { Episodes } from "../state/types";

const Episodes = ({ url }: { url: string }) => {
  const [episodes, setepisodes] = useState<Episodes | undefined>(undefined);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const respdata = await fetch(url);
        const resp = await respdata.json();

        if (resp) {
          // console.log(resp.results);
          setepisodes(resp);
        }
      } catch (error) {}
    };

    fetchData();
  }, []);

  return (
    <div className=" flex-1 max-w-96  min-w-40 outline outline-1 outline-gray-800 p-2 rounded-lg max-h-56 ">
      <p className="text-center font-semibold ">
        <span>{episodes?.episode}</span>
      </p>
      <p>
        Name: <span>{episodes?.name}</span>
      </p>
      <p>
        Aired: <span>{episodes?.air_date}</span>{" "}
      </p>
    </div>
  );
};

export default Episodes;
