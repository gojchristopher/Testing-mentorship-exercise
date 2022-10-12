import { Box, BoxProps, Flex, FlexProps } from "@chakra-ui/react";
import React from "react";

const Card = ({ children, ...props }: React.PropsWithChildren<FlexProps>) => {
  return (
    <Flex
      maxW="512px"
      maxH="823px"
      borderRadius="8px"
      align="center"
      padding="56px"
      width="full"
      boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
      bgColor="white"
    >
      {children}
    </Flex>
  );
};

export default Card;
