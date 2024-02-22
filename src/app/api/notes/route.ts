import { connectToDb } from "@/dbconnect/dbconnect";
import Notes from "@/models/Notes";
import { NextRequest, NextResponse } from "next/server";

connectToDb();

// description -Adding notes to the database
// route - ../api/notes -POST
export async function POST(request: NextRequest) {
  try {
    const { residentid, notes } = await request.json();

    const resp = await Notes.create({ residentid, notes });
    if (!resp) {
      return NextResponse.json({ status: 500, message: "Note not added" });
    }

    return NextResponse.json({ status: 200, message: "success", resp });
  } catch (error) {
    // console.log(error);
    return NextResponse.json({ status: 500, message: "server error" });
  }
}

// description -get notes by residentid
// route - ../api/notes -GET
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  //   console.log(query);
  try {
    const resp = await Notes.findOne({ residentid: query });
    if (!resp) {
      return NextResponse.json({ status: 404, message: "Not found" });
    }

    return NextResponse.json({ status: 200, message: "success", resp });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "server error" });
  }
}

// description -Edit notes by residentid
// route - ../api/notes -PUT
export async function PUT(request: NextRequest) {
  try {
    const { residentid, notes } = await request.json();

    const resp = await Notes.findOneAndUpdate(
      { residentid: residentid },
      { notes: notes },
      { new: true }
    );
    if (!resp) {
      return NextResponse.json({ status: 500, message: "Note not Edited" });
    }

    return NextResponse.json({ status: 200, message: "success", resp });
  } catch (error) {
    // console.log(error);
    return NextResponse.json({ status: 500, message: "server error" });
  }
}
