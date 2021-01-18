import { Box } from "@chakra-ui/react";
import React, { ReactElement } from "react";

interface WrapperProps {
  variant?: "small" | "regular";
}

export const Wrapper: React.FC<WrapperProps> = ({
  variant = "regular",
  children,
}): ReactElement => {
  return (
    <Box
      p={6}
      w="100%"
      mx="auto"
      maxW={variant === "regular" ? "800px" : "400px"}
    >
      {children}
    </Box>
  );
};
