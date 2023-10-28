/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from "@mantine/core";

import Header from './Components/Header';
import Visa from './Components/VisaOption';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Facilities from './Components/Facilities';
import Title from './Components/TitleHeading';




export default function page() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Fetch the list of countries
    axios.get('https://restcountries.com/v3.1/all')
        .then((response) => {
            setCountries(response.data);
        })
        .catch((error) => {
            console.error('Error fetching countries:', error);
        });
}, []);

  return (
    <>
      <Header />
      <Container size="lg">
        <Title />
        <Visa setSelectedCountry={setSelectedCountry} countries={countries} selectedCountry={selectedCountry} setSelectedPlan={setSelectedPlan} />
        <Form selectedCountry={selectedCountry} countries={countries} setSelectedCountry={setSelectedCountry} setSelectedPlan={setSelectedPlan} selectedPlan={selectedPlan} />
        <Facilities />
      </Container>
      <Footer />
    </>
  )
}
