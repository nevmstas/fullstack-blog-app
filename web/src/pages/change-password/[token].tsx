import { Box, Button, Link } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import NextLink from "next/link";
import React, { useState } from "react";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import { useChangePasswordMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";

import { useRouter } from "next/dist/client/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";

//change props type!
const ChangePassword: NextPage<any> = ({ token }) => {
  console.log(token);
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{
          newPassword: "",
        }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          const response = await changePassword({
            token: token,
            newPassword: values.newPassword,
          });
          console.log(response);
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data?.changePassword.errors);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            } else {
              setErrors(errorMap);
            }
          } else if (response.data?.changePassword.user) {
            router.push("/");
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              placeholder="New password"
              label="New password"
              type="password"
            />
            {tokenError ? (
              <Box>
                <Box style={{ color: "red" }}>{tokenError}</Box>
                <NextLink href="/forgot-password">
                  <Link>go forget it again</Link>
                </NextLink>
              </Box>
            ) : null}

            <Button
              mt={4}
              type="submit"
              colorScheme="pink"
              isLoading={isSubmitting}
            >
              Change password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
