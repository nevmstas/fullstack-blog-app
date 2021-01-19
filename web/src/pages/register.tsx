import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  const [, register] = useRegisterMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          const response = await register(values);
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data?.register.errors));
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
              />
            </Box>

            <Button
              mt={4}
              type="submit"
              colorScheme="pink"
              isLoading={isSubmitting}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
