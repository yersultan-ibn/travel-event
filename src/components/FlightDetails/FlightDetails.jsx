import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function FlightDetails() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true); // Добавлено состояние загрузки данных

  useEffect(() => {
    axios
      .get("http://localhost:3000/fly.json")
      .then((response) => {
        setFlights(response.data.flights);
        setLoading(false); // Установка состояния загрузки в false при успешной загрузке данных
      })
      .catch((error) => {
        console.log("Ошибка при загрузке данных:", error);
        setLoading(false); // Установка состояния загрузки в false при ошибке загрузки данных
      });
  }, []);

  // Фильтрация списка полетов на основе значений origin и destination
  const filteredFlights =
    origin && destination
      ? flights.filter(
          (flight) =>
            flight.origin?.toLowerCase() === origin.toLowerCase() &&
            flight.destination?.toLowerCase() === destination.toLowerCase()
        )
      : [];

  return (
    <div>
      <h2>Результаты поиска:</h2>
      <p>Origin: {origin}</p>
      <p>Destination: {destination}</p>

      {loading ? (
        <p>Загрузка данных...</p> // Отображение сообщения о загрузке
      ) : filteredFlights.length > 0 ? (
        <div>
          <h3>Найденные полеты:</h3>
          {filteredFlights.map((flight) => (
            <div key={flight.id}>
              <p>ID: {flight.id}</p>
              <p>Price: {flight.price}</p>
              {/* Добавьте здесь другие поля, которые вы хотите отображать */}
            </div>
          ))}
        </div>
      ) : (
        <p>Нет доступных полетов для выбранного маршрута.</p>
      )}
    </div>
  );
}

export default FlightDetails;
