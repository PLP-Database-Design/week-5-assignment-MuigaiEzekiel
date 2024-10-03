const express = require("express");
const app = express();
const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});
app.get("", (req, res) => {
  const patientsProperty =
    "SELECT patient_id,first_name,last_name,date_of_birth FROM patients ";
  const providersProperty =
    "SELECT first_name, last_name, provider_specialty FROM providers";
  const patientsFirstName = "SELECT first_name FROM patients";
  const providersBySpecialty = "SELECT provider_specialty FROM providers";
  db.query(patientsProperty, (err, data) => {
    if (err) {
      return res.serverStatus(400).send("Failed to retrieve the data", err);
    }
    res.status(200).send(data);
  });
  db.query(providersProperty, (err, data) => {
    if (err) {
      return res.serverStatus(400).send("Failed to retrieve the data", err);
    }
    res.status(200).send(data);
  });
  db.query(patientsFirstName, (err, data) => {
    if (err) {
      return res
        .serverStatus(400)
        .send("Failed to retrieve patientsts firstname", err);
    }
    res.status(200).send(data);
  });
  db.query(providersBySpecialty, (err, data) => {
    if (err) {
      return res
        .serverStatus(400)
        .send("Failed to fetch provider specialty", err);
    }
    res.status(200).send(data);
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`);
});
//console.log(db);
db.connect((err) => {
  if (err) {
    console.log("fail");
  }
  console.log("success");
});
