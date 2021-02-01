import { Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import React from "react";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import { useChangePasswordMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";

import { useRouter } from "next/dist/client/router";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
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
          if (response.data?.changePassword.errors) {
            setErrors(toErrorMap(response.data?.changePassword.errors));
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

export default ChangePassword;
