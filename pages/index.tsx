import { Text } from "@chakra-ui/react";
import { useQuery } from "react-query";

const Home = () => {
  const getMarvel = async () => {
    const res = await fetch("/api/marvel");
    console.log({ res });
    return res.json();
  };
  const { data } = useQuery("marvel", getMarvel);

  console.log({ data });
  return <Text>Edit /pages/index.tsx file</Text>;
};

export default Home;
