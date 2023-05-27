import Feed from "@/components/Feed";

export default async function Home() {
  return (
    <section className="w-full flex justify-center items-center flex-col">
      <h1 className="text-center">
        Discover & Share
        <span className="text-center"> AI-Powered Prompts</span>
      </h1>
      <p className="text-center">
        Promptopia is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts
      </p>
      <Feed />
    </section>
  );
}
