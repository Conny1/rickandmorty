import React, { useEffect, useState } from "react";
import { ResidentsType, STATUSENUMS } from "../state/types";
import Link from "next/link";
import Image from "next/image";

const Residents = ({ url }: { url: string }) => {
  const [resident, setresident] = useState<ResidentsType | undefined>(
    undefined
  );
  useEffect(() => {
    const fetchResident = async () => {
      try {
        const respdata = await fetch(url);
        const resp = await respdata.json();

        setresident(resp);
      } catch (error) {}
    };
    fetchResident();
  }, []);
  return (
    <Link
      href={`resident/${resident?.id}`}
      className="flex-1   sm:max-w-56  min-w-40 "
    >
      <div className="">
        <div className="w-ful">
          {resident?.image ? (
            <Image
              width={500}
              height={600}
              className="w-full h-full object-contain  "
              src={resident?.image}
              alt="Residentavator"
              loading="lazy"
              placeholder="blur"
              blurDataURL="/images/lazy.avif"
              quality={75}
            />
          ) : (
            <div className="w-full h-full bg-black "></div>
          )}
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
