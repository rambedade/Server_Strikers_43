import React, { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../service/axiosInstance";
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Flex,
  Center,
  useColorModeValue,
  HStack,
  PinInput,
  PinInputField,
  Image,
  useToast,
} from "@chakra-ui/react";

const initialValues = {
  email: "",
  otp: "",
};

const VerifyEmail = () => {
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [serverSuccessMessage, setServerSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast(); // Initialize the toast hook



  const { values, errors, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      onSubmit: async (values, action) => {
        setLoading(true);
        try {
          // Sending the POST request using axiosInstance
          const response = await axiosInstance.post("/verify-email", {
            email: values.email,
            otp: values.otp,
          });

          if (response.data && response.data.status === "success") {
            setServerSuccessMessage(response.data.message);
            setServerErrorMessage("");
            action.resetForm();

            // Show success toast message
            toast({
              title: "Verification Successful.",
              description: "You will be redirected to login.",
              status: "success",
              duration: null,
              isClosable: true,
              position: "top",
            });
            navigate("/?message=login");
          } else {
            setServerErrorMessage(response.data.message || "Verification failed.");
            setServerSuccessMessage("");
          }
        } catch (error) {
          console.error("Verification error:", error);
          setServerErrorMessage(
            error.response?.data?.message ||
            "An unexpected error occurred. Please try again."
          );
        } finally {
          setLoading(false);
        }
      },
    });

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        maxW={"container.md"}
        w={"full"}
        height={"70vh"}
        overflow={"hidden"}
        borderRadius={"lg"}
        boxShadow={"lg"}
        bg={useColorModeValue("white", "gray.700")}
      >
        {/* Form Section */}
        <Flex direction="column" align="center" justify="center" flex={1} p={6}>
          <Stack
            spacing={4}
            w={"full"}
            maxW={"sm"}
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            p={6}
            height="100%"
            justifyContent="center"
          >
            <Center>
              <Heading lineHeight={1.1} fontSize={{ base: "xl", md: "2xl" }}>
                Verify your Email
              </Heading>
            </Center>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="Enter your email"
                isInvalid={!!errors.email}
              />
              {errors.email && (
                <div className="text-sm text-red-500 px-2">{errors.email}</div>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>OTP</FormLabel>
              <HStack spacing={4}>
                <PinInput
                  type="alphanumeric"
                  value={values.otp}
                  onChange={(value) => setFieldValue("otp", value)}
                  isInvalid={!!errors.otp}
                >
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
              {errors.otp && (
                <div className="text-sm text-red-500 px-2">{errors.otp}</div>
              )}
            </FormControl>
            <Stack spacing={6}>
              <Button
                colorScheme="blue"
                isLoading={loading}
                onClick={handleSubmit}
              >
                Verify
              </Button>
            </Stack>
            <Center>
              <p className="text-sm text-gray-600 p-1">
                Already a User?{" "}
                <Link
                  to="/account/login"
                  className="text-indigo-500 hover:text-indigo-600 transition duration-300 ease-in-out"
                >
                  Login
                </Link>
              </p>
            </Center>
            {serverSuccessMessage && (
              <div className="text-sm text-green-500 font-semibold px-2 text-center">
                {serverSuccessMessage}
              </div>
            )}
            {serverErrorMessage && (
              <div className="text-sm text-red-500 font-semibold px-2 text-center">
                {serverErrorMessage}
              </div>
            )}
          </Stack>
        </Flex>
        {/* Image Section */}
        <Flex flex={1} overflow={"hidden"}>
          <Image
            alt={"Verification Image"}
            objectFit={"cover"}
            src={"https://cdn-icons-gif.flaticon.com/6569/6569164.gif"}
            height="100%"
            width="100%"
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default VerifyEmail;
