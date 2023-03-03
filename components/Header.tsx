import React, { Dispatch, SetStateAction } from "react";
import { Box, Stack, Heading, Flex, RadioGroup, Radio } from "@chakra-ui/react";
import { TFilter } from "@/interface";

interface IProps {
  filter: TFilter;
  setFilter: Dispatch<SetStateAction<TFilter>>;
}

const Header = ({ filter, setFilter }: IProps) => {
  return (
    <Flex
      as="header"
      position="fixed"
      w="100%"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg="#0D0D0D"
      color="white"
      zIndex={1}
    >
      <Flex align="center">
        <Heading as="h1" size="lg" letterSpacing={"tighter"}>
          Marvel Film
        </Heading>
      </Flex>

      <Stack direction={{ base: "column", md: "row" }} alignItems="center">
        <RadioGroup onChange={setFilter} value={filter}>
          <Stack direction="row">
            <Radio value="all">All</Radio>
            <Radio value="movie">Movie</Radio>
            <Radio value="tvShow">TvShow</Radio>
          </Stack>
        </RadioGroup>
      </Stack>

      <Box width={"20"} display={{ base: "block", md: "block" }}></Box>
    </Flex>
  );
};

export default Header;
