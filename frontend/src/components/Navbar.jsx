import React, { useEffect, useState } from "react";
import "../Styles/navbar.css";
import Cookies from 'js-cookie';
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons";
import Register from "./Register";
import Login from "./Login";

const NavLink = ({ children }) => {
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
};

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the cookie is present and valid
    const authCookie = Cookies.get("is_auth");
    setIsLoggedIn(!!authCookie);
  }, []); // Empty dependency array to run only on mount

  // Modal states
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();
  const {
    isOpen: isRegisterOpen,
    onOpen: onRegisterOpen,
    onClose: onRegisterClose,
  } = useDisclosure();

  return (
    <div className="inner-div">
      {/* Apply blurred background class when any modal is open */}
      {(isLoginOpen || isRegisterOpen) && (
        <div className="blurred-background"></div>
      )}

      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex
          className="container"
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box>
            <a className="navbar-brand" href="#">
              <img
                src="https://www.svgrepo.com/show/252262/dice.svg"
                alt="Bootstrap"
                width="45"
                height="24"
              />
            </a>
          </Box>

          {/* Centered text */}
          <Box flex={1} textAlign="center">
            <span className="nav-title-text">Masai Ludo</span>
          </Box>

          <Flex alignItems={"center"} display={{ base: "none", md: "flex" }}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              {/* Conditionally render button group or avatar menu */}
              {!isLoggedIn ? (
                <Stack
                  direction="row"
                  spacing={4}
                  role="group"
                  aria-label="Basic outlined example"
                >
                  <Button
                    variant="outline"
                    colorScheme="blue"
                    onClick={onLoginOpen}
                  >
                    Login
                  </Button>
                  <Button
                    variant="outline"
                    colorScheme="blue"
                    onClick={onRegisterOpen}
                  >
                    Register
                  </Button>
                </Stack>
              ) : (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"sm"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar
                        size={"2xl"}
                        src={
                          "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>Username</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem>Your Servers</MenuItem>
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem onClick={() => {
                      // Clear cookie and update state
                      Cookies.remove("is_auth");
                      setIsLoggedIn(false);
                      console.log("Logout clicked");
                    }}>
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}
            </Stack>
          </Flex>

          {/* Hamburger Menu Button */}
          <Flex display={{ base: "flex", md: "none" }}>
            <IconButton
              aria-label="Open menu"
              icon={<HamburgerIcon />}
              onClick={onOpen}
            />
          </Flex>
        </Flex>

        {/* Drawer for mobile menu */}
        <Drawer isOpen={isOpen} onClose={onClose} placement="right">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Masai Ludo</DrawerHeader>

            <DrawerBody>
              <Stack spacing={4} align={"center"}>
                <NavLink>Home</NavLink>
                <NavLink>About</NavLink>
                <NavLink>Features</NavLink>
                <NavLink>Contact</NavLink>
                {isLoggedIn ? (
                  <>
                    <NavLink>Your Servers</NavLink>
                    <NavLink>Account Settings</NavLink>
                    <Button
                      variant="link"
                      onClick={() => {
                        // Clear cookie and update state
                        Cookies.remove("is_auth");
                        setIsLoggedIn(false);
                        console.log("Logout clicked");
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      colorScheme="blue"
                      onClick={onLoginOpen}
                    >
                      Login
                    </Button>
                    <Button
                      variant="outline"
                      colorScheme="blue"
                      onClick={onRegisterOpen}
                    >
                      Register
                    </Button>
                  </>
                )}
              </Stack>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" colorScheme="blue" onClick={onClose}>
                Close
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        {/* Login Modal */}
        <Modal isOpen={isLoginOpen} onClose={onLoginClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              <Login />
            </ModalBody>
          </ModalContent>
        </Modal>

        {/* Register Modal */}
        <Modal isOpen={isRegisterOpen} onClose={onRegisterClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              <Register />
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </div>
  );
}

export default Navbar;
