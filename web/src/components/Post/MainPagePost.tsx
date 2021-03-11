import { Box, Heading, IconButton, Stack, Text } from "@chakra-ui/react";
import React from "react";

import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { UpdootSection } from "./UpdootSection";
import { PostSnippetFragment, PostsQuery } from "../../generated/graphql";

export interface PostCreator {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostType {
  id: number;
  title: string;
  text: string;
  textSnippet: string;
  creatorId: number;
  creator: PostCreator;
  createdAt: string;
  updatedAt: string;
  points: string;
}

interface FeatureType {
  post: PostSnippetFragment;
}

export function MainPagePost({ post, ...rest }: FeatureType) {
  const { title, textSnippet, creator } = post;
  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius={16}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      {...rest}
    >
      <Box>
        <Heading fontSize="xl">{title}</Heading>
        <Text mt={4}>{textSnippet}...</Text>
        <Text mt={4}>
          Written by <b>{creator.username}</b>
        </Text>
      </Box>
      <UpdootSection post={post} />
    </Box>
  );
}
