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
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import { isServer } from "../../utils/isServer";

export const Header = () => {
  const [{ fetching, data }] = useMeQuery({
    pause: isServer(),
  });
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  let body = null;

  const onLogout = () => {
    logout();
  };

  if (fetching) {
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link ml="auto" mr={3} fontWeight="bold">
            Login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link fontWeight="bold">Register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <>
        <Text ml="auto" mr={4} fontWeight="bold">
          {data.me.username}
        </Text>
        <Avatar mr={2} name={data.me.username} />
        <Button disabled={logoutFetching} variant="link" onClick={onLogout}>
          Logout
        </Button>
      </>
    );
  }

  return (
    <Box backgroundColor={GREY} color={DARK_PINK} p={3} top={0} position="sticky" zIndex={1}>
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

