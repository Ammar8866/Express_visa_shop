import React from 'react'
import { Card, Group, Divider, Grid, Text } from '@mantine/core';
import { RiTeamFill } from 'react-icons/ri';
import { FcCustomerSupport, FcClock } from 'react-icons/fc';
export default function Facilities() {
    return (
        <>

            <Grid>
                <Grid.Col span={12} mt="5rem">
                    <div style={{ display: 'flex', justifyContent: 'left', flexWrap: "wrap" }}>
                        <div>
                            <Text ta="center"
                                style={{
                                    marginRight: "10px",
                                    fontWeight: '700',
                                    fontSize: '35px',
                                    color: 'black', // Set the color for the first half

                                }}
                            >
                                Why Visa Shop ?
                            </Text>
                        </div>
                        <div>
                            <Text mt="4px"
                                style={{
                                    fontWeight: '700',
                                    fontSize: '30px',
                                    color: 'red', // Set the color for the second half

                                }}
                            >
                                Your Trusted Partner for Seamless Travel
                            </Text>
                        </div>
                    </div>
                </Grid.Col>

                <Grid.Col span={12} mt="2rem">
                    <Card
                        radius="lg"
                        style={{
                            border: "1px solid yellow",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Group ml="2rem" mr="2rem" style={{ display: "flex", justifyContent: "space-between" }}>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 12, md: 6, lg: 3 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginRight: "1rem" }}>
                                <RiTeamFill size="60px" color='gray' />
                                <Text mt="xs" style={{
                                    fontWeight: "700",
                                    fontSize: "20px",
                                    color: "black",
                                    display: "flex",
                                    justifyContent: "center",
                                }}>Expertise</Text>
                                <Text ta="center" style={{
                                    fontWeight: "400",
                                    fontSize: "15px",
                                    color: "black",
                                    display: "flex",
                                    justifyContent: "center",


                                }}>
                                    We are dedicated professionals with a deep understanding of visa requirements for various destinations. Our team ensures you receive accurate and up-to-date information, guiding you through the complex visa application process effortlessly.</Text>
                            </Grid.Col>
                            <Divider size="sm" orientation="vertical" />
                            <Grid.Col span={{ base: 12, xs: 12, sm: 12, md: 6, lg: 3 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: "10px" }}>
                                <FcClock size="60px" />
                                <Text mt="xs" style={{
                                    fontWeight: "700",
                                    fontSize: "20px",
                                    color: "black",
                                    display: "flex",
                                    justifyContent: "center",
                                }}>Time and Stress Savings</Text>
                                <Text ta="center" style={{
                                    fontWeight: "400",
                                    fontSize: "15px",
                                    color: "black",
                                    display: "flex",
                                    justifyContent: "center",


                                }}>
                                    Visa Shop simplifies the visa application process, saving you time and reducing stress. With us, you can shift your focus to planning your trip while we handle the intricacies. Enjoy a worry-free experience as you prepare for your upcoming adventure.</Text>
                            </Grid.Col>
                            <Divider size="sm" orientation="vertical" />
                            <Grid.Col span={{ base: 12, xs: 12, sm: 12, md: 6, lg: 3 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <FcCustomerSupport size="60px" />
                                <Text mt="xs" style={{
                                    fontWeight: "700",
                                    fontSize: "20px",
                                    color: "black",
                                    display: "flex",
                                    justifyContent: "center",
                                }}>Customer Support</Text>
                                <Text ta="center" style={{
                                    fontWeight: "400",
                                    fontSize: "15px",
                                    color: "black",
                                    display: "flex",
                                    justifyContent: "center",

                                }}>
                                    Our dedicated customer support team is available to assist you at every step of your journey. Whether you have questions or need assistance, we are here to provide the support you require. Rest assured that our commitment to your satisfaction remains unwavering.</Text>
                            </Grid.Col>
                        </Group>



                    </Card>
                </Grid.Col>
            </Grid>

        </>
    )
}
