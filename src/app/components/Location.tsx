import React from "react";
import Residents from "./Residents";

type Props = {
  name: string;
  type: string;
  residents: string[];
};
const Location = ({ name, type, residents }: Props) => {
  return (
    <div className="w-full mt-7 ">
      <h1 className="text-2xl font-bold uppercase ">
        <span className=" capitalize  font-normal ">location:</span> {name}
      </h1>
      <h2 className=" font-bold uppercase ">
        <span className=" capitalize font-normal "> type:</span> {type}
      </h2>
      {residents &&
        (residents.length === 0 ? (
          <p className="p-3 bg-gray-700 text-white">
            No residents on this location
          </p>
        ) : (
          <section className="flex gap-5 flex-wrap justify-between  ">
            {residents.map((item) => {
              return <Residents key={`${item}${Math.random()} `} url={item} />;
            })}
          </section>
        ))}
    </div>
  );
};

export default Location;
