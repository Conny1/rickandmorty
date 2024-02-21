import React, { useEffect, useState } from "react";
import { ResidentsType, STATUSENUMS } from "../state/types";
import Link from "next/link";

const Residents = ({ url }: { url: string }) => {
  const [resident, setresident] = useState<ResidentsType | undefined>(
    undefined
  );
  useEffect(() => {
    const fetchResident = async () => {
      try {
        const respdata = await fetch(url);
        const resp = await respdata.json();

        console.log(resp);
        setresident(resp);
      } catch (error) {}
    };
    fetchResident();
  }, []);
  return (
    <Link href={`resident/${resident?.id}`}>
      <div className=" flex-1 max-w-56  min-w-40 ">
        <div className="w-ful">
          <img
            className="w-full h-full object-contain  "
            src={resident?.image}
            alt="Residentavator"
            loading="lazy"
          />
        </div>
        <div>
          <p>{resident?.name}</p>
          {STATUSENUMS.ALIVE === resident?.status && (
            <p className="bg-green-300 rounded p-1">{resident?.status}</p>
          )}
          {STATUSENUMS.DEAD === resident?.status && (
            <p className="bg-red-300 rounded p-1">{resident?.status}</p>
          )}
          {STATUSENUMS.UNKNOWN === resident?.status && (
            <p className="bg-slate-300 rounded p-1">{resident?.status}</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Residents;
