import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col flex-wrap justify-center items-center  ">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
