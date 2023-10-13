import { useState, useEffect } from 'react';
import { useForm, hasLength, isEmail, isNotEmpty } from '@mantine/form';
import { Button, Group, TextInput, NumberInput, Box, Grid, Text, NativeSelect, Select, Textarea, Divider } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import axios from 'axios';


export default function VisaForm() {
    const [value, setValue] = useState(null);
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then((response) => {
                const countryOptions = response.data.map((country) => ({
                    value: country.cca2,
                    label: country.name.common,
                }));
                setCountries(countryOptions);
            })
            .catch((error) => console.error('Error fetching countries', error));
    }, []);



    const form = useForm({
        initialValues: {
            fname: '',
            lname: '',
            address: '',
            city: '',
            state: '',
            job: '',
            email: '',
            number: '',
            Whatsappnumber: '',
            passnumber: '',
        },

        validate: {
            fname: hasLength({ min: 2, max: 10 }, 'First Name must be 2-10 characters long'),
            lname: hasLength({ min: 2, max: 10 }, 'Last Name must be 2-10 characters long'),
            address: hasLength({ min: 2, max: 10 }, 'Address must be 2-10 characters long'),
            city: hasLength({ min: 2, max: 10 }, 'City Name must be 2-10 characters long'),
            state: hasLength({ min: 2, max: 10 }, 'State Name must be 2-10 characters long'),
            job: isNotEmpty('Enter your current job'),
            email: isEmail('Invalid email'),
            number: hasLength({ min: 2, max: 10 }, 'Phone Number must be 2-10 characters long'),
            Whatsappnumber: hasLength({ min: 2, max: 10 }, 'Phone Number must be 2-10 characters long'),
            passnumber: hasLength({ min: 2, max: 10 }, 'Phone Number must be 2-10 characters long'),
        },
    });

    return (
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
                    Online UAE Tourist Visa Entry Form
                </Text>
            </Grid.Col>
            <Grid.Col>
                <Box component="form" onSubmit={form.onSubmit(() => { })}>
                    <Grid.Col style={{ display: 'flex' }}>
                        <Select
                            style={{ width: '50%', marginRight: '16px' }}
                            mt="md"
                            withAsterisk
                            id="nationality"
                            label="Nationality"
                            placeholder="Select Nationality"
                            data={countries}
                        />

                        <NativeSelect
                            style={{ width: '50%' }}
                            mt="md"
                            withAsterisk
                            label="Visa Entry Type"
                            placeholder="Please Select"
                            data={['Please Select', 'React', 'Angular', 'Vue', 'Svelte']}
                        />
                    </Grid.Col>

                    <Grid.Col span={12} style={{ display: "flex" }}>
                        <TextInput style={{ width: "50%" }} mr="lg" label="First Name" placeholder="First Name" withAsterisk {...form.getInputProps('fname')} />
                        <TextInput style={{ width: "50%" }} mr="lg" label="Last Name" placeholder="Last Name" withAsterisk {...form.getInputProps('lname')} />
                        <TextInput style={{ width: "50%" }} mr="lg" label="City" placeholder="City" withAsterisk {...form.getInputProps('city')} />
                        <TextInput style={{ width: "50%" }} label="State / Province" placeholder="State" withAsterisk {...form.getInputProps('state')} />
                    </Grid.Col>


                    <Grid.Col span={12}>
                        <Textarea
                            withAsterisk
                            {...form.getInputProps('address')}
                            label="Current Address (where you are currently staying)"
                            placeholder="Current Address"
                            autosize
                            minRows={2}
                            maxRows={4}
                        />
                    </Grid.Col>

                    <Grid.Col span={12} style={{ display: "flex" }}>
                        <NativeSelect
                            mr="lg"
                            style={{ width: "50%" }}
                            withAsterisk
                            label="Country Code"
                            placeholder="Please Select"
                            data={['Please Select', 'React', 'Angular', 'Vue', 'Svelte']}
                        />
                        <NumberInput style={{ width: "50%" }} mr="lg" label="Mobile Number" placeholder="Mobile Number" withAsterisk {...form.getInputProps('number')} />
                        <NativeSelect
                            mr="lg"
                            style={{ width: "50%" }}
                            withAsterisk
                            label="WhatsApp Country Code"
                            placeholder="Please Select"
                            data={['Please Select', 'React', 'Angular', 'Vue', 'Svelte']}
                        />
                        <NumberInput style={{ width: "50%" }} label="WhatsApp Number" placeholder="WhatsApp Number" withAsterisk {...form.getInputProps('Whatsappnumber')} />
                    </Grid.Col>


                    <Grid.Col span={12} style={{ display: "flex" }}>

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

                        <TextInput style={{ width: "50%" }} label="Your email" placeholder="Your email" withAsterisk {...form.getInputProps('email')} />
                    </Grid.Col>
                    <Grid.Col span={12} >
                        <Divider size="md" color='purple' mt="lg" mb="sm" />
                    </Grid.Col>
                    <Grid.Col span={12} style={{ display: "flex" }} mb="xl">
                        <NumberInput style={{ width: "20%" }} mr="lg" label="Passport Number" placeholder="Passport Number" withAsterisk {...form.getInputProps('passnumber')} />

                        <DateInput
                            withAsterisk
                            style={{ width: '28%' }}
                            mr="lg"
                            valueFormat="YYYY MMM DD"
                            label="Passport Expiry Date"
                            placeholder="Select Expiry Date"
                            value={value}
                            onChange={setValue}
                        />

                        <DateInput
                            withAsterisk
                            style={{ width: '50%' }}
                            valueFormat="YYYY MMM DD"
                            label="Arrival Date"
                            placeholder="Select Arrival Date"
                            value={value}
                            onChange={setValue}
                        />
                    </Grid.Col>

                    <Group mt="md" style={{ display: "flex", justifyContent: "center" }}>
                        <Button size='md' radius="md" type="submit" style={{ backgroundColor: "#4c0066" }}>Submit</Button>
                    </Group>
                </Box>
            </Grid.Col>
        </Grid>
    );
}
