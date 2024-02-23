import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchprams = request.nextUrl.searchParams;
  const searchitem = searchprams.get("name");
  const pageNumber = searchprams.get("page");

  try {
    const respdata = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${searchitem}`
    );

    const data = await respdata.json();
    const { results, info } = data;

    const searchresults = [];
    if (!results)
      return NextResponse.json({ status: 404, message: "Not found" });

    for (let i = 0; i < results.length; i++) {
      let locationtype;
      if (results[i].location.url) {
        const data = await fetch(results[i].location.url);
        locationtype = await data.json();
      }

      searchresults.push({
        name: results[i].location.name,
        residents: [results[i].url],
        type: locationtype?.type,
      });
    }

    if (!results) {
      return NextResponse.json({ status: 404, message: "not found" });
    }

    return NextResponse.json({
      status: 200,
      message: "success",
      results: { info, results: searchresults },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "Server error" });
  }
}
