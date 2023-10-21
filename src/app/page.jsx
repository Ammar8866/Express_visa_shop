/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState } from 'react';
import Header from './Components/Header';
import Visa from './Components/VisaOption';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Facilities from './Components/Facilities';
import Title from './Components/TitleHeading';
import { Container } from "@mantine/core";

export default function page() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');

  const handleCountryChange = (countryCode) => {
    // Handle the selected country code as needed
    console.log('Selected Country Code:', countryCode);
  };
  return (
    <>
      <Header />
      <Container size="lg">
        <Title />
<<<<<<< HEAD
        <Visa onChange={handleCountryChange} setSelectedCountry={setSelectedCountry} selectedCountry={selectedCountry} setSelectedPlan={setSelectedPlan} />
        <Form selectedCountry={selectedCountry} selectedPlan={selectedPlan} />
=======
        <Visa onChange={handleCountryChange} setSelectedCountry={setSelectedCountry} selectedCountry={selectedCountry} setSelectedPlan={setSelectedPlan}  />
        <Form selectedCountry={selectedCountry} selectedPlan={selectedPlan}/>
>>>>>>> 629f53128751c1c5524b515f3d13230252b9091c
        <Facilities />
      </Container>
      <Footer />
    </>
  )
}
