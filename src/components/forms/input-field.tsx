import { forwardRef, KeyboardEvent, ReactNode } from "react";
import {
  Input,
  InputGroup,
  InputProps,
  InputLeftElement,
  InputRightElement,
} from "@highoutput/ui-components";
import { UseFormRegisterReturn } from "react-hook-form";

import FormContainer, { FormContainerProps } from "./form-container";

interface InputFieldProps extends UseFormRegisterReturn, FormContainerProps {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  chakraInputProps?: InputProps;
  onPressEnter?(): void;
  testId?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (props, ref) => {
    const {
      onChange,
      onBlur,
      name,
      onPressEnter,
      rightIcon,
      leftIcon,
      testId,
      chakraInputProps,
      ...formContainerProps
    } = props;
    return (
      <FormContainer {...formContainerProps}>
        <InputGroup size={chakraInputProps?.size}>
          {leftIcon && <InputLeftElement>{leftIcon}</InputLeftElement>}
          <Input
            {...chakraInputProps}
            ref={ref}
            onChange={onChange}
            color=" #111827"
            onBlur={onBlur}
            name={name}
            data-testid={testId}
            onKeyPress={(e: KeyboardEvent) => {
              if (e.key === "Enter" && onPressEnter) {
                onPressEnter();
              }
            }}
          />
          {rightIcon && (
            <InputRightElement minW="82px">{rightIcon}</InputRightElement>
          )}
        </InputGroup>
      </FormContainer>
    );
  }
);
InputField.displayName = "InputField";

export default InputField;
