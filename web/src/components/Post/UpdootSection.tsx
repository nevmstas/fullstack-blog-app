import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Box, IconButton, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { PostSnippetFragment, useVoteMutation } from "../../generated/graphql";

interface UpdootSectionType {
  post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionType> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");
  const [, vote] = useVoteMutation();
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <IconButton
        aria-label="udoot post"
        onClick={async () => {
          setLoadingState("updoot-loading");
          await vote({
            postId: post.id,
            value: 1,
          });
          setLoadingState("not-loading");
        }}
        isLoading={loadingState === "updoot-loading"}
        icon={<ChevronUpIcon />}
        borderRadius="50%"
      />
      <Text mt={3} mb={3}>
        {post.points}
      </Text>

      <IconButton
        aria-label="udoot post"
        onClick={async () => {
          setLoadingState("downdoot-loading");
          await vote({
            postId: post.id,
            value: -1,
          });
          setLoadingState("not-loading");
        }}
        isLoading={loadingState === "downdoot-loading"}
        icon={<ChevronDownIcon />}
        borderRadius="50%"
      />
    </Box>
  );
};
