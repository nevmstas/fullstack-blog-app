import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { useState } from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const ForgotPassword: React.FC<{}> = () => {
  const [complite, setComplite] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{
          email: "",
        }}
        onSubmit={async (values) => {
          await forgotPassword({ email: values.email });
          setComplite(true);
        }}
      >
        {({ isSubmitting }) =>
          complite ? (
            <Box>If an account with that email exist, we sent you email</Box>
          ) : (
            <Form>
              <InputField name="email" placeholder="email" label="email" />
              <Button
                mt={4}
                type="submit"
                colorScheme="pink"
                isLoading={isSubmitting}
              >
                send
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
