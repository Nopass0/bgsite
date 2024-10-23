// app/page.tsx
import dynamic from "next/dynamic";

const Portfolio = dynamic(() => import("~/app/_components/Portfolio"), {
  ssr: false,
});

export default function Home() {
  return <Portfolio />;
}
