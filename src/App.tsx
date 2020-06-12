import { Button, TextField, Paper } from "@material-ui/core";
import React, { useState } from "react";
import "./App.css";
import { getApartments, Property } from "./BoligSidenService";
import ApartmentBlock from "./components/ApartmentBlock";
import { estimateProperties, EstimatedProperty } from "./PropertyEstimator";

function App() {
  const [zipCode, setZipCode] = useState("");
  const [properties, setProperties] = useState<EstimatedProperty[]>([]);
  return (
    <div className="App">
      <TextField
        label="ZIP"
        variant="outlined"
        onChange={(e) => setZipCode(e.target.value)}
        value={zipCode}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={(e) =>
          getApartments(parseInt(zipCode)).then((properties) => {
            properties.sort((a, b) =>
              a.areaPaymentCash < b.areaPaymentCash ? -1 : 1
            );

            setProperties(estimateProperties(properties).slice(0, 5));
          })
        }
      >
        Lowest price per square meter
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={(e) =>
          getApartments(parseInt(zipCode)).then((properties) => {
            properties.sort((a, b) =>
              a.areaPaymentCash < b.areaPaymentCash ? -1 : 1
            );
            properties = properties.reverse();
            setProperties(estimateProperties(properties).slice(0, 5));
          })
        }
      >
        Highest price per square meter
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={(e) =>
          getApartments(parseInt(zipCode)).then((properties) => {
            let estimated = estimateProperties(properties);
            estimated.sort((a, b) => (a.roi < b.roi ? -1 : 1));
            estimated = estimated.reverse();
            setProperties(estimated.slice(0, 5));
          })
        }
      >
        Best investment
      </Button>
      <Paper>
        {properties.map((property: EstimatedProperty) => {
          return <ApartmentBlock property={property} />;
        })}
      </Paper>
    </div>
  );
}

export default App;
