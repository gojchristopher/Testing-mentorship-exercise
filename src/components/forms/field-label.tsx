import { HStack, StackProps, Text } from "@highoutput/ui-components";

type WithoutChildren<T extends {}> = Omit<T, "children">;

interface LabelProps {
  label?: string;
  required?: boolean;
  containerProps?: WithoutChildren<StackProps>;
}

const FieldLabel = ({
  label,
  required,
  containerProps,
  ...props
}: LabelProps) => {
  return (
    <HStack {...containerProps}>
      <Text
        as="label"
        fontSize="14px"
        lineHeight="14px"
        color="gray.700"
        fontWeight="500"
        {...props}
      >
        {label}
      </Text>

      {required && <Text color="red.500">*</Text>}
    </HStack>
  );
};

export default FieldLabel;
