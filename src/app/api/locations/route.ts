import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchprams = request.nextUrl.searchParams;
  const pagenumber = searchprams.get("page");
  console.log(pagenumber);
  try {
    const respdata = await fetch(
      `https://rickandmortyapi.com/api/location?page=${pagenumber}`
    );

    const { results } = await respdata.json();
    if (!results) {
      return NextResponse.json({ status: 404, message: "not found" });
    }

    return NextResponse.json({ status: 200, message: "success", results });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Server error" });
  }
}
