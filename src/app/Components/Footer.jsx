import React from "react";
import { Anchor, Group, ActionIcon, rem, Paper } from "@mantine/core";
import {
    IconBrandTwitter,
    IconBrandYoutube,
    IconBrandInstagram,
} from "@tabler/icons-react";

const links = [
    { link: "/", label: "Apply" },
    { link: "/Contact", label: "Contact" },
    { link: "#", label: "Track" },
    { link: "#", label: "Blog" },
    { link: "/FAQ", label: "FAQ" },
];

export default function Footer() {
    const items = links.map((link) => (
        <Anchor
            c="white"
            key={link.label}
            href={link.link}
            lh={1}
            onClick={(event) => event.preventDefault()}
            size="sm"
        >
            {link.label}
        </Anchor>
    ));

    return (
            <Paper
                mt="3rem"
                style={{
                    width: "100%",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    background: "#4c0066",
                    boxShadow: "0px 2px 5px rgba(255, 255, 255, 0.5)",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: `${rem(16)} ${rem(16)}`,
                        flexDirection: "row",
                    }}
                >

                    <Group
                        style={{
                            marginTop: 0,
                            marginBottom: 5,
                            marginLeft: 0,
                            marginRight: 0,
                        }}
                    >
                        {items}
                    </Group>

                    <Group
                        style={{
                            marginTop: 0,
                            marginBottom: 5,
                            marginLeft: 0,
                            marginRight: 0,
                            color: "white",

                        }}
                    >
                        expressvisadubai.com 2023 all rights reserved.


                    </Group>

                    <Group gap="xs" justify="flex-end" wrap="nowrap">
                        <ActionIcon size="lg" variant="default" radius="xl">
                            <IconBrandTwitter
                                style={{ width: rem(18), height: rem(18) }}
                                stroke={1.5}
                            />
                        </ActionIcon>
                        <ActionIcon size="lg" variant="default" radius="xl">
                            <IconBrandYoutube
                                style={{ width: rem(18), height: rem(18) }}
                                stroke={1.5}
                            />
                        </ActionIcon>
                        <ActionIcon size="lg" variant="default" radius="xl">
                            <IconBrandInstagram
                                style={{ width: rem(18), height: rem(18) }}
                                stroke={1.5}
                            />
                        </ActionIcon>
                    </Group>
                </div>
            </Paper>
    );
};

