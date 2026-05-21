import { notFound } from "next/navigation";
import TutorDetails from "@/components/TutorDetails";

async function getTutor(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/tutors/${id}`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function TutorDetailsPage({ params }) {
  const { id } = await params;
  const tutor = await getTutor(id);

  if (!tutor) return notFound();

  return <TutorDetails tutor={tutor} />;
}
