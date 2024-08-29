import React, { useState } from "react";
import {
  Avatar,
  Box,
  Flex,
  Icon,
  Text,
  Link,
  Image,
  Button,
  Heading,
  Stack,
  VStack,
  Drawer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  DrawerContent,
  IconButton,
  useDisclosure,
  DrawerOverlay,
  useColorModeValue,
} from "@chakra-ui/react";
import { AiOutlineTeam, AiOutlineHome } from "react-icons/ai";
import { BsFolder2, BsCalendarCheck } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { RiFlashlightFill } from "react-icons/ri";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

function User() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box as="section" minH="100vh" display="flex">
      <SidebarContent
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" isOpen={isSidebarOpen} />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: isSidebarOpen ? "60" : "16" }} transition="margin 0.3s ease" flex="1">
        <Flex
          as="header"
          align="center"
          w="full"
          px="4"
          d={{ base: "flex", md: "none" }}
          borderBottomWidth="1px"
          borderColor={useColorModeValue("inherit", "gray.700")}
          bg={useColorModeValue("white", "gray.800")}
          justifyContent={{ base: "space-between", md: "flex-end" }}
          boxShadow="lg"
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{ base: "inline-flex", md: "none" }}
            onClick={onOpen}
            icon={<FiMenu />}
            size="md"
          />
          <Flex align="center">
            <Icon as={RiFlashlightFill} h={8} w={8} />
          </Flex>
        </Flex>

        <Box as="main" p={14} minH="30rem" bg={useColorModeValue("auto", "gray.800")}>
          <Stack
            direction={{ base: "column", sm: "row" }}
            alignItems="center"
            justifyContent="center"
            h="100%"
          >
            <Stack spacing={8}>
              <Box>
                <Heading color="blue.400" fontSize="3xl">
                  Point of sale
                </Heading>
                <Text fontSize="md" color="gray.500">
                  Manage your inventory and sale efficiently.
                </Text>
              </Box>
              <Stack
                direction={{ base: "column", md: "row" }}
                spacing={4}
                justifyContent="center"
              >
                <Button
                  rounded="full"
                  bg="blue.400"
                  color="white"
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Stocks
                </Button>
                <Button rounded="full">Vendors</Button>
              </Stack>
            </Stack>

            <Image
              alt="Homepage Image"
              objectFit="cover"
              width="60vh"
              src="https://plus.unsplash.com/premium_photo-1685136482569-a59b03025108?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

function SidebarContent({ isOpen, toggleSidebar, ...props }) {
  return (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      overflowX="hidden"
      overflowY="auto"
      bg={useColorModeValue("white", "gray.800")}
      borderColor={useColorModeValue("inherit", "gray.700")}
      borderRightWidth="1px"
      w={isOpen ? "60" : "16"}
      transition="width 0.3s ease"
      pt="4"
      {...props}
    >
      <VStack
        h="full"
        w="full"
        alignItems="flex-start"
        justifyContent="space-between"
        spacing={4}
      >
        <Box w="full">
          <Flex px="4" align="center">
            <Icon as={RiFlashlightFill} h={8} w={8} />
            {isOpen && (
              <Text
                fontSize="2xl"
                ml="2"
                color={useColorModeValue("brand.500", "white")}
                fontWeight="semibold"
              >
                POS
              </Text>
            )}
          </Flex>
          <Flex
            direction="column"
            as="nav"
            fontSize="md"
            color="gray.600"
            aria-label="Main Navigation"
            spacing={1}
          >
            <NavItem icon={AiOutlineHome} isOpen={isOpen}>Dashboard</NavItem>
            <NavItem icon={AiOutlineTeam} isOpen={isOpen}>Team</NavItem>
            <NavItem icon={BsFolder2} isOpen={isOpen}>Projects</NavItem>
            <NavItem icon={BsCalendarCheck} isOpen={isOpen}>Calendar</NavItem>
          </Flex>
        </Box>

        <Flex
          px="4"
          pb="5"
          direction="column"
          align="center"
          justifyContent="center"
          spacing={4}
        >
          <Menu>
            <MenuButton
              as={Button}
              size={"sm"}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              _hover={{ textDecoration: "none" }}
              mb={4}
            >
              <Avatar
                size={"sm"}
                name="Ahmad"
                src="https://avatars2.githubusercontent.com/u/37842853?v=4"
              />
            </MenuButton>
            <MenuList fontSize={17} zIndex={5555}>
              <MenuItem as={Link} to="#">
                My profile
              </MenuItem>
              <MenuItem as={Link} to="#">
                Change password
              </MenuItem>
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
          <Button
            onClick={toggleSidebar}
            size="sm"
            aria-label={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
            bg="blue.400"
            color="white"
            _hover={{ bg: "blue.500" }}
          >
            {isOpen ? <HiOutlineChevronLeft /> : <HiOutlineChevronRight />}
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
}

function NavItem({ icon, children, isOpen }) {
  const color = useColorModeValue("gray.600", "gray.300");

  return (
    <Flex
      align="center"
      px={isOpen ? "4" : "2"}
      py="3"
      cursor="pointer"
      role="group"
      fontWeight="semibold"
      transition=".15s ease"
      color={useColorModeValue("inherit", "gray.400")}
      _hover={{
        bg: useColorModeValue("gray.100", "gray.900"),
        color: useColorModeValue("gray.900", "gray.200"),
      }}
    >
      {icon && (
        <Icon
          mx="2"
          boxSize={isOpen ? "5" : "4"}
          _groupHover={{
            color: color,
          }}
          as={icon}
        />
      )}
      {isOpen && <Text ml="2">{children}</Text>}
    </Flex>
  );
}

export default User;
