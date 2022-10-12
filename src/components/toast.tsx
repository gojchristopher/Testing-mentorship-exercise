import {
  CloseButton,
  Flex,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from "@highoutput/ui-components";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { RiErrorWarningLine } from "react-icons/ri";
import { IoInformationCircleOutline } from "react-icons/io5";
import { TiWarningOutline } from "react-icons/ti";

type AppToastVariant = "info" | "success" | "warning" | "danger";

interface ToastProps {
  variant?: AppToastVariant;
  message?: string;
  onClose?: () => void;
}

export default function Toast({
  variant = "success",
  onClose,
  message,
}: ToastProps) {
  const getIcon = () => {
    switch (variant) {
      case "danger":
        return RiErrorWarningLine;
      case "warning":
        return TiWarningOutline;
      case "info":
        return IoInformationCircleOutline;
      default:
        return BsFillCheckCircleFill;
    }
  };

  return (
    <Flex
      p={4}
      gap={4}
      data-testid="toast"
      align="start"
      shadow="md"
      rounded="6px"
      {...(variant === "info" && {
        borderColor: "blue.600",
        bgColor: "blue.300",
      })}
      {...(variant === "danger" && {
        borderColor: "red.600",
        bgColor: "red.500",
      })}
      {...(variant === "warning" && {
        borderColor: "yellow.600",
        bgColor: "yellow.50",
      })}
      {...(variant === "success" && {
        borderColor: "green.600",
        bgColor: "green.500",
      })}
    >
      <HStack align="start" spacing="12px">
        <Icon
          as={getIcon()}
          fontSize="20px"
          {...(variant === "info" && { stroke: "white" })}
          {...(variant === "danger" && { stroke: "white" })}
          {...(variant === "warning" && { stroke: "yellow.600" })}
          {...(variant === "success" && { fill: "white", stroke: "green.500" })}
        />

        <VStack align="start" spacing="0px" pt={0}>
          <Heading fontSize="18px" fontWeight="700" color="white" mb="4px">
            {variant === "success" && "Success"}
            {variant === "info" && "Info"}
            {variant === "danger" && "Error"}
            {variant === "warning" && "Warning"}
          </Heading>
          <Text
            w="288px"
            flexGrow={1}
            fontWeight="400"
            color="white"
            fontSize="14px"
            lineHeight="20px"
          >
            {message}
          </Text>
        </VStack>
        <CloseButton
          alignSelf="flex-start"
          width="8px"
          height="8px"
          onClick={onClose}
          color="white"
          _hover={{ bgColor: "none" }}
          _active={{ bgColor: "none" }}
        />
      </HStack>
    </Flex>
  );
}
