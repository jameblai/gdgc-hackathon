import { api } from "@/lib/api/server";

export default async function Home() {
  const { data: health } = await api.health.get();
  return <p>{health?.status}</p>;
}
