import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import ContactUsForm from "@/components/contact-us/contact-us-form";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <Flex
      position="relative"
      color="white"
      flexDirection="column"
      align="center"
    >
      <Box
        zIndex={-1}
        position="fixed"
        height="400px"
        width="100vw"
        bgColor="black"
      />
      <Box mt="64px" width="32px" height="32px" position="relative">
        <Image
          src={"/assets/hov-logo.png"}
          width="32px"
          height="32px"
          alt="logo"
        />
      </Box>
      <VStack spacing="8px" mt="40px" mb="64px">
        <Heading fontSize="48px" lineHeight="48px">
          Contact Us
        </Heading>
        <Text>Tell us what you need and we&quot;ll help you out.</Text>
      </VStack>
      <ContactUsForm />
    </Flex>
  );
};

export default Home;
