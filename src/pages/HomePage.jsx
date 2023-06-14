import Destinations from "../components/Destinations/Destinations";
import Footer from "../components/Footer/Footer";
import Hero from "../components/Hero/Hero";
import Navbar from "../components/Navbar/Navbar";

// import axios from "axios";
// import { Route, Router, Routes } from "react-router-dom";
// import Selects from "../components/selects/Selects";

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Destinations />
      <Footer />
    </>
  );
}

export default HomePage;
