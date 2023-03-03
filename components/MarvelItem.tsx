import { FALLBACK_SRC } from "@/constant";
import { IMarvel } from "@/interface";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

interface IProps {
  data: IMarvel;
}

const MarvelItem = ({ data }: IProps) => {
  const router = useRouter();

  return (
    <Card marginBottom={8} key={data.id} direction={{ sm: "row" }}>
      <Image
        fallbackSrc={FALLBACK_SRC}
        src={data.cover_url}
        alt="Thumbnail"
        borderRadius="lg"
      />
      <Stack>
        <CardBody>
          <Heading as="h2" size="3xl">
            {data.title}
          </Heading>
          <Heading size="sm">{data.type}</Heading>

          <Text py="2">{data.overview}</Text>
        </CardBody>

        <CardFooter flexDirection={"row"} justifyContent="space-evenly">
          <ButtonGroup spacing="2">
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={() => router.push(`/detail/${data.id}`)}
            >
              See Detail
            </Button>
            <Link href={data.trailer_url}>
              <Button variant="solid" colorScheme="green">
                Watch Trailer
              </Button>
            </Link>
          </ButtonGroup>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default MarvelItem;
