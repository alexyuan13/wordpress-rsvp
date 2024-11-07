import styled from "@emotion/styled";
import React, { useState } from "react";
import { Graffle } from "graffle";

import Modal from "./Modal";
import InputValidationAlert from "./InputMessage";

import { useValidation } from "./utils/useValidation.hook";
import { mq } from "../../utils/mediaQueries";

const stateList = [
  {
    label: "ANY",
    value: "ANY",
  },
  {
    label: "NSW",
    value: "NSW",
  },
  {
    label: "VIC",
    value: "VIC",
  },
  {
    label: "QLD",
    value: "QLD",
  },
  {
    label: "WA",
    value: "WA",
  },
  {
    label: "SA",
    value: "SA",
  },
  {
    label: "TAS",
    value: "TAS",
  },
  {
    label: "NT",
    value: "NT",
  },
  {
    label: "ACT",
    value: "ACT",
  },
];

type EventSubscribeModalProps = {
  onClose: () => void;
};

const graffle = Graffle.create({
  schema: "https://api.qa.r2.rsvphost.com.au/graphql",
});

export default function EventSubscribeModal({
  onClose,
}: EventSubscribeModalProps) {
  const [name, setName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [state, setState] = useState(stateList[0].value);
  const [successMessage, setSuccessMessage] = useState("");
  const {
    validateDisplayName,
    validateEmail,
    displayNameErrorMessage,
    emailErrorMessage,
    setEmailErrorMessage,
    setDisplayNameErrorMessage,
  } = useValidation();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      if (!validateDisplayName(name)) {
        setDisplayNameErrorMessage(
          "Your name must be at least 4 characters long and should not be longer than 30."
        );
      }

      if (validateEmail(emailAddress)) {
        await graffle
          .gql(
            ` 
            mutation subscribeEvent($input: SubscribeEventInput) {
              subscribeEvent(input: $input) {
                ok
                errorCode
              }
          }`
          )
          .send({
            input: {
              name,
              emailAddress,
              state,
            },
          });

        setEmailErrorMessage("");
        setDisplayNameErrorMessage("");
        setSuccessMessage("Subscribed!");
        setTimeout(() => {
          onClose();
          setSuccessMessage("");
        }, 1500);
      }
    } catch {
      setEmailErrorMessage("");
      setDisplayNameErrorMessage("");
    }
  };

  const handleClose = () => {
    setEmailErrorMessage("");
    setDisplayNameErrorMessage("");
    setSuccessMessage("");
    onClose();
  };

  return (
    <Modal onClose={handleClose}>
      <Container>
        <SubTitle>Subscribe To Events</SubTitle>
        <form onSubmit={handleSubscribe} autoComplete="off">
          <InputContainer>
            <InputTextComponent
              id="usernameOrEmail"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              isError={!!displayNameErrorMessage}
              autoFocus
            />
            {displayNameErrorMessage && (
              <InputValidationAlert
                text={displayNameErrorMessage}
                minHeight={20}
                isError
                marginTop={0}
                hideBackground
                textAlign="center"
              />
            )}
          </InputContainer>
          <InputContainer>
            <InputTextComponent
              id="email"
              placeholder="Email"
              onChange={(e) => {
                setEmailAddress(e.target.value);
                setEmailErrorMessage("");
              }}
              isError={!!emailErrorMessage}
              autoFocus
            />
            {emailErrorMessage && (
              <InputValidationAlert
                text={emailErrorMessage}
                minHeight={20}
                isError
                marginTop={10}
                textAlign="center"
              />
            )}
          </InputContainer>
          <StateInputContainer>
            <div style={{ marginRight: 20 }}>State: </div>
            <DropdownSelect onChange={(v) => setState(v[0].value)}>
              {stateList.map((s) => (
                <DropdownSelectOption
                  value={s.value}
                  key={s.value}
                  selected={state === s.value}
                >
                  {s.label}
                </DropdownSelectOption>
              ))}
            </DropdownSelect>
          </StateInputContainer>
          <ButtonContainer>
            <Button type="submit">Subscribe</Button>
          </ButtonContainer>
          {successMessage && <SuccessText>{successMessage}</SuccessText>}
        </form>
      </Container>
    </Modal>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  * {
    box-sizing: border-box;
  }
`;
const SubTitle = styled("div")(() =>
  mq({
    minHeight: 32,
    color: "#5A3F99",
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "AvenirNext",
    lineHeight: "25px",
    textAlign: "center",
    padding: "10px 0px",
  })
);

const InputContainer = styled("div")({
  margin: "10px 0px",
});

const ButtonContainer = styled("div")(
  mq({
    display: "flex",
    justifyContent: ["center", "start"],
    marginTop: [25, 15],
  })
);

const Button = styled.button(
  mq({
    backgroundColor: "#5A3F99",
    fontSize: 18,
    minWidth: 240,
    minHeight: 40,
    borderRadius: 26,
    border: 0,
    color: "#fff",
    fontWeight: "400",
    cursor: "pointer",
    ":disabled": {
      opacity: 0.5,
    },
  })
);
const StateInputContainer = styled("div")({
  flexDirection: "row",
  display: "flex",
  alignItems: "center",
  margin: "20px 0px",
  color: "#333",
});

const SuccessText = styled("div")({
  marginTop: 10,
  textAlign: "center",
  color: "green",
});

const InputTextComponent = styled.input<{ isError: boolean }>(({ isError }) =>
  mq({
    fontSize: [16, 15],
    width: "100%",
    color: "rgb(51, 51, 51)",
    backgroundColor: "#fff",
    border: "none",
    borderBottom: isError
      ? "1px solid #f35e5e"
      : "1px solid rgb(153, 153, 153)",
    padding: "0 9px",
    height: 38,
    outline: "none",
  })
);

const DropdownSelect = styled.select(
  mq({
    alignItems: "center",
    width: [250, 320],
    height: 38,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "rgb(51, 51, 51)",
    border: "1px solid rgb(153, 153, 153)",
    borderRadius: 4,
    padding: "0 9px",
  })
);

const DropdownSelectOption = styled.option(
  mq({
    fontSize: 16,
    color: "rgb(51, 51, 51)",
  })
);
