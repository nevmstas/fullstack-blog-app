import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import NextLink from "next/link";
import { Stack, Progress, Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import { MainPagePost } from "../components/Post/MainPagePost";

const Index = () => {
  const [{ fetching, data }] = usePostsQuery({
    variables: {
      limit: 10,
    },
  });
  return (
    <Layout>
      <NextLink href="/create-post">
        <Button rightIcon={<AddIcon />} colorScheme="pink">
          Create post
        </Button>
      </NextLink>
      <Stack spacing={8} mt={8}>
        {fetching ? (
          <Progress size="xs" isIndeterminate />
        ) : (
          data?.posts.map((post) => <MainPagePost key={post.id} post={post} />)
        )}
      </Stack>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
