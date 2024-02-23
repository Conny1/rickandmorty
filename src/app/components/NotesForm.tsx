"use client";
import React, { useEffect, useState } from "react";
import { useAppdata } from "../state/state";

const NotesForm = ({ residentid }: { residentid: string }) => {
  const [modal, setmodal] = useState(false);
  const [notes, setnotes] = useState<string | undefined>("");
  const { setresidentNotes, residentNotes } = useAppdata();
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const getnotes = async () => {
      try {
        setloading(true);

        const resp = await fetch(`../api/notes?query=${residentid}`);

        const respData = await resp.json();
        setloading(false);
        if (respData.status === 200) {
          setresidentNotes(respData.resp);
        }
      } catch (error) {
        setloading(false);
      }
    };
    getnotes();
  }, []);

  const addNotes = async (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    ev.preventDefault();
    if (!notes) {
      return alert("Provide the required details");
    }

    const data = {
      residentid,
      notes,
    };

    try {
      setloading(true);
      const resp = await fetch("../api/notes", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const respData = await resp.json();
      setloading(false);
      if (respData.status === 200) {
        setresidentNotes(respData.resp);
      }
    } catch (error) {
      setloading(false);
      console.log(error);
    }
  };
  // update notes
  const editNotes = async (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    ev.preventDefault();
    if (!notes) {
      return alert("Provide the required details");
    }

    const data = {
      residentid,
      notes,
    };

    try {
      setloading(true);
      const resp = await fetch("../api/notes", {
        method: "PUT",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const respData = await resp.json();
      setloading(false);
      if (respData.status === 200) {
        setresidentNotes(respData.resp);
      }
    } catch (error) {
      setloading(false);
      console.log(error);
    }
  };
  return (
    <div>
      {residentNotes ? (
        <button
          onClick={() => {
            setnotes(residentNotes.notes);
            setmodal(true);
          }}
          className="bg-blue-400 p-2 rounded mt-2"
        >
          Edit notes
        </button>
      ) : (
        <button
          onClick={() => setmodal(true)}
          className="bg-blue-400 p-2 rounded mt-2"
        >
          Add notes
        </button>
      )}

      {modal && (
        <div className="fixed w-full bg-black h-full top-0 left-0 bg-opacity-80 flex items-center justify-center p-2 ">
          <form className="flex-1 max-w-96 h-96 flex flex-col">
            <button
              onClick={() => setmodal(false)}
              className="text-white bg-blue-500 rounded-t-lg p-1 uppercase "
            >
              close
            </button>
            <textarea
              value={notes}
              onChange={(ev) => setnotes(ev.target.value)}
              className="flex-1 p-3 border-none outline-none "
              placeholder="notes"
            ></textarea>
            {loading ? (
              <button
                onClick={(ev) => ev.preventDefault()}
                className="text-white bg-blue-500 rounded-b-lg p-1 uppercase "
              >
                Loading...
              </button>
            ) : residentNotes ? (
              <button
                onClick={editNotes}
                type="submit"
                className="text-white bg-blue-500 rounded-b-lg p-1 uppercase "
              >
                Edit notes
              </button>
            ) : (
              <button
                onClick={addNotes}
                type="submit"
                className="text-white bg-blue-500 rounded-b-lg p-1 uppercase "
              >
                add notes
              </button>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default NotesForm;
