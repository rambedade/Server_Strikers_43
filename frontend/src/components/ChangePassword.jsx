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
  newPassword: "",
  confirmPassword: "",
};

const ChangePassword = () => {
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [serverSuccessMessage, setServerSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: async (values, action) => {
      setLoading(true);
      try {
        if (values.newPassword !== values.confirmPassword) {
          throw new Error("Passwords do not match.");
        }

        // Sending the POST request using axiosInstance
        const response = await axiosInstance.post("/change-password", {
          newPassword: values.newPassword,
        });

        if (response.data && response.data.status === "success") {
          setServerSuccessMessage(response.data.message);
          setServerErrorMessage("");
          action.resetForm();

          // Show success toast message
          toast({
            title: "Password Changed Successfully.",
            description: "Your password has been updated.",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        } else {
          setServerErrorMessage(response.data.message || "Password change failed.");
          setServerSuccessMessage("");
        }
      } catch (error) {
        console.error("Password change error:", error);
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
                Change Your Password
              </Heading>
            </Center>
            <FormControl>
              <FormLabel>New Password</FormLabel>
              <Input
                type="password"
                name="newPassword"
                value={values.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                isInvalid={!!errors.newPassword}
              />
              {errors.newPassword && (
                <div className="text-sm text-red-500 px-2">{errors.newPassword}</div>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Confirm New Password</FormLabel>
              <Input
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                isInvalid={!!errors.confirmPassword}
              />
              {errors.confirmPassword && (
                <div className="text-sm text-red-500 px-2">{errors.confirmPassword}</div>
              )}
            </FormControl>
            <Stack spacing={6}>
              <Button
                colorScheme="blue"
                isLoading={loading}
                onClick={handleSubmit}
              >
                Change Password
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
            alt={"Change Password Image"}
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

export default ChangePassword;
