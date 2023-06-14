import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import "./HeroStyles.css";
import Video from "../../assets/turkey-videos.mp4";
import { AiOutlineSearch } from "react-icons/ai";

function Hero() {
  const [origin, setOrigin] = useState("Откуда");
  const [destination, setDestination] = useState("Куда");
  const [flights, setFlights] = useState([]);
  const [allFlights, setAllFlights] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/fly.json");
        setFlights(response.data.flights);
        setAllFlights(response.data.flights);
      } catch (error) {
        console.log("Ошибка при загрузке данных:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    if (origin && destination) {
      const filteredFlights = allFlights.filter(
        (flight) =>
          flight.origin.toLowerCase() === origin.toLowerCase() &&
          flight.destination.toLowerCase() === destination.toLowerCase()
      );
      history.push("/results", { flights: filteredFlights });
    }
  };

  const originOptions = flights.map((flight) => ({
    value: flight.origin,
    label: flight.origin,
  }));

  const destinationOptions = flights
    .filter((flight) => flight.origin === origin && flight.destination)
    .map((flight) => ({
      value: flight.destination,
      label: flight.destination,
    }));

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#fff",
      border: state.isFocused ? "2px solid #000" : "1px solid #ccc",
      padding: "15px 30px",
      borderRadius: "4px",
      boxShadow: state.isFocused ? "0 0 0 3px rgba(0, 0, 0, 0.1)" : null,
      "&:hover": {
        border: state.isFocused ? "2px solid #000" : "1px solid #ccc",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#f9f9f9" : "#fff",
      color: "#000",
      "&:hover": {
        backgroundColor: "#f9f9f9",
      },
    }),
  };

  const isSearchDisabled = !origin || !destination;

  return (
    <div className="hero">
      <video autoPlay loop muted id="video">
        <source src={Video} type="video/mp4" />
      </video>
      <div className="overlay"></div>
      <div className="content">
        <h1>Бронирование авиабилетов</h1>
        <form className="form">
          <div className="form-search form-search-one">
            <Select
              value={{ value: origin, label: origin }}
              onChange={(newValue) => setOrigin(newValue.value)}
              options={originOptions}
              className="select-flights"
              styles={customStyles}
              placeholder="Откуда"
            />
          </div>
          <div className="form-search form-search-two">
            <Select
              value={{ value: destination, label: destination }}
              onChange={(newValue) => setDestination(newValue.value)}
              options={destinationOptions}
              placeholder="Обратно"
              styles={customStyles}
              className="select-flights"
            />
          </div>
          <div>
            <button
              type="button"
              className="btn"
              onClick={handleSearch}
              disabled={isSearchDisabled}
            >
              <AiOutlineSearch className="icon" />
              Найти билеты
            </button>
          </div>
        </form>
        <Link
          to={{
            pathname: "/results",
            state: { flights: flights },
          }}
        >
          Увидеть все рейсы
        </Link>
      </div>
    </div>
  );
}

export default Hero;
