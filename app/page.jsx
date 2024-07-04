import Feed from "@/components/Feed";
const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br />
        {/* hidden for bigger than  mobile */}
        <span className="orange_gradient text-center">AI-powered prompts</span>
      </h1>
      <p className="desc text-center">
        Promptia is a open source Ai prompt to share creative prompts for modern
        world to discover
      </p>
      <Feed />
    </section>
  );
};

export default Home;
