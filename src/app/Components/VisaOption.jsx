import React, { useState } from "react";
import { Grid, Text, Card, Divider, Container } from "@mantine/core";
import VisaData from "../../../Data.json";

export default function Visa() {
    // Maintain hover state for each card
    const [hoveredCard, setHoveredCard] = useState(null);

    const handleCardHover = (cardId) => {
        setHoveredCard(cardId);
    };

    const handleCardLeave = () => {
        setHoveredCard(null);
    };

    return (
        <>
            <Grid>
                <Grid.Col span={12}>
                    <Text
                        style={{
                            fontWeight: "600",
                            fontSize: "35px",
                            color: "black",
                            lineHeight: "82px",
                            letterSpacing: "-0.5 px",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        UAE Tourist Visa
                    </Text>
                </Grid.Col>

                {VisaData.map((project) => (
                    <Grid.Col span={{ base: 12, xs: 12, sm: 12, md: 6, lg: 4 }} mb="md" key={project.id} p="md">
                        <Card
                            shadow="lg"
                            radius="lg"
                            style={{
                                transform: hoveredCard === project.id ? "scale(1.03)" : "scale(1)",
                                transition: "transform 0.2s ease-in-out",
                            }}
                            onMouseEnter={() => handleCardHover(project.id)}
                            onMouseLeave={handleCardLeave}
                        >
                            <Card.Section>
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: "none" }}
                                >
                                    <Text mt="2rem" style={{
                                        fontWeight: "500",
                                        fontSize: "30px",
                                        color: "black",
                                        display: "flex",
                                        justifyContent: "center",
                                    }}>  {project.title}</Text>

                                    <Text mb="xl" style={{
                                        fontWeight: "400",
                                        fontSize: "20px",
                                        color: "black",
                                        display: "flex",
                                        justifyContent: "center",
                                    }}>
                                        {project.description}
                                    </Text>
                                    <Container size="15rem">
                                        <Divider size="xl" color="yellow" />
                                    </Container>
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <Text mt="md" mr="xs" mb="sm" style={{
                                            fontWeight: "600",
                                            fontSize: "50px",
                                            color: "#434343",
                                            display: "flex",
                                            justifyContent: "center",
                                        }}>
                                            {project.price}
                                        </Text>
                                        <Text pt="lg" style={{
                                            fontWeight: "700",
                                            fontSize: "25px",
                                            color: "red",
                                            display: "flex",
                                            justifyContent: "center",
                                        }}>
                                            USD
                                        </Text>
                                    </div>

                                    <Text mb="3rem" style={{
                                        fontWeight: "400",
                                        fontSize: "18px",
                                        color: "black",
                                        display: "flex",
                                        justifyContent: "center",
                                    }}>
                                        {project.text}
                                    </Text>
                                </a>
                            </Card.Section>
                        </Card>
                    </Grid.Col>
                ))}

            </Grid>
        </>
    );
}
