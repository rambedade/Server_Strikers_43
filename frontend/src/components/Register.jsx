import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../service/axiosInstance";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
} from "@chakra-ui/react";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { BsFillCameraFill } from "react-icons/bs";

const Register = ({ onClose }) => {
  const toast = useToast();
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    onSubmit: async (values) => {
      if (values.password !== values.password_confirmation) {
        toast({
          title: "Passwords do not match.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      try {
        const formData = new FormData();
        formData.append("username", values.username);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("password_confirmation", values.password);

        if (photo) {
          formData.append("photo", photo);
        }

        const response = await axiosInstance.post("/register", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 201) {
          toast({
            title: "Account created.",
            description: "You have successfully registered.",
            status: "success",
            duration: 2000, // Duration reduced to align with modal close timing
            isClosable: true,
          });

          // Close modal after success
          if (onClose) {
            onClose();
          }

          // Navigate to the next page after a brief delay
          setTimeout(() => {
            navigate("/verify-email");
          }, 2000); // Adjust timing if needed
        } else {
          throw new Error(response.data.message || "Registration failed.");
        }
      } catch (error) {
        toast({
          title: "Error.",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    },
  });

  return (
    <Box maxW="md" mx="auto" p={4}>
      <Heading as="h1" size="lg" mb={6}>
        Sign Up
      </Heading>
      <Box as="form" onSubmit={formik.handleSubmit}>
        <FormControl mb={4} isRequired>
          <FormLabel>Username</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<AiOutlineUser color="gray.300" />}
            />
            <Input
              id="username"
              type="text"
              placeholder="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
          </InputGroup>
        </FormControl>

        <FormControl mb={4} isRequired>
          <FormLabel>Email</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<AiOutlineMail color="gray.300" />}
            />
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </InputGroup>
        </FormControl>

        <FormControl mb={4} isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<AiOutlineLock color="gray.300" />}
            />
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </InputGroup>
        </FormControl>

        <FormControl mb={4} isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<AiOutlineLock color="gray.300" />}
            />
            <Input
              id="password_confirmation"
              type="password"
              placeholder="Confirm Password"
              value={formik.values.password_confirmation}
              onChange={formik.handleChange}
            />
          </InputGroup>
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Profile Photo</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<BsFillCameraFill color="gray.300" />}
            />
            <Input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
          </InputGroup>
        </FormControl>

        <Button colorScheme="blue" type="submit">
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
