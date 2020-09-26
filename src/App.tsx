import { Button, Paper, TextField } from "@material-ui/core";
import React, { useState } from "react";
import "./App.css";
import { getApartments } from "./BoligSidenService";
import ApartmentBlock from "./components/ApartmentBlock";
import { EstimatedProperty, estimateProperties } from "./PropertyEstimator";
import { addTags, EstimatedTaggedProperty } from "./TagProvider";

function App() {
  const [zipCode, setZipCode] = useState(
    "2200,1499,2930,2100,1999,1799,2400,2300,2870,2150,2450,2900,2820"
  );
  const [properties, setProperties] = useState<EstimatedTaggedProperty[]>([]);

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
        onClick={(e) => {
          getApartments(zipCode.split(",").map((zip) => parseInt(zip))).then(
            (properties) => {
              let estimated = estimateProperties(properties);
              estimated.sort((a, b) => (a.roi < b.roi ? -1 : 1));
              estimated = estimated.reverse();
              /*estimated.unshift(
                estimateProperties([
                  new Property(
                    "Gladsaxevej",
                    30,
                    46,
                    "Copenhagen",
                    new Date(),
                    0,
                    "123",
                    "",
                    1,
                    1000000,
                    3400,
                    2860,
                    0,
                    ""
                  ),
                ])[0]
              );*/
              estimated = estimated.slice(0, 60);
              let estimatedAndTagged = addTags(estimated);
              setProperties(estimatedAndTagged)
            }
          );
        }}
      >
        Best investment
      </Button>
      <Paper style={{paddingTop:'20px'}}>
        {properties.map((property: EstimatedTaggedProperty) => {
          return <ApartmentBlock property={property} />;
        })}
      </Paper>
    </div>
  );
}

export default App;
