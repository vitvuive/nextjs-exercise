import { Container, Flex, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";
import MarvelItem from "@/components/MarvelItem";
import Header from "@/components/Header";
import { IMarvel, TFilter } from "@/interface";

const getMarvel = async (type: TFilter) => {
  let params = "";
  if (type !== "show") {
    params = `?type=${type}`;
  }
  const res = await fetch(`/api/marvel${params}`);
  return res.json();
};

const Home = () => {
  const [filter, setFilter] = React.useState<TFilter>("show");

  const { data, isLoading, isError, isSuccess } = useQuery(
    ["marvel", filter],
    () => getMarvel(filter)
  );

  const renderItem = (item: IMarvel) => {
    return <MarvelItem data={item} key={item.id} />;
  };

  const renderResult = () => {
    if (isLoading) return <Spinner alignSelf={"center"} />;
    if (isError) return <Text>Something went wrong!</Text>;
    if (isSuccess) return data.map(renderItem);
    return <></>;
  };

  return (
    <Flex>
      <Header setFilter={setFilter} filter={filter} />
      <Container marginTop={24} padding={4} width="100%">
        {renderResult()}
      </Container>
    </Flex>
  );
};

export default Home;
