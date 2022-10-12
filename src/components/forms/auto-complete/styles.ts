import { StylesConfig } from "react-select";

export interface Item {
  value: string | number;
  label: string;
}

interface GetStylesProps {
  error?: boolean;
  multiple?: boolean;
  lastStep?: boolean;
}

const getStyles = ({
  error,
  lastStep,
  multiple,
}: GetStylesProps): StylesConfig<Item> => {
  return {
    menuList: (provided) => ({
      ...provided,
      ":active": {
        background: "transparent",
      },
      "&::-webkit-scrollbar": {
        width: "16px",
        scrollBehavior: "smooth",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#E2E8F0",
        border: "6px solid rgba(0, 0, 0, 0)",
        backgroundClip: "padding-box",
        borderRadius: "9999px",
      },
      maxHeight: "210px",
    }),
    multiValue: (provided) => {
      return {
        ...provided,
        backgroundColor: "#F7FAFC",
        borderColor: "#EDF2F7",
        marginRight: "8px",
        marginBottom: "8px",
      };
    },
    multiValueRemove: (provided) => ({
      ...provided,
      ":hover": {
        backgroundColor: "#F7FAFC",
      },
    }),
    control: (base, state) => {
      return {
        ...base,
        ":focus": {
          borderColor: !lastStep ? "blue.500" : "transparent",
        },
        ":hover": {
          borderColor: !lastStep ? "#3B82F6" : "transparent",
        },
        borderColor: error ? "red" : !lastStep ? "gray.400" : "transparent",
        padding: multiple && state.hasValue ? "8px 0px 0px 0px" : "2px 2px",
        height: "40px",
        boxShadow: "none",
      };
    },
    option: (style, { isFocused, isSelected }) => {
      return {
        ...style,
        backgroundColor: isFocused
          ? "#F7FAFC"
          : isSelected
          ? "#F7FAFC"
          : undefined,
        color: isSelected ? "#374151" : "#374151",
        ":hover": {
          backgroundColor: "#F7FAFC",
        },
        ":active": {
          ...style[":active"],
          backgroundColor: isSelected ? "gray.400" : undefined,
        },
      };
    },
    menu: (style) => {
      return {
        ...style,
        zIndex: 9,
      };
    },
  };
};

export default getStyles;
