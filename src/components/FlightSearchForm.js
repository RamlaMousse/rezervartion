import React, { useState } from 'react';
import './FlightSearchForm.css';

const FlightSearchForm = ({ onSearch }) => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [airline, setAirline] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const searchCriteria = {
      fromCity,
      toCity,
      departureDate,
      returnDate,
      airline
    };

    onSearch(searchCriteria);
  };

  const airlineOptions = [
    { value: 'THY', label: 'THY' },
    { value: 'Pegasus', label: 'Pegasus' },
    { value: 'Anadolu Jet', label: 'Anadolu Jet' }
    // Diğer havayolu şirketlerini buraya ekleyebilirsiniz
  ];

  return (
    <div>
      <h2>Uçak Bileti Arama</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fromCity">Nereden:</label>
        <select
          id="fromCity"
          value={fromCity}
          onChange={(e) => setFromCity(e.target.value)}
        >
          <option value="">Şehir Seçin</option>
          <option value="Istanbul">Istanbul</option>
          <option value="Ankara">Ankara</option>
          <option value="Izmir">Izmir</option>
        </select>
        
        <label htmlFor="toCity">Nereye:</label>
        <select
          id="toCity"
          value={toCity}
          onChange={(e) => setToCity(e.target.value)}
        >
          <option value="">Şehir Seçin</option>
          <option value="Istanbul">Istanbul</option>
          <option value="Ankara">Ankara</option>
          <option value="Izmir">Izmir</option>
        </select>

        <label htmlFor="departureDate">Gidiş Tarihi:</label>
        <input
          type="date"
          id="departureDate"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
        />

        <label htmlFor="returnDate">Dönüş Tarihi:</label>
        <input
          type="date"
          id="returnDate"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
        />

        <label htmlFor="airline">Havayolu Şirketi:</label>
        <select
          id="airline"
          value={airline}
          onChange={(e) => setAirline(e.target.value)}
        >
          <option value="">Havayolu Seçin</option>
          {airlineOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <button type="submit">Ara</button>
      </form>
    </div>
  );
};

export default FlightSearchForm;
