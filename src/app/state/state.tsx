"use client";
import React, { createContext, useContext, useState } from "react";
import { LocationType, NotesType, ResidentsType } from "./types";

type locationvaluesType = {
  locations: [] | LocationType[];
  setlocations: React.Dispatch<React.SetStateAction<[] | LocationType[]>>;
  setresidentNotes: React.Dispatch<React.SetStateAction<NotesType | undefined>>;
  residentNotes: NotesType | undefined;
};

const ContextApi = createContext<locationvaluesType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const LocationProvider = ({ children }: Props) => {
  const [locations, setlocations] = useState<LocationType[] | []>([]);
  const [residentNotes, setresidentNotes] = useState<NotesType | undefined>(
    undefined
  );

  const locationvalues: locationvaluesType = {
    locations,
    setlocations,
    setresidentNotes,
    residentNotes,
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
