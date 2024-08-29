import React, { useState } from "react";
import { useFormik } from "formik";
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
  Image,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

const initialValues = {
  email: "",
};

const ResetPasswordLink = () => {
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [serverSuccessMessage, setServerSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: async (values, action) => {
      setLoading(true);
      try {
        // Sending the POST request using axiosInstance
        const response = await axiosInstance.post("/reset-password-link", {
          email: values.email,
        });

        if (response.data && response.data.status === "success") {
          setServerSuccessMessage(response.data.message);
          setServerErrorMessage("");
          action.resetForm();

          // Show success toast message
          toast({
            title: "Password Reset Link Sent.",
            description: "Please check your email to reset your password.",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        } else {
          setServerErrorMessage(response.data.message || "Request failed.");
          setServerSuccessMessage("");
        }
      } catch (error) {
        console.error("Password reset request error:", error);
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
                Reset Your Password
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
            <Stack spacing={6}>
              <Button
                colorScheme="blue"
                isLoading={loading}
                onClick={handleSubmit}
              >
                Send Reset Link
              </Button>
            </Stack>
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
            alt={"Reset Password Image"}
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

export default ResetPasswordLink;
