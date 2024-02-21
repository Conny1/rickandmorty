"use client";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Location from "./components/Location";
import { useAppdata } from "./state/state";

export default function Home() {
  const { locations, setlocations } = useAppdata();
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const respdata = await fetch("./api/locations");
        const resp = await respdata.json();
        if (resp.status === 200) {
          // console.log(resp.results);
          setlocations(resp.results);
        }
      } catch (error) {}
    };

    fetchLocations();
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center  p-3 ">
      <Header />
      {locations && (
        <section className="w-full  max-w-4xl ">
          {locations.map((item) => {
            return <Location key={item.id} {...item} />;
          })}
        </section>
      )}
    </main>
  );
}
