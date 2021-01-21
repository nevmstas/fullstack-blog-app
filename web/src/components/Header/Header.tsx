import {
  Box,
  Flex,
  Tab,
  TabList,
  Tabs,
  Text,
  Link,
  Avatar,
  Button,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { DARK_PINK, GREY } from "../../styles/colors";
import { useMeQuery } from "../../generated/graphql";

export const Header = () => {
  const [{ fetching, data }] = useMeQuery();
  let body = null;

  if (fetching) {
  } else if (!data?.me) {
    body = (
      <>
        <Link ml="auto" mr={3} fontWeight="bold">
          <NextLink href="/login">Login</NextLink>
        </Link>
        <Link fontWeight="bold">
          <NextLink href="/login">Register</NextLink>
        </Link>
      </>
    );
  } else {
    body = (
      <>
        <Text ml="auto" mr={4} fontWeight="bold">
          {data.me.username}
        </Text>
        <Avatar mr={2} name={data.me.username} />
        <Button variant='link'>Logout</Button>
      </>
    );
  }

  return (
    <Box backgroundColor={GREY} color={DARK_PINK} p={3}>
      <Flex alignItems="center">
        <Text fontWeight="bold" fontSize={30} mr={10}>
          Blogich
        </Text>
        <Tabs variant="soft-rounded">
          <TabList>
            <Tab>Posts</Tab>
            <Tab>Users</Tab>
          </TabList>
        </Tabs>
        {body}
      </Flex>
    </Box>
  );
};
