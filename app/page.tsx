import { Features } from "@/components/Home/Features";
import { Banner } from "@/components/Home/Banner";
import { CoverSection } from "@/components/Home/CoverSection";

export default function Home() {
  return (
    <main className="space-y-10 ">
        <Banner />
        <Features />
        <CoverSection/>
    </main>
  );
}
