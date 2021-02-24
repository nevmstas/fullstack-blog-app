import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";

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
}

interface FeatureType {
  post: PostType;
}

export function MainPagePost({ post, ...rest }: FeatureType) {
  const { title, textSnippet, creator } = post;
  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius={16} {...rest}>
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={4}>{textSnippet}...</Text>
      <Text mt={4}>
        Written by <b>{creator.username}</b>
      </Text>
    </Box>
  );
}
