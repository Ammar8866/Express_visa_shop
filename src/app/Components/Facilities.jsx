import React from 'react'
import { Card, Group, Divider, Grid, Text } from '@mantine/core';
import { FaPeopleRoof, FaHandshake, FaScaleBalanced } from 'react-icons/fa6';
export default function Facilities() {
    return (
        <>
            <Grid>
                <Grid.Col span={12} mt="5rem">
                    <Card
                        radius="lg"
                        style={{
                            border: "1px solid yellow",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Group ml="2rem" mr="2rem" style={{ display: "flex", justifyContent: "space-between" }}>
                            <Grid.Col  span={{ base: 12, xs: 12, sm: 12, md: 6, lg: 3 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginRight: "1rem" }}>
                                <FaPeopleRoof size="60px" />
                                <Text mt="xs" style={{
                                    fontWeight: "700",
                                    fontSize: "20px",
                                    color: "black",
                                    display: "flex",
                                    justifyContent: "center",
                                }}>Commitment to Clients</Text>
                                <Text ta="center" style={{
                                    fontWeight: "400",
                                    fontSize: "15px",
                                    color: "black",
                                    display: "flex",
                                    justifyContent: "center",


                                }}>
                                    We are dedicated to serving our clients with excellence, consistently delivering the highest quality of service possible.</Text>
                            </Grid.Col>
                            <Divider size="sm" orientation="vertical" />
                            <Grid.Col  span={{ base: 12, xs: 12, sm: 12, md: 6, lg: 3 }}style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: "10px" }}>
                                <FaHandshake size="60px" />
                                <Text mt="xs" style={{
                                    fontWeight: "700",
                                    fontSize: "20px",
                                    color: "black",
                                    display: "flex",
                                    justifyContent: "center",
                                }}>Professionalism</Text>
                                <Text ta="center" style={{
                                    fontWeight: "400",
                                    fontSize: "15px",
                                    color: "black",
                                    display: "flex",
                                    justifyContent: "center",


                                }}>
                                    We take immense pride in our meticulous attention to detail, ensuring that our visa applications set the gold standard for professionalism.</Text>
                            </Grid.Col>
                            <Divider size="sm" orientation="vertical" />
                            <Grid.Col  span={{ base: 12, xs: 12, sm: 12, md: 6, lg: 3 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <FaScaleBalanced size="60px" />
                                <Text mt="xs" style={{
                                    fontWeight: "700",
                                    fontSize: "20px",
                                    color: "black",
                                    display: "flex",
                                    justifyContent: "center",
                                }}>Great Work Ethic</Text>
                                <Text ta="center" style={{
                                    fontWeight: "400",
                                    fontSize: "15px",
                                    color: "black",
                                    display: "flex",
                                    justifyContent: "center",

                                }}>
                                    Visa Shop, our application process begins with a comprehensive initial assessment, guiding you toward the most optimal visa option available.</Text>
                            </Grid.Col>
                        </Group>



                    </Card>
                </Grid.Col>
            </Grid>

        </>
    )
}
