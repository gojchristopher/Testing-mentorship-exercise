import {
  Category,
  ConcernedProjects,
  ContactUsInputProps,
} from "./../../types/contact-types";

import * as yup from "yup";

export const ContactUsSchema: yup.SchemaOf<ContactUsInputProps> = yup
  .object()
  .shape({
    name: yup.string().max(60).required("Required field"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Required field"),
    category: yup
      .string()
      .oneOf(Object.values(Category))
      .required("Required field"),
    concernedProjects: yup
      .string()
      .oneOf(Object.values(ConcernedProjects))
      .required("Required field"),
    description: yup.string().max(160).optional(),
  })
  .required();

export type contactFormSchemaValues = yup.InferType<typeof ContactUsSchema>;
