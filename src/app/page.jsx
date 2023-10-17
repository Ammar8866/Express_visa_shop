"use client";
import React from 'react'
import Header from './Components/Header';
// import Home from './Components/Home';
import Visa from './Components/VisaOption';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Facilities from './Components/Facilities';
import Title from './Components/TitleHeading';
import { Container } from "@mantine/core";

export default function page() {
  return (
    <>
      <Header />
      {/* <Home /> */}
      <Container size="lg">
        <Title />
        <Visa />
        <Form />
        <Facilities />
      </Container>
      <Footer />


    </>
  )
}
