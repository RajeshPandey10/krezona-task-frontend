import EditProjectClient from "./EditProjectClient";

export async function generateStaticParams() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return [];

    const res = await fetch(`${apiUrl}/projects`);
    if (!res.ok) return [];
    const data = await res.json();
    const projects = Array.isArray(data)
      ? data
      : data?.data || data?.projects || [];

    return (projects || []).map((p: any) => ({ id: String(p.id) }));
  } catch (err) {
    return [];
  }
}

export default function Page() {
  return <EditProjectClient />;
}
