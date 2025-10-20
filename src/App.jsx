import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Highlights from './components/Highlights';
import Model from './components/Model';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Footer from './components/footer';

// import * as Sentry from '@sentry/react';

const App = () => {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Highlights />
        <Model />
        <Features />
        <HowItWorks />
      </main>

      <Footer />
    </>
  );
};

// export default Sentry.withProfiler(App);
export default App;
