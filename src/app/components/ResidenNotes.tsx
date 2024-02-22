"use client";
import React from "react";
import { useAppdata } from "../state/state";

const ResidenNotes = () => {
  const { residentNotes } = useAppdata();

  //   console.log(residentNotes);

  return (
    <div>
      {residentNotes ? (
        <>
          <div>
            <p>created: {new Date(residentNotes.createdAt).toDateString()} </p>
          </div>
          <p>{residentNotes.notes}</p>
        </>
      ) : (
        <p> No notes have been recorded yet </p>
      )}
    </div>
  );
};

export default ResidenNotes;
