/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Grid, Text } from '@mantine/core';

export default function TitleHeading() {
    const [textIndex, setTextIndex] = useState(0);
    const texts = [
        "Approval Within 12 Hours*",
        "100% Guaranteed Approval",
        "Get UAE Visa Approval in 12 hours",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const textAnimation = {
        animationName: "textChange",
        animationDuration: "4s",
        animationIterationCount: "infinite",
    };

    return (
        <>
            <style>
                {`
                @keyframes textChange {
                    0%, 100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    25% {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    50% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                `}
            </style>
            <Grid>
                <Grid.Col span={12} mt="8rem">
                    <Text
                        style={{
                            fontWeight: '700',
                            fontSize: '55px',
                            color: 'black',
                            display: 'flex',
                            justifyContent: 'left',
                        }}
                    >
                        Dubai is ready to welcome you.
                    </Text>
                </Grid.Col>
                <Grid.Col span={12} style={{ display: "flex" }}>
                    <Text
                        pr="sm"
                        style={{
                            fontWeight: '600',
                            fontSize: '30px',
                            color: 'red',
                            display: 'flex',
                            justifyContent: 'left',
                        }}
                    >
                        25% Discount Promotion:
                    </Text>
                    <Text
                        style={{
                            ...textAnimation,
                            fontWeight: '600',
                            fontSize: '30px',
                            color: 'black',
                            display: 'flex',
                            justifyContent: 'left',
                        }}
                    >
                        {texts[textIndex]}
                    </Text>
                </Grid.Col>
            </Grid>
        </>
    );
}