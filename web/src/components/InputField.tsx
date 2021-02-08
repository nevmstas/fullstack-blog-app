import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

//fix this type!
type InputFieldProps =
  // InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>
  any & {
    name: string;
    label: string;
    isTextArea?: boolean;
  };

export const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  isTextArea,
  ...props
}) => {
  let InputOrTextArea = Input;
  if (isTextArea) {
    InputOrTextArea = Textarea as any;
  }

  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputOrTextArea {...field} {...props} id={field.name} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
