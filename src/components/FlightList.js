import React from 'react';
import './FlightList.css';

const FlightList = ({ flights, onFlightSelect }) => {
  if (flights.length === 0) {
    return (
      <div>
        <h2>Uçuş Listesi</h2>
        <p>Henüz bir uçuş bulunmamaktadır.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Uçuş Listesi</h2>
      <ul>
        {flights.map((flight) => (
          <li key={flight.id}>
            <span>{flight.from}</span>
            <span>{flight.to}</span>
            <span>{flight.departureDate}</span>
            <span>{flight.departureTime}</span>
            <span>{flight.returnDate}</span>
            <span>{flight.returnTime}</span>
            <button onClick={() => onFlightSelect(flight)}>Seç</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlightList;
