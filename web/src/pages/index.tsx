import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import NextLink from "next/link";
import {
  Stack,
  Progress,
  Button,
  Flex,
  InputGroup,
  Input,
  InputLeftElement,
} from "@chakra-ui/react";
import { AddIcon, Search2Icon } from "@chakra-ui/icons";

import { MainPagePost } from "../components/Post/MainPagePost";
import React, { useState } from "react";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as string | null,
    letters: null as string | null,
  });

  const [timer, setTimer] = useState<any>(null);

  const [{ fetching, data }, posts] = usePostsQuery({
    variables,
  });

  const onChangeSearch = (event: any) => {
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(() => {
        setVariables({ ...variables, letters: event.target.value });
      }, 500)
    );
  };

  return (
    <Layout>
      <NextLink href="/create-post">
        <Button rightIcon={<AddIcon />} colorScheme="pink" borderRadius={14}>
          Create post
        </Button>
      </NextLink>
      <Flex>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<Search2Icon color="gray.300" />}
          />
          <Input
            type="tel"
            placeholder="Phone number"
            onChange={onChangeSearch}
          />
        </InputGroup>
      </Flex>
      <Stack spacing={8} mt={8}>
        {!data && fetching ? (
          <Progress size="xs" isIndeterminate />
        ) : (
          data?.posts.posts.map((post, index) => (
            <MainPagePost key={index} post={post} />
          ))
        )}
      </Stack>
      {data ? (
        <Flex justifyContent="center">
          <Button
            onClick={() =>
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
                letters: variables.letters,
              })
            }
            mt={8}
          >
            Load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
