import { AlertCircle, CheckCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FC } from "react";

interface LoginAlertProps {
  title: string;
  message: string;
}

export const LoginAlert: FC<LoginAlertProps> = ({ title, message }) => {
  return (
    <Alert variant="default" className="w-[300px] gap-2 border-accent">
      {title === "Login Failed!" ? (
        <AlertCircle className="h-5 w-5 stroke-red-500" />
      ) : (
        <CheckCircle className="h-5 w-5 stroke-accent" />
      )}
      {title === "Login Failed!" ? (
        <AlertTitle className="text-red-500"> {title} </AlertTitle>
      ) : (
        <AlertTitle className="text-accent"> {title} </AlertTitle>
      )}
      {title === "Login Failed!" ? (
        <AlertDescription className="text-red-500">
          {" "}
          {message}{" "}
        </AlertDescription>
      ) : (
        <AlertDescription className="text-accent"> {message} </AlertDescription>
      )}
    </Alert>
  );
};
