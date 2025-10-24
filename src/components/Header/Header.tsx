import { Box, Group, Text, useMantineTheme } from "@mantine/core";
import HumanIcon from "../../assets/human.svg"

export const Header = () => {
    const theme = useMantineTheme();

    return (
        <Box    
            component="header"
            data-testid="header"
            style={{
                width: "100%",
                padding: "14px 20px",
                backgroundColor: "#FFFFFF",
                boxShadow: "0px 2px 22.5px 0px #1C1D1F0D",
            }}
        >
            <Group justify="space-between" align="center" maw={828}>
                <Group align="center" gap="xs">
                    <img src="src/assets/hhLogo.svg" alt="hh" data-testid="logo-hh"/>
                    <Text fw={600} data-testid="header-title">.FrontEnd</Text>
                </Group>

                <Group gap={24}>
                    <Group align="center" gap={8}>
                        <Text
                            data-testid="vacancies-text"
                            fw={500}
                            style={{
                                cursor: "pointer",
                            }}
                        >
                            Вакансии FE
                        </Text>
                        <Box
                            data-testid="vacancies-marker"
                            style={{
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                backgroundColor: "#4263EB",
                            }}
                        />
                    </Group>

                    <Group align="center" gap={6} style={{ cursor: "pointer" }}>
                        <img src={HumanIcon} alt="human" data-testid="human-icon"/>
                        <Text fw={500} c={theme.other.colors.gray} data-testid="about-text">
                            Обо мне
                        </Text>
                    </Group>
                </Group>
            </Group>
        </Box>
    );
};
