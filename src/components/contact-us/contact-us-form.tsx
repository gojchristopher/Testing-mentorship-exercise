import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Select,
  Text,
  TextareaAutosize,
  VStack,
} from "@highoutput/ui-components";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactFormSchemaValues, ContactUsSchema } from "./validators";
import useToast from "@/hooks/use-toast";
import Card from "@/components/card";
import InputField from "@/components/forms/input-field";
import AutoComplete from "@/components/forms/auto-complete/auto-complete";
import constants from "@/config/constants";

const ContactUsForm = () => {
  const { register, control, handleSubmit, formState } =
    useForm<contactFormSchemaValues>({
      resolver: yupResolver(ContactUsSchema),
      mode: "all",
    });
  const toast = useToast();
  const { errors } = formState;

  const onSubmitMessage: SubmitHandler<contactFormSchemaValues> = async (
    data
  ) => {
    if (data) {
      toast("message successfully sent", {
        variant: "success",
      });
    }
  };

  return (
    <Card mt="64px">
      <Flex gap="32px" align="center" flexDirection="column" width="full">
        <Heading
          color="neutrals.900"
          fontSize="30px"
          lineHeight="36px"
          fontWeight="700"
          mb="0"
          data-testid="form-header"
        >
          Drop your message
        </Heading>
        <InputField
          label="Name"
          id="name"
          testId="name.input"
          {...register("name")}
          chakraInputProps={{
            placeholder: "Input your name",
          }}
          errorMsg={errors.name?.message}
        />
        <InputField
          label="Email"
          id="email"
          testId="email.input"
          {...register("email")}
          chakraInputProps={{
            placeholder: "Input your email address",
          }}
          errorMsg={errors.email?.message}
        />
        <Box width="full">
          <AutoComplete
            control={control}
            items={constants.CONCERNED_PROJECTS}
            name={"concernedProjects"}
            ariaLabel="concerned-project.input"
            label="Concerned Projects"
            error={formState.errors.concernedProjects?.message}
            fieldLabelProps={{
              mb: "10px",
              lineHeight: "28px",
            }}
            placeholder="Select project"
            selectedProps={{
              width: "full",
            }}
          />
        </Box>
        <Box width="full">
          <AutoComplete
            control={control}
            items={constants.CATEGORIES}
            name={"category"}
            label="Category"
            error={formState.errors.category?.message}
            ariaLabel="category.input"
            fieldLabelProps={{
              mb: "10px",
              lineHeight: "28px",
            }}
            placeholder="Select category"
            selectedProps={{
              width: "full",
            }}
          />
        </Box>
        <FormControl isInvalid={!!errors.description?.message}>
          <VStack align="start">
            <Text color="black">Description</Text>
            <TextareaAutosize
              id="name"
              {...register("description")}
              placeholder="Enter description"
              color=" #111827"
              data-testid="description.input"
              errorBorderColor="red"
              maxRows={4}
              minRows={4}
            />
          </VStack>
          <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
        </FormControl>
        <Button
          onClick={handleSubmit(onSubmitMessage)}
          data-testid="send.button"
          width="full"
        >
          Send
        </Button>
      </Flex>
    </Card>
  );
};

export default ContactUsForm;
