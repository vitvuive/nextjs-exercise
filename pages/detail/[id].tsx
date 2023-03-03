import MarvelItem from "@/components/MarvelItem";
import { IMarvel } from "@/interface";
import { Container, Spinner, Text } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { queryClient } from "../_app";

const getMarvelDetail = async (marvelId: string) => {
  const res = await fetch(`/api/marvel/${marvelId}`);
  return res.json();
};

export default function Detail() {
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

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["getMarvel", id], () => getMarvelDetail(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
