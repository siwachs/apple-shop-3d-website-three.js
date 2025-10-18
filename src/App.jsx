import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Highlights from "./components/Highlights";
import Model from "./components/Model";

const App = () => {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Highlights />
        <Model />
      </main>
    </>
  );
};

export default App;
