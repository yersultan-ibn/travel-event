import React, { useEffect, useState } from "react";
import "./SelectsStyles.css";
import Select from "react-select";
import CheckboxGroup from "react-checkbox-group";
import SelectsImg from "../../components/SelectsImg/SelectsImg";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Selects() {
  const [flights, setFlights] = useState([]);
  const [sortedFlights, setSortedFlights] = useState([]);
  const [sortOption, setSortOption] = useState("cheap");
  const [selectedStops, setSelectedStops] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [flightsPerPage] = useState(6);
  const location = useLocation();

  useEffect(() => {
    axios.get("http://localhost:3000/fly.json").then(({ data }) => {
      setFlights(data.flights);
    });
  }, []);

  useEffect(() => {
    const filteredFlights = location.state?.flights || [];

    const sorted = filteredFlights.slice().sort((a, b) => a.price - b.price);

    let filteredSortedFlights = sorted;
    if (selectedStops.length > 0) {
      filteredSortedFlights = sorted.filter((flight) =>
        selectedStops.includes(flight.stops)
      );
    }

    if (sortOption === "cheap") {
      setSortedFlights(filteredSortedFlights);
    } else if (sortOption === "expensive") {
      setSortedFlights(filteredSortedFlights.reverse());
    }
  }, [location.state?.flights, sortOption, selectedStops]);

  const sortOptions = [
    { value: "cheap", label: "Сначала дешевые" },
    { value: "expensive", label: "Сначала дорогие" },
  ];

  const selectedSortOption = sortOptions.find(
    (option) => option.value === sortOption
  );

  const handleSortChange = (selectedOption) => {
    setSortOption(selectedOption ? selectedOption.value : "cheap");
  };

  const handleStopChange = (selectedStops) => {
    setSelectedStops(selectedStops);
  };

  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;

  const currentFlights = sortedFlights.slice(
    indexOfFirstFlight,
    indexOfLastFlight
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(sortedFlights.length / flightsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="selects-container">
      <div className="selects-sidebar">
        <h2 className="sidebar-title">Сортировка</h2>
        <CheckboxGroup
          name="stops"
          value={selectedStops}
          onChange={handleStopChange}
        >
          {(Checkbox) => (
            <ul className="sidebar-options">
              <li className="sidebar-option">
                <label>
                  <Checkbox value={1} /> 1 пересадка
                </label>
              </li>
              <li className="sidebar-option">
                <label>
                  <Checkbox value={2} /> 2 пересадки
                </label>
              </li>
              <li className="sidebar-option">
                <label>
                  <Checkbox value={3} /> 3 пересадки
                </label>
              </li>
              <li className="sidebar-option">
                <label>
                  <Checkbox value={4} /> 4 пересадки
                </label>
              </li>
              <li className="sidebar-option">
                <label>
                  <Checkbox value={5} /> 5 пересадок
                </label>
              </li>
            </ul>
          )}
        </CheckboxGroup>
      </div>
      <div className="selects-content">
        <h1 className="selects-title">Выберите свой полет</h1>
        <div className="selects-sort-container">
          <Select
            isSearchable={false}
            options={sortOptions}
            value={selectedSortOption}
            onChange={handleSortChange}
            placeholder="Выберите сортировку"
          />
        </div>
        <div className="selects-cards-container">
          {currentFlights.map((fl) => (
            <div className="card" key={fl.id}>
              <div className="card-wrapper">
                <SelectsImg key={fl.id} {...fl} />
              </div>
            </div>
          ))}
        </div>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={currentPage === number ? "active" : ""}
              onClick={() => paginate(number)}
            >
              {number}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Selects;
