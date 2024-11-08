import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import ReCAPTCHA from "react-google-recaptcha";
import { mq } from "../../utils/mediaQueries";
import Modal from "./Modal";
import { Graffle } from "graffle";

const DEFAULT_FORM_DATA_LOGIN = {
  name: "",
  subject: "",
  body: "",
  emailAddress: "",
};

const DEFAULT_FORM_DATA_NO_LOGIN = {
  ...DEFAULT_FORM_DATA_LOGIN,
  emailAddress: "",
};

// ContactUs.isHybridPublic = true;

const ticketSubjectTypes = [
  {
    type: "feedback",
    string: "General Feedback",
  },
  {
    type: "profile",
    string: "Creating your Profile",
  },
  {
    type: "search",
    string: "Searching",
  },
  {
    type: "matches",
    string: "Your Matches",
  },
  {
    type: "contacts",
    string: "Contacts & Messaging",
  },
  {
    type: "account",
    string: "Account Settings",
  },
  {
    type: "payment",
    string: "Subscription and Stamps",
  },
  {
    type: "privacy",
    string: "Security and Privacy",
  },
  {
    type: "technical",
    string: "Technical Issues",
  },
  {
    type: "scammer",
    string: "Report potential scammer",
  },
  {
    type: "event",
    string: "Event Partnership",
  },
  {
    type: "other",
    string: "Other",
  },
];

const graffle = Graffle.create({
  schema: "https://api.r2.rsvphost.com.au",
});

export default function ContactUs() {
  const recaptchaRef = React.createRef<React.RefObject<any>>();

  const [isPopupOpen, togglePopupOpen] = useState(false);
  const [inputState, setInputState] = useState(DEFAULT_FORM_DATA_LOGIN);
  const [createTicketResult, setCreateTicketResult] = useState({
    id: 0,
    message:
      "There was an unexpected error creating the support ticket. Please try again later. ",
  });
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isRecaptchaChecked, setIsRecaptchaChecked] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    const subject = url.searchParams.get("subject");
    let subjectObject = ticketSubjectTypes[0];

    if (subject) {
      const subjectObj = ticketSubjectTypes.find((c) => c.type === subject);

      if (subjectObj) {
        subjectObject = subjectObj;
      }
    }

    setInputState((prev) => ({ ...prev, subject: subjectObject?.type }));
  }, []);

  useEffect(() => {
    let disableSubmitButton = true;
    disableSubmitButton =
      !isRecaptchaChecked ||
      !inputState.name ||
      !inputState.body ||
      !inputState.emailAddress;
    setIsSubmitDisabled(disableSubmitButton);
  }, [inputState, isRecaptchaChecked]);

  const handleOnChangeInput = (ev) => {
    const { id, value } = ev.target;

    setInputState({ ...inputState, [id]: value });
  };

  const handleDropdownChange = (param) => {
    setInputState({ ...inputState, subject: param[0].type });
  };

  const onReCaptchaChange = (captchaCode) => {
    setIsRecaptchaChecked(!!captchaCode);
  };

  const handleSubmitTicket = async (ev) => {
    ev.preventDefault();
    try {
      const data = await graffle
        .gql(
          `
       mutation createNonLoginTicket($input: AnonymousTicketInput) {
    createNonLoginTicket(input: $input) {
      ok
      id
    }
  }
    `
        )
        .send({ input: inputState });
      const response = data?.createNonLoginTicket;
      if (response) {
        setCreateTicketResult({
          id: response.id,
          message:
            "Support ticket {id} has been created. Thank you for contacting us.",
        });
        togglePopupOpen(true);
      }
    } catch {
      setCreateTicketResult({
        id: 0,
        message:
          "There was an unexpected error creating the support ticket. Please try again later. ",
      });
      togglePopupOpen(true);
    }
  };
  const handleFormReset = () => {
    togglePopupOpen(false);

    (recaptchaRef?.current as any)?.reset();
    setIsRecaptchaChecked(false);
    setIsSubmitDisabled(true);

    if (createTicketResult.id !== 0) {
      setInputState({
        ...DEFAULT_FORM_DATA_NO_LOGIN,
        subject: inputState.subject,
      });
      setCreateTicketResult({ ...createTicketResult, id: 0 });
    }
  };
  return (
    <MainContainer>
      <Content>
        <PageTitle>Contact Us</PageTitle>

        <FormWrapper onSubmit={handleSubmitTicket} id="contact-us-form">
          <InputContainer>
            <label htmlFor="name">
              <Text>Name</Text>
            </label>
            <InputTextComponent
              id="name"
              value={inputState.name}
              onChange={handleOnChangeInput}
            />
          </InputContainer>
          <InputContainer>
            <label htmlFor="emailAddress">
              <Text>Email</Text>
            </label>
            <InputTextComponent
              id="emailAddress"
              type="email"
              value={inputState.emailAddress}
              onChange={handleOnChangeInput}
            />
          </InputContainer>
          <InputContainer>
            <label htmlFor="subject">
              <Text>Subject</Text>
            </label>
            <div id="dropdown-subject-container">
              <DropdownSelect onChange={handleDropdownChange}>
                {ticketSubjectTypes.map((s) => (
                  <DropdownSelectOption
                    value={s.type}
                    key={s.type}
                    selected={inputState.subject === s.type}
                  >
                    {s.string}
                  </DropdownSelectOption>
                ))}
              </DropdownSelect>
            </div>
          </InputContainer>
          <InputContainer height="206" width={[349, 770]}>
            <MessageLabel htmlFor="body">
              <Text>Message</Text>
            </MessageLabel>
            <Textarea
              id="body"
              value={inputState.body}
              placeholder="Write your message..."
              onChange={handleOnChangeInput}
            />
          </InputContainer>
          <ReCaptchaContainer>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6LeygOAhAAAAAOWxbi-c9nbTm1Gip66bIBY2hYiK"
              onChange={onReCaptchaChange}
            />
          </ReCaptchaContainer>
          <SubText>
            Most questions will be answered within one working day. Premium
            subscribers will receive higher priority customer support.
          </SubText>
          <ButtonContainer>
            <Button type="submit" disabled={isSubmitDisabled}>
              SUBMIT
            </Button>
          </ButtonContainer>
        </FormWrapper>
      </Content>

      {isPopupOpen && (
        <Modal
          title="Contact Us"
          onClose={() => togglePopupOpen(false)}
          onConfirm={handleFormReset}
        >
          {createTicketResult.id ? (
            <ModalContent>
              <span>{createTicketResult.message.split("{id}")[0]}</span>
              <span>
                <b>{createTicketResult.id}</b>
              </span>
              <span>{createTicketResult.message.split("{id}")[1]}</span>
            </ModalContent>
          ) : (
            <Text>{createTicketResult.message}</Text>
          )}
        </Modal>
      )}
    </MainContainer>
  );
}

