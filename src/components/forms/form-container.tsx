import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
  useMultiStyleConfig,
} from "@highoutput/ui-components";
import * as React from "react";
import FieldLabel from "./field-label";

export interface FormContainerProps {
  id: string;
  label?: string;
  errorMsg?: string;
  helperMsg?: string;
  formControlProps?: FormControlProps;
  isReadOnly?: boolean;
  required?: boolean;
  errorPosition?: "top" | "bottom";
}

const FormContainer = ({
  id,
  label,
  errorMsg,
  helperMsg,
  formControlProps,
  children,
  required,
  isReadOnly,
  errorPosition = "bottom",
}: React.PropsWithChildren<FormContainerProps>) => {
  const styles = useMultiStyleConfig("Form", {});
  return (
    <FormControl
      sx={styles.formControl}
      id={id}
      isInvalid={Boolean(errorMsg)}
      isReadOnly={isReadOnly}
      {...formControlProps}
    >
      {errorPosition === "top" && (
        <FormErrorMessage mb={2} sx={styles.formErrorMessage}>
          {errorMsg}
        </FormErrorMessage>
      )}
      {label && (
        <FieldLabel
          label={label}
          required={required}
          containerProps={{ marginBottom: "8px" }}
        />
      )}
      {children}
      {errorPosition === "bottom" && (
        <FormErrorMessage sx={styles.formErrorMessage}>
          {errorMsg}
        </FormErrorMessage>
      )}
      {helperMsg && (
        <FormHelperText sx={styles.formHelperText}>{helperMsg}</FormHelperText>
      )}
    </FormControl>
  );
};

export default FormContainer;
