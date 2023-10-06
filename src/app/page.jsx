"use client";
import React from 'react'
import Header from './Components/Header'
import Home from './Components/Home'
import Visa from './Components/VisaOption'
import Contact from './Components/Contact'
import Footer from './Components/Footer';

import { Container } from "@mantine/core";

export default function page() {
  return (
    <>
      <Header />
      <Home />
      <Container size="lg">
        <Visa />
        <Contact />
      </Container>
      <Footer />


    </>
  )
}