/**
 * Functions
 */

/**
 * Components
 */

const PageTitle = styled.div(
  mq({
    minHeight: 27,
    minWidth: 191,
    color: "#5a3f99",
    fontSize: 26,
    fontWeight: "bold",
    lineHeight: 1.5,
    borderBottom: "5px solid #5a3f99",
    marginTop: 31,
  })
);

const Text = styled.div`
  font-size: 16px;
  margin: 0;
  line-height: 38px;
  text-align: center;
`;

const SubText = styled.p`
  font-size: 14px;
`;

const MessageLabel = styled.label(
  mq({
    display: ["none", "block"],
  })
);

const Textarea = styled.textarea(
  mq({
    height: [285, 206],
    width: ["100%", 654],
    fontSize: [16, 15],
    color: "rgb(51, 51, 51)",
    backgroundColor: "#fff",
    border: "1px solid rgb(153, 153, 153)",
    borderRadius: 4,
    padding: "9px 10px",
  })
);
const MainContainer = styled("div")(
  mq({
    display: "flex",
    flexDirection: ["column-reverse", "row"],
    width: ["100%", 1180],
    justifyContent: "space-between",
    margin: "0 auto",
  })
);

const Content = styled("div")(
  mq({
    display: "flex",
    flexDirection: "column",
    justifyContent: ["center", "unset"],
    width: ["100%", 770],
    alignItems: ["center", "unset"],
    margin: ["0 auto", 0],
  })
);

const FormWrapper = styled("form")(
  mq({
    width: [349, 770],
    marginTop: 30,
    button: {
      minHeight: [44, 40],
      minWidth: [150, 140],
      fontSize: [20, 18],
    },
  })
);

const InputContainer = styled("div")<any>(
  ({
    alignItems = "flex-start",
    width = [349, 435],
    marginBottom = [30, 15],
    height = 38,
  }) =>
    mq({
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems,
      width,
      marginBottom,
      height,
    })
);

const InputTextComponent = styled.input(
  mq({
    fontSize: [16, 15],
    width: [250, 320],
    color: "rgb(51, 51, 51)",
    backgroundColor: "#fff",
    border: "1px solid rgb(153, 153, 153)",
    borderRadius: 4,
    padding: "0 9px",
    height: 38,
  })
);

const ReCaptchaContainer = styled("div")(
  mq({
    margin: ["9px 0 15px", "9px 0 15px 114px"],
  })
);

const ButtonContainer = styled("div")(
  mq({
    display: "flex",
    justifyContent: ["center", "start"],
    marginTop: [25, 15],
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

const Button = styled.button(
  mq({
    backgroundColor: "rgb(15,139,141)",
    fontSize: 18,
    minWidth: 140,
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

const ModalContent = styled.div`
  text-align: center;
`;
