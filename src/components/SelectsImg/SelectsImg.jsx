import React, { useState } from "react";
import "./SelectsImgStyles.css";
import { IoAirplane } from "react-icons/io5";
import Modal from "../Modal/Modal";
import Info from "../FlightDetails/FlightDetails";
import airplane from "../../assets/air.svg";

function SelectsImg({
  id,
  origin,
  destination,
  price,
  stops,
  totalFlightTime,
  layovers,
}) {
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="card-start">
        <div>
          <p>{stops} пересадка</p>
        </div>
        <h3>
          {origin} - {destination}
        </h3>
        <button onClick={handleModalOpen} className="btn-detail">
          Детали перелёта
        </button>
        <Modal
          title="Детали перелёта"
          onClose={handleModalClose}
          show={showModal}
        >
          <h3>
            {origin} - {destination}
          </h3>
          {layovers.map((layover, index) => (
            <div className="modal-body-item" key={index}>
              <div className="v8aa">
                <span className="aav9 aa9v"></span>
                <span className="a9va aa9v"></span>
                <span className="aav9 aa9v1"></span>
              </div>
              <div>
                {index === 0 ? (
                  <>
                    <h3>{origin}</h3>
                    <p>Время полета: {layover.flightTime}</p>
                  </>
                ) : (
                  <>
                    <h3>{layovers[index - 1].airport}</h3>
                    <p>Время полета: {layovers[index - 1].flightTime}</p>
                  </>
                )}
                <h3>{layover.airport}</h3>
                <p>Ожидание: {layover.duration}</p>
              </div>
            </div>
          ))}
          <h3 className="time-air">Общее время полета {totalFlightTime}</h3>
        </Modal>
      </div>
      <div className="card-center">
        <p className="flight__time-flight">В полете: {totalFlightTime} </p>
        <div className="flight__line">
          <img
            src={airplane}
            alt="самолет"
            className={`flight__img ${
              id % 2 === 0 ? "flight__img-even" : "flight__img-odd"
            }`}
          />
        </div>
      </div>
      <div className="card-end">
        <span>{price} $</span>
        <button className="btn-card">Выбрать</button>
      </div>
    </>
  );
}

export default SelectsImg;
