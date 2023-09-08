import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  return <p>Id: {router.query.id}</p>;
}
