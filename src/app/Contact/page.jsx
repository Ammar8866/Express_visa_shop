'use client';
import React from "react";
import {
    TextInput,
    Textarea,
    Text,
    Grid,
    SimpleGrid,
    Group,
    Title,
    Paper,
    Button,
    Container,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Header from '../Components/Header';
import Footer from '../Components/Footer';

export default function Contact() {
    const form = useForm({
        initialValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
        validate: {
            name: (value) => value.trim().length < 2,
            email: (value) => !/^\S+@\S+$/.test(value),
            subject: (value) => !value.trim(),
        },
    });

    return (
        <>
            <Header />
            <Container size="lg">
                <Grid mt="8rem">
                    <Grid.Col span={12} mt="1rem">

                        <Text ta="center"
                            style={{
                                fontWeight: '700',
                                fontSize: '48px',
                                color: 'black', // Set the color for the first half
                                display: 'flex',
                                justifyContent: 'center',

                            }}
                        >
                            Contact US
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Text ta="center"
                            style={{

                                fontWeight: '700',
                                fontSize: '28px',
                                color: 'red',
                                display: 'flex',
                                justifyContent: 'center',

                            }}
                        >
                            (Please contact our amiable and multilingual staff.)
                        </Text>


                    </Grid.Col>
                    <Grid.Col p="md"  span={{ base: 12, xs: 12, sm: 12, md: 12, lg: 6 }} mt="3rem" mb="xl" >
                        <Paper
                            p="sm"
                            style={{
                                border: "0px solid black",
                                borderRadius: "30px",
                                backgroundColor: "#4c0066",
                                color: "#FFFFFF",
                            }}
                        >
                            <Text
                                ml="xl"
                                mt="md"
                                style={{
                                    fontWeight: "600",
                                    fontSize: "30px",
                                    letterSpacing: "-0.5px",
                                }}
                            >
                                Contact Information
                            </Text>

                            <Grid p="xl">
                                <Grid.Col span={1}>@</Grid.Col>
                                <Grid.Col span={11}>
                                    <Text
                                        style={{
                                            fontWeight: "400",
                                            fontSize: "15px",
                                            letterSpacing: "-0.5px",
                                        }}
                                    >
                                        Email
                                    </Text>
                                    <Text
                                        style={{
                                            fontWeight: "500",
                                            fontSize: "20px",
                                            letterSpacing: "-0.5px",
                                        }}
                                    >
                                        hello@gmail.com
                                    </Text>
                                </Grid.Col>
                                <Grid.Col span={1}>@</Grid.Col>
                                <Grid.Col span={11}>
                                    <Text
                                        style={{
                                            fontWeight: "400",
                                            fontSize: "15px",
                                            letterSpacing: "-0.5px",
                                        }}
                                    >
                                        Phone
                                    </Text>
                                    <Text
                                        style={{
                                            fontWeight: "500",
                                            fontSize: "20px",
                                            letterSpacing: "-0.5px",
                                        }}
                                    >
                                        *92389355553
                                    </Text>
                                </Grid.Col>
                                <Grid.Col span={1}>@</Grid.Col>
                                <Grid.Col span={11}>
                                    <Text
                                        style={{
                                            fontWeight: "400",
                                            fontSize: "15px",
                                            letterSpacing: "-0.5px",
                                        }}
                                    >
                                        Address
                                    </Text>
                                    <Text
                                        style={{
                                            fontWeight: "500",
                                            fontSize: "20px",
                                            letterSpacing: "-0.5px",
                                        }}
                                    >
                                        UAE Dubai
                                    </Text>
                                </Grid.Col>
                                <Grid.Col span={1}>@</Grid.Col>
                                <Grid.Col span={11}>
                                    <Text
                                        style={{
                                            fontWeight: "400",
                                            fontSize: "15px",
                                            letterSpacing: "-0.5px",
                                        }}
                                    >
                                        Working Hours
                                    </Text>
                                    <Text
                                        style={{
                                            fontWeight: "500",
                                            fontSize: "20px",
                                            letterSpacing: "-0.5px",
                                        }}
                                    >
                                        10am - 6pm
                                    </Text>
                                </Grid.Col>
                            </Grid>
                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, xs: 12, sm: 12, md: 12, lg: 6 }} mt="3rem" >
                        <form onSubmit={form.onSubmit(() => { })}>
                            <Title
                                order={2}
                                size="h1"
                                style={{
                                    fontFamily: "Greycliff CF, var(--mantine-font-family)",
                                    color: "#4c0066",
                                }}
                                fw={900}
                                ta="center"
                            >
                                Get in touch
                            </Title>

                            <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
                                <TextInput
                                    label="Name"
                                    placeholder="Your name"
                                    name="name"
                                    variant="filled"
                                    {...form.getInputProps("name")}
                                    style={{ color: "black" }}
                                />
                                <TextInput
                                    label="Email"
                                    placeholder="Your email"
                                    name="email"
                                    variant="filled"
                                    {...form.getInputProps("email")}
                                    style={{ color: "black" }}
                                />
                            </SimpleGrid>

                            <TextInput
                                label="Subject"
                                placeholder="Subject"
                                mt="md"
                                name="subject"
                                variant="filled"
                                {...form.getInputProps("subject")}
                                style={{ color: "black" }}
                            />
                            <Textarea
                                mt="md"
                                label="Message"
                                placeholder="Your message"
                                maxRows={10}
                                minRows={5}
                                autosize
                                name="message"
                                variant="filled"
                                {...form.getInputProps("message")}
                                style={{ color: "black" }}
                            />

                            <Group justify="center" mt="xl">
                                <Button
                                    type="submit"
                                    size="md"
                                    style={{
                                        borderRadius: "10px",
                                        backgroundColor: "#4c0066",
                                        fontWeight: "500",
                                        color: "white",
                                        cursor: "pointer",
                                        textDecoration: "none",
                                    }}
                                >
                                    Send message
                                </Button>
                            </Group>
                        </form>
                    </Grid.Col>
                </Grid>
            </Container>
            <Footer />
        </>
    );
};

