/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef } from 'react';
import { Stepper, Button, Group, Code, Grid, Text, Card, Paper } from '@mantine/core';
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

export default function Form() {
    const [active, setActive] = useState(0);
    const [uploadedImages, setUploadedImages] = useState(new Array(CardData.cardData.length).fill(null));
    const [cardHoverStates, setCardHoverStates] = useState(new Array(CardData.cardData.length).fill(false));
    const fileInputs = useRef(Array(CardData.cardData.length).fill(null));

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
            passportnumber: '',
            name: '',
            email: '',
            mobilenumber: '',
            whatsappnumber: '',
            arrivalDate: null,
            passportExpiry: null,
            creditCard: '',
            expiryDate: '',
            cvv: '',
            paymentType: '',
        },
        validate: (values) => {
            if (active === 0) {
                return {
                    username: values.username.trim().length < 6 ? 'Username must include at least 6 characters' : null,
                    passportnumber: values.passportnumber.trim().length < 6 ? 'Passport Number must include at least 6 characters' : null,
                    arrivalDate: values.arrivalDate ? null : 'Arrival Date is required',
                    passportExpiry: values.passportExpiry ? null : 'Passport Expiry Date is required',
                };
            } else if (active === 1) {
                return {
                    name: values.name.trim().length < 3 ? 'Name must include at least 3 characters' : null,
                    email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
                    mobilenumber: values.mobilenumber.trim().length < 6 ? 'Mobile Number must include at least 6 characters' : null,
                    whatsappnumber: values.whatsappnumber.trim().length < 6 ? 'WhatsApp Number must include at least 6 characters' : null,
                };
            } else if (active === 2) {
                return {
                    creditCard: !values.creditCard ? 'Credit Card Number is required' : null,
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
                    <Text
                        mb="lg"
                        style={{
                            fontWeight: '700',
                            fontSize: '40px',
                            color: 'black',
                            lineHeight: '82px',
                            letterSpacing: '-0.5 px',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        Online UAE Visa Application Form
                    </Text>
                </Grid.Col>
                <Grid.Col span={12}>
                    <Stepper active={active}>
                        <Stepper.Step label="First step" description="Application Form">
                            <Grid.Col span={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Text
                                    mt="md"
                                    style={{
                                        fontWeight: '700',
                                        fontSize: '22px',
                                        color: 'black',
                                        display: 'flex',
                                        justifyContent: 'left',
                                    }}
                                >
                                    Applicant 1
                                </Text>
                            </Grid.Col>

                            <Grid.Col span={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <TextField
                                    style={{ width: '525px' }}
                                    id="standard-basic"
                                    variant="standard"
                                    label="Applicant Full Name"
                                    placeholder="Enter Full Name"
                                    {...form.getInputProps('username')}
                                    error={form.errors.username}
                                    helperText={form.errors.username}
                                />

                                <TextField
                                    style={{ width: '525px' }}
                                    id="standard-basic"
                                    variant="standard"
                                    label="Passport Number"
                                    placeholder="Enter Passport Number"
                                    {...form.getInputProps('passportnumber')}
                                    error={form.errors.passportnumber}
                                    helperText={form.errors.passportnumber}
                                />
                            </Grid.Col>
                            <Grid.Col span={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker
                                            label="Arrival Date"
                                            id="arrival-date"
                                            slotProps={{ textField: { variant: 'standard' } }}
                                            sx={{
                                                height: '50px',
                                                width: '525px',
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

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker
                                            label="Passport Expiry"
                                            id="passport-expiry"
                                            slotProps={{ textField: { variant: 'standard' } }}
                                            sx={{
                                                height: '50px',
                                                width: '525px',
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

                            <Grid.Col span={{ base: 12, xs: 12, sm: 12, md: 6, lg: 12 }} style={{ display: 'flex', justifyContent: 'space-between' }}>
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
                                ))}
                            </Grid.Col>
                        </Stepper.Step>

                        <Stepper.Step label="Second step" description="Personal information">
                            <Text
                                mt="md"
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
                            <TextField
                                id="standard-basic"
                                style={{ width: '48%', marginRight: '4%', marginTop: '10px' }}
                                variant="standard"
                                label="Your Full Name"
                                placeholder="Your Full Name"
                                {...form.getInputProps('name')}
                                error={form.errors.name}
                                helperText={form.errors.name}
                            />
                            <TextField
                                id="standard-basic"
                                style={{ width: '48%', marginTop: '10px' }}
                                variant="standard"
                                label="Email"
                                placeholder="Email"
                                {...form.getInputProps('email')}
                                error={form.errors.email}
                                helperText={form.errors.email}
                            />
                            <TextField
                                id="standard-basic"
                                style={{ width: '48%', marginRight: '4%', marginTop: '25px' }}
                                variant="standard"
                                label="Mobile Number"
                                placeholder="Enter Mobile Number"
                                withAsterisk
                                {...form.getInputProps('mobilenumber')}
                                error={form.errors.mobilenumber}
                                helperText={form.errors.mobilenumber}
                            />
                            <TextField
                                id="standard-basic"
                                style={{ width: '48%', marginTop: '25px' }}
                                variant="standard"
                                label="WhatsApp Number"
                                placeholder="Enter WhatsApp Number"
                                withAsterisk
                                {...form.getInputProps('whatsappnumber')}
                                error={form.errors.whatsappnumber}
                                helperText={form.errors.whatsappnumber}
                            />
                        </Stepper.Step>

                        <Stepper.Step label="Payment Method" description="Choose your payment method">
                            <Grid.Col span={12}>
                                <TextField
                                    id="standard-basic"
                                    variant="standard"
                                    label="Credit Card Number"
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
                                    label="Expiry Date"
                                    placeholder="MM/YYYY"
                                    {...form.getInputProps('expiryDate')}
                                    error={form.errors.expiryDate}
                                    helperText={form.errors.expiryDate}
                                />
                            </Grid.Col>
                            <Grid.Col span={12}>
                                <TextField
                                    id="standard-basic"
                                    variant="standard"
                                    label="CVV"
                                    placeholder="CVV"
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

                            <Group style={{ justifyContent: 'space-between', marginTop: '1rem' }}>
                                {active !== 0 && (
                                    <Button variant="default" onClick={() => setActive(active - 1)}>
                                        Back
                                    </Button>
                                )}
                                {active < 3 && (
                                    <Button
                                        style={{ backgroundColor: '#4c0066', color: 'white' }}
                                        onClick={() => {
                                            if (form.validate().hasErrors) {
                                                return;
                                            }
                                            setActive(active + 1);
                                        }}
                                    >
                                        Next Step
                                    </Button>
                                )}
                            </Group>
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
                        {active !== 3 && <Button style={{ backgroundColor: "#4c0066" }} onClick={nextStep} >Next step</Button>}
                    </Group>
                </Grid.Col>
            </Grid>
        </>
    );
}


