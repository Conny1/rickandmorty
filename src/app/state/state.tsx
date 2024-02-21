"use client";
import React, { createContext, useContext, useState } from "react";
import { LocationType, ResidentsType } from "./types";
import { defaultConfig } from "next/dist/server/config-shared";

type locationvaluesType = {
  locations: [] | LocationType[];
  setlocations: React.Dispatch<React.SetStateAction<[] | LocationType[]>>;
};

const ContextApi = createContext<locationvaluesType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const LocationProvider = ({ children }: Props) => {
  const [locations, setlocations] = useState<LocationType[] | []>([]);

  const locationvalues: locationvaluesType = {
    locations,
    setlocations,
  };

  return (
    <ContextApi.Provider value={locationvalues}>{children}</ContextApi.Provider>
  );
};

export const useAppdata = (): locationvaluesType => {
  const context = useContext(ContextApi);
  if (!context) {
    throw new Error("useAppdata must be within the provider");
  }
  return context;
};
