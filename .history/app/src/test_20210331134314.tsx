import React from "react";
import { useTranslation } from "react-i18next";
const Test: React.FC = () => {
  const { t } = useTranslation();
  return <p style={{ color: "#ffffff" }}>Typescript code</p>;
};

export default Test;
