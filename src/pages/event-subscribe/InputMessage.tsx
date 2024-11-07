import React, { HTMLAttributes, ReactNode } from "react";
import styled from "@emotion/styled";

import { mq } from "../../utils/mediaQueries";

interface Props extends HTMLAttributes<HTMLDivElement> {
  isError?: boolean;
  marginTop?: number;
  minHeight?: number | number[];
  padding?: string | string[] | number;
  text?: string;
  children?: ReactNode;
  hideBackground?: boolean;
  textAlign?: string;
}

const InputValidationAlert: React.FC<Props> = ({
  isError = false,
  marginTop = 2,
  minHeight = 32,
  padding = "0 6px 1px 7px",
  text,
  children,
  hideBackground = false,
  textAlign,
  ...otherProps
}) => (
  <Container
    isError={isError}
    marginTop={marginTop}
    padding={padding}
    hideBackground={hideBackground}
    {...otherProps}
  >
    <Text
      minHeight={minHeight}
      hideBackground={hideBackground}
      style={{ justifyContent: textAlign }}
    >
      {text || children}
    </Text>
  </Container>
);

const Container = styled("div")<{
  isError: boolean;
  marginTop: number;
  padding: string | string[] | number;
  hideBackground: boolean;
}>(({ isError, marginTop, padding, hideBackground }) =>
  mq({
    backgroundColor: hideBackground ? "unset" : isError ? "#F35E5E" : "#0F8B8D",
    color: hideBackground ? "F35E5E" : "unset",
    borderRadius: 5,
    marginTop: `${marginTop}px !important`,
    padding: hideBackground ? "unset" : padding,
  })
);

const Text = styled("div")<{
  minHeight: number | number[];
  hideBackground: boolean;
}>(({ minHeight, hideBackground }) =>
  mq({
    minHeight,
    color: hideBackground ? "#F35E5E" : "#fff",
    fontSize: 12,
    fontFamily: "AvenirNext",
    lineHeight: "13px",
    textAlign: "left",
    display: "flex",
    alignItems: "center",
  })
);

export default InputValidationAlert;
