import React, { useState } from 'react';
import FlightSearchForm from './components/FlightSearchForm';
import FlightList from './components/FlightList';
import PaymentForm from './components/PaymentForm';

import flightsData from './data.json';

const App = () => {
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (searchCriteria) => {
    const filteredFlights = flightsData.flights.filter((flight) => {
      const {
        fromCity,
        toCity,
        departureDate,
        returnDate,
        airline
      } = searchCriteria;

      if (
        flight.from.toLowerCase() === fromCity.toLowerCase() &&
        flight.to.toLowerCase() === toCity.toLowerCase() &&
        flight.departureDate === departureDate &&
        flight.returnDate === returnDate &&
        (airline === '' || flight.airline.toLowerCase() === airline.toLowerCase())
      ) {
        return true;
      }

      return false;
    });

    setFlights(filteredFlights);
    setSearched(true);
    setSelectedFlight(null);
  };

  const handleFlightSelect = (flight) => {
    setSelectedFlight(flight);
  };

  return (
    <div>
      <h1>Uçak Bileti Arama ve Ödeme</h1>
      <FlightSearchForm onSearch={handleSearch} />
      {searched ? (
        selectedFlight ? (
          <PaymentForm flight={selectedFlight} />
        ) : (
          <FlightList flights={flights} onFlightSelect={handleFlightSelect} />
        )
      ) : (
        <p>Uçuş listesini görüntülemek için arama yapınız.</p>
      )}
    </div>
  );
};

export default App;
