import { useCallback, useEffect } from "react";
import { Button, Container, Group, Stack, Text, TextInput, Title, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useTypedDispatch, useTypedSelector } from "../../hooks/useRedux";
import { setQuery, fetchJobs } from "../../reducers/JobsSlice";
import { JobList } from "../JobList/JobList";
import { JobFilters } from "../JobFilters/JobFilters";
import SearchIcon from "../../assets/search.svg"
import styles from "./homePage.module.css";
import { CityButtons } from "../CityButtons/CityButtons";
import { DEFAULT_QUERY } from "../../constants/constantsMain";

export const HomePage = () => {
    
    const theme = useMantineTheme();
    const isSmallScreen = useMediaQuery("(max-width: 1023px)");
    
    const dispatch = useTypedDispatch();
    const { query, cityFilter } = useTypedSelector((state) => state.jobs);
    const trimmedQuery = query.trim();

    useEffect(() => {
        const text = trimmedQuery || DEFAULT_QUERY;
        dispatch(fetchJobs({ query: text, ignoreLastQueryCheck: true }));
    }, [dispatch, cityFilter]);

    const handleSearch = useCallback(async () => {
        if (!trimmedQuery.length) return;
        await dispatch(fetchJobs({ query: trimmedQuery }));
    }, [dispatch, trimmedQuery]);

    return (
        <main style={{ paddingBottom: "84px" }}>
            <Group
                justify="center"
                gap={126}
                mih={114}
                p={16}
                style={{
                    borderBottom: `1px solid ${theme.other.colors.preLight}`,
                }}
            >
                <Container m={0}>
                    <Title order={2}>Список вакансий</Title>
                    <Text c={theme.other.colors.gray} fw={500} fz={20}>
                        по профессии Frontend-разработчик
                    </Text>
                </Container>

                <Container w="auto" h={42} p={0} m={0} maw={508}>
                    <Group gap={12}>
                        <TextInput
                            data-testid="search-input"
                            flex={1}
                            size="md"
                            value={query}
                            placeholder={isSmallScreen ? "Поиск" : "Должность или название вакансии..."}
                            onChange={(e) => dispatch(setQuery(e.currentTarget.value))}
                            leftSection={
                                <img src={SearchIcon} alt="поиск" width={16} height={16} />
                            }
                            className={styles.search_input}
                            styles={{
                                input: {
                                border: `1px solid ${theme.other.colors.preLight}`,
                                },
                            }}
                        />
                        <Button
                            data-testid="search-button"
                            onClick={handleSearch}
                            w={93}
                            radius="sm"
                            size="md"
                            variant="filled"
                            styles={{
                                label: { fontWeight: 400, fontSize: "16px" },
                            }}
                        >
                        Найти
                        </Button>
                    </Group>
                </Container>
            </Group>

            <Group justify="center" align="flex-start" gap={24}>
                <JobFilters />
                <Stack gap={0}>
                    <CityButtons />
                    <JobList />
                </Stack>

            </Group>
        </main>
    );
};

