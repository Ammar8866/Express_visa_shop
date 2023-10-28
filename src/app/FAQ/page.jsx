'use client';
import React from "react";
import {
    Text,
    Grid,
    Group,
    Container,
    Avatar,
    Accordion,
} from "@mantine/core";

import Header from '../Components/Header';
import Footer from '../Components/Footer';


const charactersList = [
    {
        id: '1',
        image: 'https://cdn.pixabay.com/photo/2017/08/10/14/02/visa-2623015_1280.png',
        label: 'Which time of year is best to apply for a permit in the United Arab Emirates?',
        description: 'Planning a Culinary Journey to the UAE.',
        content: "Now would be the best time. Why delay if you already have an itinerary and are planning to visit the United Arab Emirates? In the upcoming twelve hours, your permission application will be handled.",
    },

    {
        id: '2',
        image: 'https://cdn.pixabay.com/photo/2019/08/30/15/07/passport-4441589_1280.png',
        label: 'Is applying for a UAE permit through an airline possible?',
        description: 'Exploring UAE Permit Options with Airlines.',
        content: "Although it's not their main focus, some airlines do offer permit processing services, however they might not be experts in this field. Rather, and regardless of whether your permission application is approved or denied, their major objective is to maximize ticket sales.",
    },

    {
        id: '3',
        image: 'https://cdn.pixabay.com/photo/2016/03/20/17/22/bank-1269026_1280.jpg',
        label: 'Is expressvisadubai.com permits guaranteed to be authentic? ',
        description: 'Verifying the Authenticity of Expressvisadubai.com Permits.',
        content: 'You can also confirm your permit by going to our website at "Web Address" and inputting your permit number, even though we do provide verification links and e-receipts for each application.',
    },

    {
        id: '4',
        image: 'https://media.istockphoto.com/id/1704368759/photo/dubai-passport.webp?b=1&s=612x612&w=0&k=20&c=-hZ4i5HnJlRPyQVOn3Fpcv3h-nQ4P3JPiRzudSiLHh4=',
        label: 'How long will it take to process my application?',
        description: 'Understanding the Processing Time of Your UAE Permit.',
        content: 'As advertised on our website, after the application procedure is complete, your permission will be provided within 48 to 72 hours, with the exception of weekends and public holidays, when the approval process may take longer owing to the unavailability of authorities. However, we follow the same schedule and process the application the next business day.',
    },

    {
        id: '5',
        image: 'https://cdn.pixabay.com/photo/2018/02/21/05/45/visa-3169503_1280.jpg',
        label: 'Which kinds of permissions are offered by this service?',
        description: 'Types of Permits Available Through Our Service.',
        content: 'We provide two different kinds of permits: "Multiple Entry," which enables you to enter and exit as many times as indicated on the permit, and "Single Entry," which allows you to enter and exit once.',
    },
    {
        id: '6',
        image: 'https://cdn.pixabay.com/photo/2017/10/08/19/35/money-2831248_1280.png',
        label: 'Is it best to purchase my ticket and complete the application process simultaneously?',
        description: 'Coordinating Ticket Purchase with Permit Application.',
        content: 'Of course! Your permit will be issued to you in the allotted period unless there are legal concerns related to your profile.',
    },
];

function AccordionLabel({ label, image, description }) {
    return (
        <Group wrap="nowrap" >
            <Avatar src={image} radius="xl" size="lg" />
            <div>
                <Text size="lg" style={{ fontWeight: '500' }}>{label}</Text>
                <Text size="sm" c="dimmed" fw={400}>
                    {description}
                </Text>
            </div>
        </Group>
    );
}


export default function FAQ() {
    const items = charactersList.map((item) => (
        <Accordion.Item value={item.id} key={item.label} style={{ backgroundColor: "white" }}>
            <Accordion.Control>
                <AccordionLabel label={item.label} image={item.image} description={item.description} />
            </Accordion.Control>
            <Accordion.Panel>
                <Text size="sm">{item.content}</Text>
            </Accordion.Panel>
        </Accordion.Item>
    ));


    return (
        <>
            <Header />
            <Container size="lg">
                <Grid mt="8rem">
                    <Grid.Col span={12} mt="1rem">
                        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: "wrap" }}>
                            <div>
                                <Text ta="center"
                                    style={{
                                        marginRight: "10px",
                                        fontWeight: '700',
                                        fontSize: '45px',
                                        color: 'black', // Set the color for the first half

                                    }}
                                >
                                    FAQs
                                </Text>
                            </div>
                            <div>
                                <Text mt="4px" ta="center"
                                    style={{
                                        fontWeight: '700',
                                        fontSize: '40px',
                                        color: 'red', // Set the color for the second half

                                    }}
                                >
                                    (Frequently Asked Questions)
                                </Text>
                            </div>
                        </div>
                    </Grid.Col>

                    <Grid.Col span={12} mt="1rem">
                        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: "wrap" }}>
                            <div>
                                <Text ta="center"
                                    style={{
                                        marginRight: "10px",
                                        fontWeight: '700',
                                        fontSize: '30px',
                                        color: 'black', // Set the color for the first half

                                    }}
                                >
                                    All the information you require from
                                </Text>
                            </div>
                            <div>
                                <Text mt="4px" ta="center"
                                    style={{
                                        fontWeight: '700',
                                        fontSize: '28px',
                                        color: 'red', // Set the color for the second half

                                    }}
                                >
                                    the expressvisadubai.com Team.
                                </Text>
                            </div>
                        </div>
                    </Grid.Col>
                    <Grid.Col span={12} mt="4rem" mb="3rem">
                        <Accordion chevronPosition="right" variant="separated" >
                            {items}
                        </Accordion>
                    </Grid.Col>

                </Grid>
            </Container>
            <Footer />
        </>
    );
};

