import React from "react";
import { Alert } from "react-bootstrap/";

interface CommonAlertProps {
  variant: string;
  text: string;
}

const CommonAlert: React.FC<CommonAlertProps> = ({ variant, text }) => {
  return <Alert variant={variant}>{text}</Alert>;
};

export default CommonAlert;
