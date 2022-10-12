import {
  ToastId,
  useToast as useOriginalToast,
} from "@highoutput/ui-components";
import Toast from "@/components/toast";
import * as React from "react";

type AppToastVariant = "info" | "success" | "warning" | "danger";

interface AppToastConfig {
  variant: AppToastVariant;
  duration: number;
  callback: () => void;
}

const useToast = () => {
  const originalToast = useOriginalToast();
  const originalToastRef = React.useRef<ToastId | undefined>();

  const closeCurrentToast = () => {
    if (originalToastRef.current) originalToast.close(originalToastRef.current);
  };

  return (message: string, config: Partial<AppToastConfig> = {}) => {
    closeCurrentToast();

    originalToastRef.current = originalToast({
      position: "top",
      duration: config.duration ?? 2000,
      onCloseComplete: config.callback,
      containerStyle: {
        marginTop: "2rem",
      },
      render: () => (
        <Toast
          variant={config.variant}
          onClose={closeCurrentToast}
          message={message}
        />
      ),
    });
  };
};

export default useToast;
