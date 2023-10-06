import React, { useState, useEffect } from "react";
import { Grid, Text } from "@mantine/core";
import Image from "next/image";
import Photo from "public/travel2.jpg";

export default function Home() {
    const [textIndex, setTextIndex] = useState(0);
    const texts = [
        "100% Guaranteed Approval",
        "Get UAE Visa Approval in 12 hours",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, 2000);

        return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Grid mt="5rem" align="center" justify="center" style={{ height: "100vh" }}>
                <Grid.Col span={12}>
                    <div style={{ position: "relative" }}>
                        <Image
                            src={Photo}
                            alt="Redirect Image"
                            style={{
                                width: "100%",
                                height: "500px",
                            }}
                            priority={true}
                        />

                        <div
                            style={{
                                position: "absolute",
                                top: "40%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                color: "white",
                                textAlign: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: "45px",
                                    fontWeight: 700,
                                    marginBottom: "5px",
                                }}
                            >
                                The fastest way to get your
                            </Text>
                            <Text
                                style={{
                                    fontSize: "55px",
                                    fontWeight: 700,
                                    marginBottom: "20px",
                                    color: "yellow",
                                }}
                            >
                                Dubai Visa approval
                            </Text>
                            <Text
                                style={{
                                    fontSize: "30px",
                                    fontWeight: 500,
                                }}
                            >
                                {texts[textIndex]}
                            </Text>
                        </div>
                    </div>
                </Grid.Col>
            </Grid>
        </>
    );
}
