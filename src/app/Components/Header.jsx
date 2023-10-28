/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { Grid, Paper, Text, Button, Group, Drawer, Divider, Center } from "@mantine/core";
import { GrVisa } from "react-icons/gr";
import { TiThMenu } from "react-icons/ti";

const links = [
    { link: "/", label: "Apply" },
    { link: "/track", label: "Track" },
    { link: "/FAQ", label: "FAQ" },
    { link: "/blog", label: "Blog" },
    { link: "/Contact", label: "Contact" },
];

export default function Header() {
    const [hoveredButton, setHoveredButton] = useState(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isMobile, setIsMobile] = useState(false);
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [headerBackground, setHeaderBackground] = useState("#20519c"); // Initial background color

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1240);
        };

        const handleScroll = () => {
            // Change the background color when scrolling down
            if (window.scrollY > 0) {
                setHeaderBackground("#4C0066");
            } else {
                setHeaderBackground("#2d57a1");
            }
        };

        // Add event listeners
        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleScroll);

        // Initial check
        handleResize();

        // Clean up the event listeners when the component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const items = links.map((link) => (
        <Button
            key={link.label}
            component="a"
            href={link.link}
            radius="sm"
            style={{
                textDecoration: "none",
                fontSize: "17px",
                fontWeight: 500,
                marginRight: "1rem",
                backgroundColor:
                    hoveredButton === link.label ? "yellow" : "transparent",
                color: hoveredButton === link.label ? "black" : "white",
            }}
            onMouseEnter={() => setHoveredButton(link.label)}
            onMouseLeave={() => setHoveredButton(null)}
        >
            {link.label}
        </Button>
    ));

    const headerStyle = {
        background: headerBackground,
        transition: "background-color 0.3s ease-in-out",
    };

    const titleStyle = {
        fontWeight: "800",
        fontSize: "25px",
        color: "Yellow",
        letterSpacing: "-0.5px",
        transition: "transform 0.3s ease-in-out",
        transform: `translateX(${headerBackground === "#4C0066" ? "50%" : "0"})`,
    };

    const menuStyle = {
        transition: "transform 0.3s ease-in-out",
        transform: `translateX(${headerBackground === "#4C0066" ? "-10%" : "0"})`,
    };

    const visaIconStyle = {
        transition: "transform 0.3s ease-in-out",
        transform: `scale(${headerBackground === "#4C0066" ? 1.2 : 1.1}) translateX(${headerBackground === "#4C0066" ? "50%" : "0"})`,
        color: headerBackground === "#4C0066" ? "yellow" : "white",
    };

    // Define your WhatsApp number
    const whatsappNumber = "+923164568147";

    // Function to open WhatsApp Web
    const openWhatsApp = () => {
        const url = `https://web.whatsapp.com/send?phone=${whatsappNumber}`;
        window.open(url, "_blank");
    };


    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <Paper
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    ...headerStyle,
                }}
            >
                <Grid p="xs">
                    <Grid.Col span={4}>
                        <div style={{ display: "flex" }}>
                            <div style={visaIconStyle}>
                                <GrVisa size="65px" />
                            </div>
                            <div style={titleStyle}>
                                <Text style={{
                                    fontWeight: "800",
                                    fontSize: "25px",
                                    color: "Yellow",
                                    letterSpacing: "-0.5px",
                                }}>EXPRESS</Text>
                                <Text
                                    style={{
                                        fontWeight: "700",
                                        fontSize: "15px",
                                        color: "white",
                                        letterSpacing: "-0.5px",
                                    }}
                                >
                                    Visa Dubai
                                </Text>
                            </div>
                        </div>
                    </Grid.Col>

                    <Grid.Col
                        span={8}
                        style={{ display: "flex", justifyContent: "right", ...menuStyle }}
                    >
                        {isMobile ? (
                            <Button
                                mt="md"
                                onClick={() => setDrawerOpen(!isDrawerOpen)}
                                style={{
                                    backgroundColor: "transparent",
                                    color: "white",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                            >
                                <TiThMenu size="30px" style={{ color: "yellow" }} />
                            </Button>
                        ) : (
                            <Group gap={5} visibleFrom="xs">
                                {items}
                                {/* Render the WhatsApp button on large screens */}
                                {!isMobile && (
                                    <Button
                                        mr="lg"
                                        onClick={openWhatsApp}
                                        style={{
                                            backgroundColor: "transparent",
                                            border: "none",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <img
                                            src="/whatsapp.png" // Specify the path to your image here
                                            alt="WhatsApp Icon"
                                            style={{
                                                width: "35px",
                                                height: "35px",
                                            }}
                                        />
                                    </Button>
                                )}
                            </Group>
                        )}
                        <Button
                            mt="xs"
                            mr="sm"
                            onClick={openWhatsApp}
                            style={{
                                border: "2px solid white",
                                height: "50px",
                                backgroundColor: hoveredButton === links.label ? "yellow" : "transparent",
                                color: hoveredButton === links.label ? "black" : "white",
                                cursor: "pointer",
                                display: windowWidth <= 600 ? 'none' : 'flex',
                                alignItems: "center",
                            }}
                            onMouseEnter={() => setHoveredButton(links.label)}
                            onMouseLeave={() => setHoveredButton(null)}
                        >
                            Express Visa in 8 hours
                        </Button>


                    </Grid.Col>
                </Grid>
            </Paper>

            {/* Render the Drawer only if isMobile is true */}
            {isMobile && (
                <Drawer
                    position="right"
                    opened={isDrawerOpen}
                    onClose={() => setDrawerOpen(false)}
                >
                    <Grid gutter="xs" mt="5rem">
                        {links.map((link, index) => (
                            <React.Fragment key={link.label}>
                                <Grid.Col span={12}>
                                    <Center>
                                        <Button
                                            m="lg"
                                            component="a"
                                            href={link.link}
                                            size="sm"
                                            radius="sm"
                                            style={{
                                                textDecoration: "none",
                                                fontSize: "18px",
                                                fontWeight: 500,
                                                backgroundColor: "transparent",
                                                color: "black",
                                            }}
                                        >
                                            {link.label}
                                        </Button>
                                    </Center>
                                </Grid.Col>
                                {index !== links.length - 1 && (
                                    <Grid.Col span={12}>
                                        <Divider />
                                    </Grid.Col>
                                )}
                            </React.Fragment>
                        ))}
                        {/* Add WhatsApp image inside the drawer if isMobile is true */}
                        <Grid.Col span={12}>
                            <Divider mb="xl" />
                            <Center>
                                <img
                                    src="/whatsapp.png" // Specify the path to your WhatsApp image here
                                    alt="WhatsApp Icon"
                                    style={{
                                        width: "35px",
                                        height: "35px",
                                    }}
                                />
                            </Center>
                        </Grid.Col>

                    </Grid>
                </Drawer>
            )}
        </>
    );
}
