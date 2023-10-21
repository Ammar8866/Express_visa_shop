import React, { useState, useEffect } from 'react';
import { Grid, Text, Card, Container, Group, Button, Divider, Paper } from '@mantine/core';
import VisaData from '../../../Data.json';
import axios from 'axios';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

export default function Visa({ onChange, setSelectedCountry, selectedCountry, setSelectedPlan }) {
    // Maintain hover state for each card and button
    const [hoveredCards, setHoveredCards] = useState(new Array(VisaData.visaData.length).fill(false));
    const [hoveredButton, setHoveredButton] = useState(null);
    const [countries, setCountries] = useState([]);
    const [isHovered, setIsHovered] = useState(false);

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

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
        onChange(event.target.value);
    };



    const handleCardHover = (cardId) => {
        const newHoveredCards = [...hoveredCards];
        newHoveredCards[cardId] = true;
        setHoveredCards(newHoveredCards);
    };

    const handleCardLeave = (cardId) => {
        const newHoveredCards = [...hoveredCards];
        newHoveredCards[cardId] = false;
        setHoveredCards(newHoveredCards);
    };

    const handleProceedClick = (project) => {
        console.log("project data",project);
        setSelectedPlan(project);
        const formElement = document.getElementById('form');
        if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleProceedNationality = () => {
        const formElement = document.getElementById('Options');
        if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth' });
        }
    };


    const buttonStyles = {

        borderRadius: "8px",
        height: "55px",
        backgroundColor: isHovered ? "red" : "#2d57a1",
        color: "white",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    };

    const handleButtonMouseEnter = () => {
        setIsHovered(true);
    };

    const handleButtonMouseLeave = () => {
        setIsHovered(false);
    };




    return (
        <>

            <Grid>
                <Grid.Col span={8}>
                    <Paper p="sm" mt="3rem" radius="md" style={{
                        boxShadow: '2px 5px 20px #e9e9e9',
                    }}>
                        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                            <FormControl variant="standard" style={{ minWidth: '80%', marginBottom: "18px" }}>
                                <InputLabel id="nationality-label" style={{ fontSize: '18px' }}>Nationality</InputLabel>
                                <Select
                                    labelId="nationality-label"
                                    id="nationality-select"
                                    value={selectedCountry}
                                    onChange={handleCountryChange}
                                    label="Nationality"
                                >
                                    <MenuItem value="">
                                        <em>Select a country</em>
                                    </MenuItem>
                                    {countries.map((country) => (
                                        <MenuItem key={country.cca2} value={country.name.common}>
                                            {country.name.common}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Button
                                mt="6px"
                                onClick={handleProceedNationality}
                                style={buttonStyles}
                                onMouseEnter={() => handleButtonMouseEnter()}
                                onMouseLeave={() => handleButtonMouseLeave()}
                            >
                                Continue
                            </Button>
                        </div>
                    </Paper>
                </Grid.Col>
            </Grid>


            <div id="Options"></div>
            <Divider color='yellow' size="sm" mt="3rem" />


            <Grid>

                {VisaData.visaData.map((project, index) => (
                    <Grid.Col
                        mt="3rem"
                        span={{ base: 12, xs: 12, sm: 12, md: 6, lg: 4 }}
                        mb="md"
                        key={project.id}
                        p="md"
                    >

                        <Card
                            shadow="lg"
                            radius="lg"
                            style={{
                                boxShadow: '2px 5px 20px #e9e9e9', // Add this line to set the shadow with the desired color
                                transform: hoveredCards[index] ? 'scale(1.03)' : 'scale(1)',
                                transition: 'transform 0.2s ease-in-out',
                            }}
                            onMouseEnter={() => handleCardHover(index)}
                            onMouseLeave={() => handleCardLeave(index)}
                        >

                            <Card.Section>

                                <Text
                                    mt="2rem"
                                    style={{
                                        fontWeight: '600',
                                        fontSize: '32px',
                                        color: 'black',
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {project.title}
                                </Text>


                                <Text
                                    mb="xl"
                                    style={{
                                        fontWeight: '400',
                                        fontSize: '18px',
                                        color: '#bfbdc4',
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {project.description}
                                </Text>
                                <Container size="15rem">
                                    <Divider size="xl" color="yellow" />
                                </Container>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Text
                                        mt="md"
                                        mr="xs"
                                        mb="md"
                                        style={{
                                            fontWeight: '600',
                                            fontSize: '50px',
                                            color: '#434343',
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {project.price}
                                    </Text>
                                    <Text
                                        pt="lg"
                                        style={{
                                            fontWeight: '700',
                                            fontSize: '25px',
                                            color: 'red',
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        USD
                                    </Text>
                                </div>

                                <Text
                                    mb="lg"
                                    style={{
                                        fontWeight: '400',
                                        fontSize: '16px',
                                        color: 'black',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    {project.text}
                                </Text>

                                <Group
                                    mb="2.5rem"
                                    style={{ display: 'flex', justifyContent: 'center' }}
                                >
                                    <Button
                                        size="md"
                                        radius="md"
                                        type="submit"
                                        style={{
                                            backgroundColor: index === hoveredButton ? 'red' : '#4c0066',
                                            transition: 'background-color 0.3s, color 0.3s',
                                            color: 'white',
                                        }}
                                        onMouseEnter={() => setHoveredButton(index)}
                                        onMouseLeave={() => setHoveredButton(null)}
                                        onClick={()=>handleProceedClick(project)}
                                    >
                                        Proceed
                                    </Button>
                                </Group>

                            </Card.Section>
                        </Card>

                    </Grid.Col>
                ))}
            </Grid >
        </>
    );
}
