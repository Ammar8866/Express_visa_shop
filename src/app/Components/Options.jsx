/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef } from 'react';
import { Stepper, Button, Group, TextInput, Code, Grid, Text, NumberInput, Card } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { GiPassport } from 'react-icons/gi';
import { CgProfile } from 'react-icons/cg';
import { LiaIdCard } from 'react-icons/lia';
import { PiUploadSimpleBold } from 'react-icons/pi';
import CardData from '../../../Data.json';

export default function Options() {
    const [active, setActive] = useState(0);
    const [value, setValue] = useState(null);
    const [uploadedImages, setUploadedImages] = useState(new Array(CardData.cardData.length).fill(null));
    const [cardHoverStates, setCardHoverStates] = useState(new Array(CardData.cardData.length).fill(false));
    const fileInputs = useRef(Array(CardData.cardData.length).fill(null));

    const buttonStyles = {
        border: '2px solid red',
        transition: 'background-color 0.3s, color 0.3s',
    };

    const iconStyles = {
        marginLeft: '8px',
        transition: 'color 0.3s',
    };

    const handleCardMouseEnter = (index) => {
        if (uploadedImages[index]) {
            return;
        }

        const newHoverStates = [...cardHoverStates];
        newHoverStates[index] = true;
        setCardHoverStates(newHoverStates);
    };

    const handleCardMouseLeave = (index) => {
        if (uploadedImages[index]) {
            return;
        }

        const newHoverStates = [...cardHoverStates];
        newHoverStates[index] = false;
        setCardHoverStates(newHoverStates);
    };

    const handleImageDelete = (index) => {
        const newImages = [...uploadedImages];
        newImages[index] = null; // Set the image to null to remove it
        setUploadedImages(newImages);
    };


    const handleImageUpload = (index, file) => {
        if (!file) {
            console.log('No file selected');
            return;
        }

        console.log('File selected:', file);

        // Check the file format and size
        const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
        if (!allowedFormats.includes(file.type)) {
            console.error('Invalid file format. Please upload a valid image or PDF file.');
            return;
        }

        if (file.size > 4 * 1024 * 1024) {
            console.error('File size is too large. Maximum size allowed is 4MB.');
            return;
        }

        const imageUrl = URL.createObjectURL(file);

        const newImages = [...uploadedImages];
        newImages[index] = imageUrl;
        setUploadedImages(newImages);

        const newHoverStates = [...cardHoverStates];
        newHoverStates[index] = false; // Reset hover state when image is uploaded
        setCardHoverStates(newHoverStates);
    };


    const form = useForm({
        initialValues: {
            username: '',
            passportnumber: '',
            name: '',
            email: '',
            website: '',
            github: '',
        },

        validate: (values) => {
            if (active === 0) {
                return {
                    username:
                        values.username.trim().length < 6
                            ? 'Username must include at least 6 characters'
                            : null,
                    passportnumber:
                        hasLength({ min: 2, max: 10 }, 'Phone Number must be 2-10 characters long'),
                };
            }

            if (active === 1) {
                return {
                    name: values.name.trim().length < 2 ? 'Name must include at least 2 characters' : null,
                    email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
                };
            }

            return {};
        },
    });

    const nextStep = () =>
        setActive((current) => {
            if (form.validate().hasErrors) {
                return current;
            }
            return current < 3 ? current + 1 : current;
        });

    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

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
                        UAE Visa Application Form
                    </Text>
                </Grid.Col>
                <Grid.Col span={12}>
                    <Stepper active={active}>


                        <Stepper.Step label="First step" description="Application Form">
                            <Grid.Col span={12}>
                                <Text style={{
                                    fontWeight: "700",
                                    fontSize: "22px",
                                    color: "black",
                                    display: "flex",
                                    justifyContent: "left",
                                }}>Applicant 1</Text>
                            </Grid.Col>

                            <Grid.Col span={12} style={{ display: "flex" }}>

                                <TextInput style={{ width: "50%" }} mr="lg" label="Applicant Full Name" placeholder="Enter Full Name" withAsterisk {...form.getInputProps('username')} />
                                <DateInput
                                    withAsterisk
                                    style={{ width: '50%' }}
                                    mr="lg"
                                    valueFormat="YYYY MMM DD"
                                    label="Date input"
                                    placeholder="Select DOB"
                                    value={value}
                                    onChange={setValue}
                                />


                            </Grid.Col>
                            <Grid.Col span={12} style={{ display: "flex" }}>
                                <NumberInput style={{ width: "50%" }} mr="lg" label="Passport Number" placeholder="Enter Passport Number" withAsterisk {...form.getInputProps('passportnumber')} />
                                <DateInput
                                    withAsterisk
                                    style={{ width: '50%' }}
                                    mr="lg"
                                    valueFormat="YYYY MMM DD"
                                    label="Date input"
                                    placeholder="Select DOB"
                                    value={value}
                                    onChange={setValue}
                                />
                            </Grid.Col>
                            <Grid.Col span={12}>
                                <Text mt="xl" style={{
                                    fontWeight: "700",
                                    fontSize: "22px",
                                    color: "black",

                                    display: "flex",
                                    justifyContent: "left",
                                }}>Upload Documents
                                </Text>

                                <Text style={{
                                    fontWeight: "400",
                                    fontSize: "15px",
                                    color: "#858784",
                                    display: "flex",
                                    justifyContent: "left",
                                }}>File accepted: pdf, jpg and png.
                                </Text>
                            </Grid.Col>

                            {/* ----------Upload Photos---------- */}

                            <Grid.Col span={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                {CardData.cardData.map((card, index) => (
                                    <Card
                                        p="3rem"
                                        shadow="lg"
                                        radius="md"
                                        style={{ backgroundColor: 'white', border: '2px solid #e98286', width: '32%' }}
                                        key={index}
                                    >
                                        <Card.Section>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                {uploadedImages[index] ? (
                                                    <div style={{ position: 'relative' }}>
                                                        <img
                                                            src={uploadedImages[index]}
                                                            alt="Uploaded"
                                                            style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                                        />
                                                        <button
                                                            onClick={() => handleImageDelete(index)}
                                                            style={{
                                                                position: 'absolute',
                                                                top: '5',
                                                                right: '5',
                                                                background: 'transparent',
                                                                border: 'none',
                                                            }}
                                                        >
                                                            <span role="img" aria-label="Delete" style={{ fontSize: '20px', color: 'red' }}>
                                                                &#10060;
                                                            </span>
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <>
                                                        {card.icon === 'GiPassport' ? (
                                                            <GiPassport size="60px" style={{ color: cardHoverStates[index] ? 'white' : '#999999' }} />
                                                        ) : card.icon === 'CgProfile' ? (
                                                            <CgProfile size="60px" style={{ color: cardHoverStates[index] ? 'white' : '#999999' }} />
                                                        ) : (
                                                            <LiaIdCard size="60px" style={{ color: cardHoverStates[index] ? 'white' : '#999999' }} />
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                            <Text
                                                mt="1rem"
                                                mb="md"
                                                style={{
                                                    fontWeight: '600',
                                                    fontSize: '25px',
                                                    color: 'black',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                {card.title}
                                            </Text>

                                            <Text
                                                mb="lg"
                                                style={{
                                                    fontWeight: '400',
                                                    fontSize: '15px',
                                                    color: 'black',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                {card.description}
                                            </Text>

                                            <Text
                                                mt="sm"
                                                mb="sm"
                                                style={{
                                                    fontWeight: '400',
                                                    fontSize: '14px',
                                                    color: 'red',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                {card.errorMessage}
                                            </Text>
                                            <Group style={{ display: 'flex', justifyContent: 'center' }}>
                                                <Button
                                                    size="md"
                                                    radius="md"
                                                    type="submit"
                                                    style={{
                                                        ...buttonStyles,
                                                        backgroundColor: cardHoverStates[index] ? 'red' : 'transparent',
                                                        color: cardHoverStates[index] ? 'white' : 'red',
                                                    }}
                                                    onMouseEnter={() => handleCardMouseEnter(index)}
                                                    onMouseLeave={() => handleCardMouseLeave(index)}
                                                    onClick={() => {
                                                        console.log('Upload button clicked for index:', index);
                                                        console.log('File input:', fileInputs[index]);
                                                        fileInputs[index].click(); // Trigger the file input
                                                    }}
                                                >
                                                    Upload{' '}
                                                    <PiUploadSimpleBold
                                                        style={{
                                                            ...iconStyles,
                                                            color: cardHoverStates[index] ? 'white' : 'red',
                                                        }}
                                                    />
                                                </Button>
                                            </Group>

                                            {/* Add the input for image upload here */}
                                            <input
                                                type="file"
                                                accept=".jpg, .jpeg, .png, .pdf"
                                                onChange={(e) => {
                                                    console.log('File selected for index:', index, e.target.files[0]);
                                                    handleImageUpload(index, e.target.files[0]);
                                                }}
                                                style={{ display: 'none' }}
                                                ref={(input) => (fileInputs[index] = input)}
                                            />
                                        </Card.Section>
                                    </Card>
                                ))}
                            </Grid.Col>


                        </Stepper.Step>










                        <Stepper.Step label="Second step" description="Personal information">
                            <TextInput label="Name" placeholder="Name" {...form.getInputProps('name')} />
                            <TextInput mt="md" label="Email" placeholder="Email" {...form.getInputProps('email')} />
                        </Stepper.Step>

                        <Stepper.Step label="Final step" description="Social media">
                            <TextInput label="Website" placeholder="Website" {...form.getInputProps('website')} />
                            <TextInput
                                mt="md"
                                label="GitHub"
                                placeholder="GitHub"
                                {...form.getInputProps('github')}
                            />
                        </Stepper.Step>
                        <Stepper.Completed>
                            Completed! Form values:
                            <Code block mt="xl">
                                {JSON.stringify(form.values, null, 2)}
                            </Code>
                        </Stepper.Completed>
                    </Stepper>

                    <Group justify="flex-end" mt="xl">
                        {active !== 0 && (
                            <Button variant="default" onClick={prevStep}>
                                Back
                            </Button>
                        )}
                        {active !== 3 && <Button style={{ backgroundColor: "#4c0066" }} onClick={nextStep}>Next step</Button>}
                    </Group>

                </Grid.Col>

            </Grid>
        </>
    );
}