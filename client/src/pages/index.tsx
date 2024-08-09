import Hero from "../components/molecules/hero";
import RecentBlogs from "../components/molecules/recent-blogs";

export default function Home() {
  return (
    <>
      <div className="space-y-4">
        <Hero />
        <RecentBlogs />
      </div>
    </>
  );
}
