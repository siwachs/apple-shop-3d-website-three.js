import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Highlights from "./components/Highlights";

const App = () => {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Highlights />
      </main>
    </>
  );
};

export default App;
