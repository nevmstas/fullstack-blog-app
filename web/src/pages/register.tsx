import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
interface RegisterProps {}
const Register: React.FC<RegisterProps> = ({}) => {
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={(values, actions)=> {
          console.log(JSON.stringify(values, null, 2));
          actions.setSubmitting(false)
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
