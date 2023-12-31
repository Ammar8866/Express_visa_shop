/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef } from 'react';
import {
    Stepper, Button, Group, Code, Grid, Text, Card, Paper, Divider
} from '@mantine/core';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from '@mantine/form';
import { GiPassport } from 'react-icons/gi';
import { CgProfile } from 'react-icons/cg';
import { LiaIdCard } from 'react-icons/lia';
import { PiUploadSimpleBold } from 'react-icons/pi';
import CardData from '../../../Data.json';
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import VisaData from '../../../Data.json';

import {
    Typography, Select, MenuItem, FormControl, InputLabel
} from "@mui/material";


export default function Form({ selectedCountry, selectedPlan, setSelectedCountry, countries, setSelectedPlan }) {
    const label = `${selectedPlan.title} - ${selectedPlan.description} - ${selectedPlan.price}`;
    const [active, setActive] = useState(0);
    const [uploadedImages, setUploadedImages] = useState(new Array(CardData.cardData.length).fill(null));
    const [cardHoverStates, setCardHoverStates] = useState(new Array(CardData.cardData.length).fill(false));
    const fileInputs = useRef(Array(CardData.cardData.length).fill(null));
    const [isHovered, setIsHovered] = useState(false);
    const [selectedPaymentType, setSelectedPaymentType] = useState('');

    const handlePaymentTypeChange = (event) => {
        setSelectedPaymentType(event.target.value);
    };


    const buttonStyle2 = {

        borderRadius: "8px",
        backgroundColor: isHovered ? "red" : "#4c0066",
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


    const nextStep = () => {
        const errors = form.validate().errors;
        const missingImages = uploadedImages.includes(null);

        if (Object.keys(errors).length > 0 || missingImages) {
            if (missingImages) {
                alert('Please upload all Required images.');
            } else {
                alert('Please complete all the Required fields.');
            }
            return;
        }

        setActive((current) => {
            return current < 3 ? current + 1 : current;
        });
    };

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
        newImages[index] = null;
        setUploadedImages(newImages);
    };

    const handleImageUpload = (index, file) => {
        if (!file) {
            console.log('No file selected');
            return;
        }

        console.log('File selected:', file);

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
        newHoverStates[index] = false;
        setCardHoverStates(newHoverStates);
    };


    const form = useForm({
        initialValues: {
            username: '',
            email: '',
            mobilenumber: '',
            passportnumber: '',

            profession: '',
            travelpurpose: '',
            arrivalDate: null,
            passportExpiry: null,
            creditCard: '',
            holdername: '',
            expiryDate: '',
            cvv: '',
            paymentType: '',
        },
        validate: (values) => {
            if (active === 0) {
                return {};
            } else if (active === 1) {
                return {
                    username: values.username.trim().length < 6 ? 'Username must include at least 6 characters' : null,
                    email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
                    mobilenumber: values.mobilenumber.trim().length < 6 ? 'Mobile Number must include at least 6 characters' : null,
                    passportnumber: values.passportnumber.trim().length < 6 ? 'Passport Number must include at least 6 characters' : null,


                    profession: values.profession ? null : 'Please Enter your Profession',
                    travelpurpose: values.travelpurpose ? null : 'Please Enter What is the Purpose of your travelling ',
                    arrivalDate: !values.arrivalDate ? 'Arrival Date is required' : null,
                    passportExpiry: !values.passportExpiry ? 'Passport Expiry Date is required' : null,

                };
            } else if (active === 2) {
                return {
                    creditCard: !values.creditCard ? 'Credit Card Number is required' : null,
                    holdername: values.holdername.trim().length < 3 ? 'Card Holder Name must include at least 3 characters' : null,
                    expiryDate: !values.expiryDate ? 'Expiry Date is required' : null,
                    cvv: !values.cvv ? 'CVV is required' : null,
                    paymentType: !values.paymentType ? 'Payment Type is required' : null,
                };
            }
            return {};
        },
    });

    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    return (
        <>
            <Grid>
                <Grid.Col span={12} mt="4rem">
                    <div id="form">
                        <Text
                            ta="center"
                            mb="lg"
                            style={{
                                fontWeight: '700',
                                fontSize: '38px',
                                color: 'black',
                                lineHeight: '82px',
                                letterSpacing: '-0.5 px',
                                display: 'flex',
                                justifyContent: 'center',

                            }}
                        >
                            Online UAE Visa Application Form
                        </Text>
                    </div>
                </Grid.Col>
                <Grid.Col span={12}>
                    <Paper
                        p="xl"
                        radius="lg"
                        style={{
                            boxShadow: '2px 5px 20px #e9e9e9',
                        }}>
                        <Stepper active={active} mt="3rem">
                            <Stepper.Step label="First step" description="Upload Documents">
                                <Grid.Col span={12}>
                                    <Text
                                        mt="xl"
                                        style={{
                                            fontWeight: '700',
                                            fontSize: '22px',
                                            color: 'black',
                                            display: 'flex',
                                            justifyContent: 'left',
                                        }}
                                    >
                                        Upload Documents
                                    </Text>
                                    <Text
                                        style={{
                                            fontWeight: '400',
                                            fontSize: '15px',
                                            color: '#858784',
                                            display: 'flex',
                                            justifyContent: 'left',
                                        }}
                                    >
                                        File accepted: pdf, jpg, and png.
                                    </Text>
                                </Grid.Col>

                                {/* ----------Upload Photos---------- */}
                                <Grid>
                                    {CardData.cardData.map((card, index) => (
                                        <Grid.Col
                                            span={{ base: 12, xs: 12, sm: 12, md: 6, lg: 4 }}
                                            key={card.id}

                                        >

                                            <Card
                                                p="3rem"
                                                mt="md"
                                                shadow="lg"
                                                radius="md"
                                                style={{ backgroundColor: 'white', border: '2px solid #e98286' }}
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
                                                                fileInputs[index].click();
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
                                        </Grid.Col>
                                    ))}

                                </Grid>
                            </Stepper.Step>

                            <Stepper.Step label="Second step" description="Personal information">
                                <Grid.Col span={12}>
                                    <Text
                                        mt="md"
                                        mb="md"
                                        style={{
                                            fontWeight: '700',
                                            fontSize: '22px',
                                            color: 'black',
                                            display: 'flex',
                                            justifyContent: 'left',
                                        }}
                                    >
                                        Personal Information
                                    </Text>
                                </Grid.Col>
                                <Grid style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Grid.Col span={{ lg: 6 }}>
                                        <TextField
                                            style={{ width: '500px' }}
                                            id="standard-basic"
                                            variant="standard"
                                            label="Applicant Full Name"
                                            placeholder="Enter Full Name"
                                            {...form.getInputProps('username')}
                                            error={form.errors.username}
                                            helperText={form.errors.username}
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={{ lg: 6 }}>
                                        <TextField
                                            id="standard-basic"
                                            style={{ width: '500px' }}
                                            variant="standard"
                                            label="Email"
                                            placeholder="Email"
                                            {...form.getInputProps('email')}
                                            error={form.errors.email}
                                            helperText={form.errors.email}
                                        />
                                    </Grid.Col>

                                </Grid>

                                <Grid style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Grid.Col span={{ lg: 6 }}>
                                        <TextField
                                            id="standard-basic"
                                            style={{ width: '500px', marginTop: '10px' }}
                                            variant="standard"
                                            label="Mobile Number"
                                            placeholder="Enter Mobile Number"
                                            {...form.getInputProps('mobilenumber')}
                                            error={form.errors.mobilenumber}
                                            helperText={form.errors.mobilenumber}
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={{ lg: 6 }}>
                                        <TextField
                                            style={{ width: '500px', marginTop: '10px' }}
                                            id="standard-basic"
                                            variant="standard"
                                            label="Passport Number"
                                            placeholder="Enter Passport Number"
                                            {...form.getInputProps('passportnumber')}
                                            error={form.errors.passportnumber}
                                            helperText={form.errors.passportnumber}
                                        />
                                    </Grid.Col>

                                </Grid>



                                <Grid style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Grid.Col span={{ lg: 6 }}>
                                        <FormControl variant="standard" style={{ width: '500px', marginTop: '10px' }}>
                                            <InputLabel id="nationality-label">Nationality</InputLabel>
                                            <Select

                                                labelId="nationality-label"
                                                id="nationality-select"
                                                value={selectedCountry}
                                                onChange={(e) => setSelectedCountry(e.target.value)}

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
                                    </Grid.Col>

                                    <Grid.Col span={{ lg: 6 }}>
                                        <FormControl variant="standard" style={{ width: '500px', marginTop: '10px' }}>
                                            <InputLabel id="visa-type-label">Visa Type</InputLabel>
                                            <Select
                                                labelId="visa-type-label"
                                                id="visa-type-select"
                                                value={selectedPlan}
                                                onChange={(e) => setSelectedPlan(e.target.value)}
                                            >
                                                <MenuItem value="">Select Visa Type</MenuItem>
                                                {VisaData.visaData.map((data)=>(
                                                    <MenuItem key={data.id} value={data}>{`${data.title} - ${data.description} - ${data.price} USD`}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid.Col>
                                </Grid>


                                <Grid style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Grid.Col span={{ lg: 6 }}>
                                        <TextField
                                            style={{ width: '500px', marginTop: '10px' }}
                                            id="standard-basic"
                                            variant="standard"
                                            label="Profession"
                                            placeholder="Enter your Profession"
                                            {...form.getInputProps('profession')}
                                            error={form.errors.profession}
                                            helperText={form.errors.profession}
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={{ lg: 6 }}>
                                        <TextField
                                            style={{ width: '500px', marginTop: '10px' }}
                                            id="standard-basic"
                                            variant="standard"
                                            label="Purpose of Travel"
                                            placeholder="Enter the Purpose of your Travel"
                                            {...form.getInputProps('travelpurpose')}
                                            error={form.errors.travelpurpose}
                                            helperText={form.errors.travelpurpose}
                                        />
                                    </Grid.Col>

                                </Grid>



                                <Grid style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Grid.Col span={{ lg: 6 }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DatePicker']}>
                                                <DatePicker
                                                    label="Arrival Date"
                                                    id="arrival-date"
                                                    slotProps={{ textField: { variant: 'standard' } }}
                                                    sx={{
                                                        height: '50px',
                                                        width: '500px',
                                                        overflow: 'hidden',
                                                        '& .MuiIconButton-root': {
                                                            marginRight: '5px',
                                                        },
                                                    }}
                                                    InputProps={{
                                                        style: {
                                                            backgroundColor: 'lightgray',
                                                            color: 'black',
                                                        },
                                                    }}
                                                    InputLabelProps={{
                                                        style: {
                                                            color: 'blue',
                                                            position: 'static',
                                                            transform: 'none',
                                                        },
                                                    }}
                                                    value={form.values.arrivalDate}
                                                    onChange={(date) => form.setFieldValue('arrivalDate', date)}
                                                    error={form.errors.arrivalDate}
                                                    helperText={form.errors.arrivalDate}
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </Grid.Col>
                                    <Grid.Col span={{ lg: 6 }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DatePicker']}>
                                                <DatePicker
                                                    label="Passport Expiry"
                                                    id="passport-expiry"
                                                    slotProps={{ textField: { variant: 'standard' } }}
                                                    sx={{
                                                        height: '50px',
                                                        width: '500px',
                                                        overflow: 'hidden',
                                                        '& .MuiIconButton-root': {
                                                            marginRight: '5px',
                                                        },
                                                    }}
                                                    InputProps={{
                                                        style: {
                                                            backgroundColor: 'lightgray',
                                                            color: 'black',
                                                        },
                                                    }}
                                                    InputLabelProps={{
                                                        style: {
                                                            color: 'blue',
                                                            position: 'static',
                                                            transform: 'none',
                                                        },
                                                    }}
                                                    value={form.values.passportExpiry}
                                                    onChange={(date) => form.setFieldValue('passportExpiry', date)}
                                                    error={form.errors.passportExpiry}
                                                    helperText={form.errors.passportExpiry}
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </Grid.Col>
                                </Grid>
                            </Stepper.Step>

                            <Stepper.Step label="Payment Method" description="Choose your payment method">

                                <Grid.Col style={{ display: "flex" }}>
                                    <Grid.Col span={8}>
                                        <Grid.Col >
                                            <Text
                                                mt="lg"
                                                style={{
                                                    fontWeight: '700',
                                                    fontSize: '22px',
                                                    color: 'black',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                Order Summary
                                            </Text>
                                        </Grid.Col>



                                        <Paper mr="lg" p="md" mt="1rem" style={{ backgroundColor: "#F8EBFC" }}>
                                            <Grid.Col span={12} style={{ display: "flex" }}>
                                                <Typography variant="h6" color="textSecondary" style={{ marginRight: "40px" }}>
                                                    Selected Nationality:
                                                </Typography>
                                                <Typography variant="h6">{selectedCountry || "Not Selected"}</Typography>
                                            </Grid.Col>
                                        </Paper>


                                        <Paper mr="lg" p="md" mt="1rem" style={{ backgroundColor: "#F8EBFC" }}>
                                            <Grid.Col style={{ display: "flex", justifyContent: "space-between" }}>
                                                <Grid.Col span={4}>
                                                    <Typography variant="body2" color="textSecondary">Visa Type</Typography>
                                                    <Typography variant="h6">{selectedPlan.title || "Not Selected"}</Typography>
                                                </Grid.Col>
                                                <Grid.Col span={5}>
                                                    <Typography variant="body2" color="textSecondary">Visa Entry</Typography>
                                                    <Typography variant="h6">{selectedPlan.description || "Not Selected"}</Typography>
                                                </Grid.Col>
                                                <Grid.Col span={3}>
                                                    <Typography variant="body2" color="textSecondary">Price</Typography>
                                                    <Typography variant="h6" color="textSecondary">
                                                        {selectedPlan.price || "Not Selected"} USD
                                                    </Typography>
                                                </Grid.Col>
                                            </Grid.Col>
                                        </Paper>


                                        <Paper mr="lg" p="md" mt="1rem" style={{ backgroundColor: "#F8EBFC" }}>
                                            <Grid.Col style={{ display: "flex", justifyContent: "space-between" }}>
                                                <Grid.Col span={9}>
                                                    <Typography variant="h6" color="textSecondary" style={{ marginRight: "40px" }}>
                                                        Total (Incl. taxes)
                                                    </Typography>
                                                </Grid.Col>

                                                <Grid.Col span={3}>
                                                    <Typography variant="h6"> {selectedPlan.price || "Not Selected"} USD</Typography>
                                                </Grid.Col>
                                            </Grid.Col>
                                        </Paper>

                                    </Grid.Col>


                                    <Divider size="sm" orientation="vertical" />


                                    <Grid.Col span={4}>
                                        <Grid.Col span={12}>
                                            <Text
                                                mt="md"
                                                mr="lg"
                                                style={{
                                                    fontWeight: '700',
                                                    fontSize: '22px',
                                                    color: 'black',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                Payment Details
                                            </Text>
                                            <Text

                                                style={{
                                                    fontWeight: '400',
                                                    fontSize: '15px',
                                                    color: 'black',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                All transactions are secure and encrypted.
                                            </Text>
                                        </Grid.Col>
                                        <Grid.Col span={12}>
                                            <TextField
                                                id="standard-basic"
                                                variant="standard"

                                                style={{ width: '100%', display: "flex", justifyContent: "center" }}
                                                label="Credit or Debit Card Number"
                                                placeholder="Credit Card Number"
                                                {...form.getInputProps('creditCard')}
                                                error={form.errors.creditCard}
                                                helperText={form.errors.creditCard}
                                            />
                                        </Grid.Col>
                                        <Grid.Col span={12}>
                                            <TextField
                                                id="standard-basic"
                                                variant="standard"
                                                style={{ width: '100%' }}
                                                label="Card Holder's Name"
                                                placeholder="Card Holder's Name"
                                                {...form.getInputProps('holdername')}
                                                error={form.errors.holdername}
                                                helperText={form.errors.holdername}
                                            />
                                        </Grid.Col>
                                        <Grid.Col span={12}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['DatePicker']}>
                                                    <DatePicker
                                                        label="Expiry Date"
                                                        id="expiry-Date"
                                                        slotProps={{ textField: { variant: 'standard' } }}
                                                        sx={{
                                                            height: '50px',
                                                            width: '100%',

                                                            overflow: 'hidden',
                                                            '& .MuiIconButton-root': {
                                                                marginRight: '5px',
                                                            },
                                                        }}
                                                        InputProps={{
                                                            style: {
                                                                backgroundColor: 'lightgray',
                                                                color: 'black',
                                                            },
                                                        }}
                                                        InputLabelProps={{
                                                            style: {
                                                                color: 'blue',
                                                                position: 'static',
                                                                transform: 'none',
                                                            },
                                                        }}
                                                        value={form.values.expiryDate}
                                                        onChange={(date) => form.setFieldValue('expiryDate', date)}
                                                        error={form.errors.expiryDate}
                                                        helperText={form.errors.expiryDate}
                                                    />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                        </Grid.Col>
                                        <Grid.Col span={12}>
                                            <TextField
                                                id="standard-basic"
                                                variant="standard"
                                                style={{ width: '100%' }}
                                                label="CVV Code"
                                                placeholder="CVV Code"
                                                {...form.getInputProps('cvv')}
                                                error={form.errors.cvv}
                                                helperText={form.errors.cvv}
                                            />
                                        </Grid.Col>
                                        <Grid.Col span={12}>
                                            <div>
                                                <Text style={{ marginBottom: '0.5rem' }}>Payment Type:</Text>
                                                <select {...form.getInputProps('paymentType')} error={form.errors.paymentType}>
                                                    <option value="">Select Payment Type</option>
                                                    <option value="creditCard">Credit Card</option>
                                                    <option value="paypal">PayPal</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>
                                        </Grid.Col>
                                    </Grid.Col>
                                </Grid.Col>

                            </Stepper.Step>

                            <Stepper.Completed>
                                Completed! Form values:

                                <Code block mt="xl">
                                    {JSON.stringify({
                                        ...form.values, nationality: selectedCountry,
                                        visaType: selectedPlan.title,
                                        visaEntry: selectedPlan.description,
                                        price: selectedPlan.price,
                                    }, null, 2)}
                                </Code>
                            </Stepper.Completed>
                        </Stepper>

                        <Group justify="flex-end" mt="xl">
                            {active !== 0 && (
                                <Button variant="default" onClick={prevStep}>
                                    Back
                                </Button>
                            )}
                            {active !== 3 && <Button onClick={nextStep} style={buttonStyle2}
                                onMouseEnter={() => handleButtonMouseEnter()}
                                onMouseLeave={() => handleButtonMouseLeave()} >Next step</Button>}
                        </Group>
                    </Paper>
                </Grid.Col>
            </Grid >
        </>
    );
}


