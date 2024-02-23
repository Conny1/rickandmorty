import Episodes from "@/app/components/Episodes";
import NotesForm from "@/app/components/NotesForm";
import ResidenNotes from "@/app/components/ResidenNotes";
import { ResidentsType, STATUSENUMS } from "@/app/state/types";
import Link from "next/link";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const EachResident = async ({ params }: Props) => {
  //   console.log(params);
  const fetchData = async () => {
    try {
      const respdata = await fetch(
        `https://rickandmortyapi.com/api/character/${params.id}`
      );
      const resp = await respdata.json();

      if (resp) {
        // console.log(resp.results);
        return resp;
      }
      return undefined;
    } catch (error) {}
  };

  const resident: ResidentsType = await fetchData();

  return (
    <div className="flex items-center justify-center flex-col gap-4  ">
      <Link className="p-3 hover:text-blue-400 hover:underline" href="/">
        Home
      </Link>
      <div className=" flex-col  items-center w-full max-w-5xl  p-3 ">
        <div className=" flex-1 w-full flex flex-col sm:flex-row justify-between   gap-3">
          <div className="sm:w-2/5 w-full  flex flex-wrap justify-between items-center sm:items-start ">
            <img
              className="w-fit sm:h-56 h-48  object-contain rounded-full  "
              src={resident?.image}
              alt="Residentavator"
              loading="lazy"
            />
            <div>
              {/* notes */}
              <ResidenNotes />
              {/* add notes form */}
              <NotesForm residentid={resident.id} />
            </div>
          </div>
          <div className="flex-1">
            <p className="uppercase">
              <span className="capitalize">name:</span> {resident?.name}
            </p>
            <p className="uppercase">
              {" "}
              <span className="capitalize">location:</span>{" "}
              {resident.location.name}
            </p>
            {STATUSENUMS.ALIVE === resident?.status && (
              <p className="bg-green-300 rounded p-1 capitalize ">
                {" "}
                <span className="capitalize">status:</span> {resident?.status}
              </p>
            )}
            {STATUSENUMS.DEAD === resident?.status && (
              <p className="bg-red-300 rounded p-1 capitalize ">
                {" "}
                <span className="capitalize">status:</span> {resident?.status}
              </p>
            )}
            {STATUSENUMS.UNKNOWN === resident?.status && (
              <p className="bg-slate-300 rounded p-1 capitalize ">
                {" "}
                <span className="capitalize">status:</span> {resident?.status}
              </p>
            )}

            <p className="uppercase">
              {" "}
              <span className="capitalize">gender:</span> {resident.gender}
            </p>

            <p className="uppercase">
              {" "}
              <span className="capitalize">species:</span> {resident.species}
            </p>
            <p className="text-center font-bold mb-2 ">Episodes</p>
            <section className="flex flex-wrap gap-3 justify-between overflow-scroll h-96 p-3">
              {resident.episode.map((item, i) => {
                return <Episodes key={i} url={item} />;
              })}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EachResident;
