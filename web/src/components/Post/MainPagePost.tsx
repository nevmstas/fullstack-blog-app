import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";

export interface PostType {
  id: number;
  title: string;
  text: string;
  textSnippet: string;
  creatorId: number;
  createdAt: string;
  updatedAt: string;
}

interface FeatureType {
  post: PostType;
}

export function MainPagePost({ post, ...rest }: FeatureType) {
  const { title, textSnippet } = post;
  return (
    <Box p={5} shadow="md" borderWidth="1px" {...rest}>
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={4}>{textSnippet}...</Text>
    </Box>
  );
}
