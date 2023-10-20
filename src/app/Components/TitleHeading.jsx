/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Grid, Text } from "@mantine/core";

export default function TitleHeading() {
    const [textIndex, setTextIndex] = useState(0);
    const [fontSize, setFontSize] = useState({
        large: { title: "70px", promo: "35px" },
        medium: { title: "50px", promo: "30px" },
        small: { title: "40px", promo: "25px" },
    });
    const texts = [
        "Approval Within 12 Hours*",
        "100% Guaranteed Approval",
        "Secure UAE Visa in 12 Hours",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleWindowResize = () => {
            const windowWidth = window.innerWidth;
            if (windowWidth < 860) {
                setFontSize({
                    large: { title: "40px", promo: "25px" },
                    medium: { title: "40px", promo: "25px" },
                    small: { title: "40px", promo: "25px" },
                });
            } else if (windowWidth < 1070) {
                setFontSize({
                    large: { title: "50px", promo: "30px" },
                    medium: { title: "50px", promo: "30px" },
                    small: { title: "40px", promo: "25px" },
                });
            } else {
                setFontSize({
                    large: { title: "70px", promo: "35px" },
                    medium: { title: "50px", promo: "30px" },
                    small: { title: "40px", promo: "25px" },
                });
            }
        };

        window.addEventListener("resize", handleWindowResize);

        return () => window.removeEventListener("resize", handleWindowResize);
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
                <Grid.Col span={12} mt="10rem">
                    <Text
                        style={{
                            fontWeight: "700",
                            fontSize: fontSize.large.title,
                            color: "black",
                            display: "flex",
                            justifyContent: "left",
                        }}
                    >
                        Dubai is ready to welcome you.
                    </Text>
                </Grid.Col>
                <Grid.Col span={12} style={{ display: "flex", flexWrap: "wrap" }}>
                    <Text
                        pr="sm"
                        style={{
                            fontWeight: "600",
                            fontSize: fontSize.large.promo,
                            color: "red",
                            display: "flex",
                            justifyContent: "left",
                        }}
                    >
                        25% Discount Promotion:
                    </Text>
                    <Text
                        style={{
                            ...textAnimation,
                            fontWeight: "600",
                            fontSize: fontSize.large.promo,
                            color: "black",
                            display: "flex",
                            justifyContent: "left",
                        }}
                    >
                        {texts[textIndex]}
                    </Text>
                </Grid.Col>
            </Grid>
        </>
    );
}
