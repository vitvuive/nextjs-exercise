import MarvelItem from "@/components/MarvelItem";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { Container, Spinner, Text } from "@chakra-ui/react";

import { IMarvel } from "@/interface";
import { queryClient } from "../_app";

const getMarvelDetail = async (marvelId: string) => {
  const res = await fetch(`/api/marvel/${marvelId}`);
  return res.json();
};

export default function Marvel() {
  const router = useRouter();

  const marvelId = typeof router.query?.id === "string" ? router.query.id : "";

  const { data, isLoading, isError, isSuccess } = useQuery(
    ["getMarvel", marvelId],
    () => getMarvelDetail(marvelId),
    {
      initialData: () => {
        return queryClient
          .getQueryData("marvel")
          ?.find((d: IMarvel) => d.id == marvelId);
      },
      staleTime: Infinity,
      enabled: marvelId.length > 0,
    }
  );

  const renderResult = () => {
    if (isLoading) return <Spinner alignSelf={"center"} />;
    if (isError) return <Text>Something went wrong!</Text>;
    if (isSuccess) return <MarvelItem data={data} />;
    return <></>;
  };

  return <Container paddingTop={8}>{renderResult()}</Container>;
}
