import React, { useState } from 'react';
import { Grid, Text, Card, Container, Group, Button, Divider } from '@mantine/core';
import VisaData from '../../../Data.json';

export default function Visa() {
    // Maintain hover state for each card and button
    const [hoveredCards, setHoveredCards] = useState(new Array(VisaData.visaData.length).fill(false));
    const [hoveredButton, setHoveredButton] = useState(null);

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

    return (
        <>
            <Grid>
                {VisaData.visaData.map((project, index) => (
                    <Grid.Col
                        mt="xl"
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
                                        fontSize: '20px',
                                        color: 'black',
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
                                    >
                                        Proceed
                                    </Button>
                                </Group>
                            </Card.Section>
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>
        </>
    );
}
