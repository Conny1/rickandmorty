"use client";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Location from "./components/Location";
import { useAppdata } from "./state/state";
import { LocationType } from "./state/types";

export default function Home() {
  const { locations, setlocations } = useAppdata();
  const [loading, setloading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setpages] = useState(1);
  const [search, setsearch] = useState("");
  const [selectedfilter, setselectedfilter] = useState("locations");
  useEffect(() => {
    const fetchLocations = async () => {
      setloading(true);
      try {
        // await fetch(`./api/search?name=${searchval}`);
        const respdata = await fetch(
          `./api/${
            selectedfilter === "locations" ? "locations" : "searchchar"
          }?page=${currentPage}&name=${search}`
        );
        const resp = await respdata.json();
        setloading(false);
        if (resp.status === 404) {
          return alert("No Data found");
        }
        if (resp.status === 200) {
          const { info, results } = resp.results;

          if (!results) {
            return alert("No Data found");
          }

          // Group search by character results by location
          if (selectedfilter === "searchchar") {
            const locationNames: string[] = [];
            // remove duplicate locations
            for (let i = 0; i < results.length; i++) {
              if (!locationNames.includes(results[i].name)) {
                locationNames.push(results[i].name);
              }
            }
            // group based on location removing duplicates
            const groupbyloc: LocationType[] = locationNames.map((item) => {
              let type = "";
              let residents = [];
              let url = "";
              let id = 0;
              for (let i = 0; i < results.length; i++) {
                if (item === results[i].name) {
                  type = results[i].type;
                  residents.push(results[i].residents[0]);
                  id = results[i].id;
                  url = results[i].url;
                }
              }

              return {
                name: item,
                type,
                residents,
                id,
                url,
              };
            });

            setlocations(groupbyloc);
          } else {
            setlocations(results);
          }

          setpages(info.pages);

          // console.log(info);
          // console.log(resp.results);
        }
      } catch (error) {
        console.log(error);
        setloading(false);
      }
    };

    fetchLocations();
  }, [currentPage, search]);

  const headerProps = { setselectedfilter, setsearch, search, setCurrentPage };

  return (
    <main className="flex min-h-screen flex-col items-center  p-3 ">
      <Header {...headerProps} />
      {locations && (
        <>
          {/* pagination buttons */}
          <div className=" w-full h-32  flex flex-row-reverse items-center gap-5 justify-center ">
            <button
              onClick={() =>
                setCurrentPage(
                  currentPage <= pages - 1 ? currentPage + 1 : pages
                )
              }
              className="p-2 bg-blue-600 rounded"
            >
              next
            </button>
            <p>
              {currentPage}/{pages}
            </p>
            <button
              onClick={() =>
                setCurrentPage(currentPage >= 2 ? currentPage - 1 : 1)
              }
              className="p-2 bg-blue-600 rounded"
            >
              Prev
            </button>
          </div>
          {/* list of location and residents */}
          <section className="w-full  max-w-4xl h-fit   ">
            {loading ? (
              <p className="text-2xl font-semibold text-center ">Loading...</p>
            ) : (
              locations.map((item) => {
                return (
                  <Location key={`${item.url}${Math.random()} `} {...item} />
                );
              })
            )}
          </section>
          <div className=" w-full h-32  flex flex-row-reverse items-center gap-5 justify-center ">
            <button
              onClick={() =>
                setCurrentPage(
                  currentPage <= pages - 1 ? currentPage + 1 : pages
                )
              }
              className="p-2 bg-blue-600 rounded"
            >
              next
            </button>
            <p>
              {currentPage}/{pages}
            </p>
            <button
              onClick={() =>
                setCurrentPage(currentPage >= 2 ? currentPage - 1 : 1)
              }
              className="p-2 bg-blue-600 rounded"
            >
              Prev
            </button>
          </div>
        </>
      )}
    </main>
  );
}
