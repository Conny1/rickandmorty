"use client";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Location from "./components/Location";
import { useAppdata } from "./state/state";

export default function Home() {
  const { locations, setlocations } = useAppdata();
  const [loading, setloading] = useState(false);
  const [currentPage, setCurrentPage] = useState(2);
  useEffect(() => {
    const fetchLocations = async () => {
      setloading(true);
      try {
        const respdata = await fetch(`./api/locations?page=${currentPage}`);
        const resp = await respdata.json();
        setloading(false);
        if (resp.status === 200) {
          // console.log(resp.results);
          setlocations(resp.results);
        }
      } catch (error) {
        setloading(false);
      }
    };

    fetchLocations();
  }, [currentPage]);

  return (
    <main className="flex min-h-screen flex-col items-center  p-3 ">
      <Header />
      {locations && (
        <>
          {/* pagination buttons */}
          <div className=" w-full h-32  flex flex-row-reverse items-center gap-5 justify-center ">
            <button
              onClick={() =>
                setCurrentPage(currentPage <= 7 ? currentPage + 1 : 7)
              }
              className="p-2 bg-blue-600 rounded"
            >
              next
            </button>
            <p>{currentPage - 1}/6</p>
            <button
              onClick={() =>
                setCurrentPage(currentPage >= 3 ? currentPage - 1 : 2)
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
                setCurrentPage(currentPage <= 7 ? currentPage + 1 : 7)
              }
              className="p-2 bg-blue-600 rounded"
            >
              next
            </button>
            <p>{currentPage - 1}/6</p>
            <button
              onClick={() =>
                setCurrentPage(currentPage >= 3 ? currentPage - 1 : 2)
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
