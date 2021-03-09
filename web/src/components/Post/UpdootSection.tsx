import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Box, IconButton, Text } from "@chakra-ui/react";
import React from "react";

interface UpdootSectionType {
  points: string;
}

export const UpdootSection: React.FC<UpdootSectionType> = ({ points }) => {
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <IconButton
        aria-label="udoot post"
        onClick={() => console.log(123)}
        icon={<ChevronUpIcon />}
        borderRadius="50%"
      />
      <Text mt={3} mb={3}>
        {points}
      </Text>

      <IconButton
        aria-label="udoot post"
        onClick={() => console.log(123)}
        icon={<ChevronDownIcon />}
        borderRadius="50%"
      />
    </Box>
  );
};
