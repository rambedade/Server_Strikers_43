import React from "react";
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";

function Hero() {
  return (
    <Container maxW={"3xl"}>
      <Stack
        as={Box}
        textAlign={"center"}
        spacing={{ base: 8, md: 8 }} 
        py={{ base: 12, md: 5 }} 
        justifyContent="center"
        alignItems="center"
        minH="100vh"
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "2xl", sm: "4xl", md: "5xl" }} 
          lineHeight={"110%"}
        >
          Roll the Dice, <br />
          <Text as={"span"} color={useColorModeValue("blue.400", "blue.200")}>
            Rule the Board!
          </Text>
        </Heading>
        <Flex justifyContent="center" alignItems="center">
          <img
            src="https://media.tenor.com/i_L5KauoCcoAAAAi/dice.gif"
            alt="rolling dice"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Flex>
        <Text color={useColorModeValue("gray.700", "gray.200")}>
          Experience Ludo Like Never Before – Play, Chat, and Conquer in
          Real-Time!
        </Text>
        <Stack
          direction={"column"}
          spacing={3}
          align={"center"}
          alignSelf={"center"}
          position={"relative"}
        >
          <Button
            colorScheme={"blue"}
            bg={useColorModeValue("blue.400", "blue.600")}
            rounded={"full"}
            px={6}
            _hover={{
              bg: useColorModeValue("blue.500", "blue.700"),
            }}
          >
            Lets Play
          </Button>
          <Button variant={"link"} colorScheme={"blue"} size={"sm"}>
            Learn more
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}

export default Hero;
