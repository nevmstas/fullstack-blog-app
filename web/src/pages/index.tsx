import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import NextLink from "next/link";
import { Stack, Progress, Button, Flex } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import { MainPagePost } from "../components/Post/MainPagePost";
import { useState } from "react";
import { limits } from "argon2";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as string | null,
  });
  const [{ fetching, data }] = usePostsQuery({
    variables,
  });
  return (
    <Layout>
      <NextLink href="/create-post">
        <Button rightIcon={<AddIcon />} colorScheme="pink">
          Create post
        </Button>
      </NextLink>
      <Stack spacing={8} mt={8}>
        {!data && fetching ? (
          <Progress size="xs" isIndeterminate />
        ) : (
          data?.posts.map((post) => <MainPagePost key={post.id} post={post} />)
        )}
      </Stack>
      {data ? (
        <Flex justifyContent="center">
          <Button
            onClick={() =>
              setVariables({
                limit: variables.limit,
                cursor: data.posts[data.posts.length - 1].createdAt,
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
