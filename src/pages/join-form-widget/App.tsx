import React, { ChangeEvent, useRef, useState } from "react";
import styled from "@emotion/styled";
import debounce from "../../utils/debounce";
import { Graffle, TypedDocument } from "graffle";

type JoinForm = {
  gender?: GenderItem;
  lookingFor?: GenderItem;
  location?: Location;
};

type GenderItem = {
  type: Gender;
  string: string;
};

enum Gender {
  Female = "female",
  Male = "male",
}

const genderTypes: GenderItem[] = [
  {
    type: Gender.Female,
    string: "Woman",
  },
  {
    type: Gender.Male,
    string: "Man",
  },
];

interface Location {
  id: string;
  words: string;
  countryName: string;
  regionName: string;
  placeName: string;
  longitude: number;
  latitude: number;
}

interface LocationState {
  keyword: string;
  locations: Location[];
  isValid: boolean;
  isVisible: boolean;
  isEmpty: boolean;
}

const graffle = Graffle.create({
  schema: "https://api.qa.r2.rsvphost.com.au/graphql",
});

type Document = TypedDocument.String<
  {
    getLocationsBySearch: Location[];
  },
  { keyword: string }
>;

export default function JoinFormWidget() {
  const [formState, setFormState] = useState<JoinForm>({});
  const [genderErrorMessage, setGenderErrorMessage] = useState<string>();
  const [locationErrorMessage, setLocationErrorMessage] = useState<string>();
  const [locationState, setLocationState] = useState<LocationState>({
    keyword: "",
    locations: [],
    isValid: true,
    isVisible: false,
    isEmpty: false,
  });
  const inputLocationRef = useRef<HTMLInputElement | null>(null);

  const handleGenderOnchange = (gender: GenderItem) => () => {
    setFormState((prev) => ({
      ...prev,
      gender,
    }));
  };

  const handleLookingForOnchange = (gender: GenderItem) => () => {
    setFormState((prev) => ({
      ...prev,
      lookingFor: gender,
    }));
  };

  const handleLocationOnchange = (location: Location) => {
    setFormState((prev) => ({
      ...prev,
      location,
    }));
  };

  const onBlurLocation = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.value || locationState.locations.length === 0) {
      setLocationState({ ...locationState, isVisible: false, isValid: false });
    }
  };

  const handleOnKeyUpLocation = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const data = await graffle
      .gql<Document>(
        `
      query getLocationsBySearch($keyword: String!) {
        getLocationsBySearch(keyword: $keyword) {
          id
          words
          countryName
          regionName
          placeName
          longitude
          latitude
        }
      }
    `
      )
      .send({ keyword: e.target.value });

    if (data) {
      setLocationState({
        ...locationState,
        keyword: e.target.value,
        isVisible: true,
        locations: data.getLocationsBySearch,
      });
    }
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!formState?.gender || !formState?.lookingFor) {
      setGenderErrorMessage("Please select gender(s).");
    }
    if (!formState?.location) {
      setLocationErrorMessage("Your location is required.");
    }
    if (formState?.gender && formState?.lookingFor && formState?.location) {
      const productUrl = new URL("https://dating.rsvp.com.au");
      const { gender, lookingFor, location } = formState;
      productUrl.searchParams.set("gender", JSON.stringify(gender));
      productUrl.searchParams.set("seekingGender", JSON.stringify(lookingFor));
      productUrl.searchParams.set("location", JSON.stringify(location));
      productUrl.searchParams.set("join", "true");
      window.open(productUrl);
    }
  };

  return (
    <JoinFormWrapper>
      <Header>Find your ideal date from thousands of members!</Header>
      <JoinFormContainer
        onSubmit={(e) => {
          e.preventDefault();
          return false;
        }}
      >
        <GenderInfoWrapper>
          <GenderWrapper>
            <GenderLabel>I am a</GenderLabel>
            <GenderOptions>
              {genderTypes.map((g) => (
                <GenderStyledButton
                  key={g.type}
                  isSelected={formState.gender?.type === g.type}
                  onClick={handleGenderOnchange(g)}
                >
                  {g.string}
                </GenderStyledButton>
              ))}
            </GenderOptions>
          </GenderWrapper>
          <GenderWrapper>
            <GenderLabel>Looking for a</GenderLabel>
            <GenderOptions>
              {genderTypes.map((g) => (
                <GenderStyledButton
                  key={g.type}
                  isSelected={formState.lookingFor?.type === g.type}
                  onClick={handleLookingForOnchange(g)}
                >
                  {g.string}
                </GenderStyledButton>
              ))}
            </GenderOptions>
          </GenderWrapper>
        </GenderInfoWrapper>
        {genderErrorMessage && (
          <ErrorTextContainer>{genderErrorMessage}</ErrorTextContainer>
        )}
        <InputContainer>
          <LocationInput
            ref={inputLocationRef}
            placeholder="My location (Suburb, town or postcode)"
            error={!!locationErrorMessage}
            onBlur={onBlurLocation}
            onKeyUp={(e) => debounce(handleOnKeyUpLocation(e as any))}
          />
          {locationState.isVisible &&
            locationState.keyword &&
            !formState.location?.id && (
              <LocationListWrapper>
                <>
                  {locationState.locations.length === 0 ? (
                    <LocationWrapper data-test="location-element-empty" isEmpty>
                      No result
                    </LocationWrapper>
                  ) : (
                    locationState.locations.map((locationObj) => (
                      <LocationWrapper
                        data-test="location-element"
                        key={locationObj.id}
                        onClick={() => {
                          handleLocationOnchange(locationObj);
                          setLocationErrorMessage("");
                          setLocationState({
                            ...locationState,
                            isValid: true,
                            isVisible: false,
                            isEmpty: false,
                          });
                          if (inputLocationRef.current) {
                            inputLocationRef.current.value = locationObj.words;
                          }
                        }}
                      >
                        {`${locationObj.words}, ${locationObj.regionName}`}
                      </LocationWrapper>
                    ))
                  )}
                </>
              </LocationListWrapper>
            )}
        </InputContainer>
        {locationErrorMessage && (
          <ErrorTextContainer>{locationErrorMessage}</ErrorTextContainer>
        )}

        <StyledButton onClick={onSubmit}>Join for free</StyledButton>
        <TermsText>
          By joining you certify that you are over 18 and agree to the RSVP
          <TermsLink href="/terms-of-service"> Terms of Service </TermsLink>
          and
          <TermsLink href="/privacy-policy"> Privacy Policy </TermsLink>
        </TermsText>
      </JoinFormContainer>
    </JoinFormWrapper>
  );
}

const JoinFormWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 410px;
  background-color: #ffffff;
  padding: 30px 0 5px;
  border-radius: 35px;
  border: 1px solid #ffffff;
`;

const Header = styled.div`
  color: #5a3f99;
  width: 415px;
  border-radius: 5px;
  text-align: center;
  padding-bottom: 28px;
  font-weight: 700;
  font-size: 26px;
`;

const JoinFormContainer = styled.div`
  text-align: center;
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TermsText = styled.div`
  min-height: 37px;
  width: 322px;
  font-size: 11px;
  line-height: 15px;
  color: #666666;
  text-align: center;
  margin: 10px auto 0;
  > a {
    display: inline;
  }
`;

const TermsLink = styled.a`
  color: #0f8b8d;
`;

const StyledButton = styled.button`
  margin: 0 auto;
  font-size: 32px;
  border-radius: 30px;
  height: 60px;
  width: 100%;
  max-width: 357px;
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #5a3f99;
  color: #fff;
  cursor: pointer;
  border: 0;
`;

const ErrorTextContainer = styled.div`
  display: flex;
  background-color: #f35e5e;
  font-size: 12px;
  color: #ffffff;
  height: 22px;
  align-items: center;
  width: 358px;
  padding: 0 10px;
  border-radius: 5px;
  margin-top: -10px;
  margin-bottom: 10px;
  margin-left: 28px;
  margin-right: 26px;
`;

const GenderInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 28px;
`;

const GenderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 20px;
`;

const GenderLabel = styled.p`
  display: flex;
  font-weight: 400;
  align-items: center;
  width: 133px;
  text-align: left;
  font-size: 18px;
  color: #333;
  margin: 0;
`;

const GenderOptions = styled.div`
  display: flex;
  text-transform: lowercase;
  gap: 24px;
`;

const GenderStyledButton = styled.button<{ isSelected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 100px;
  font-size: 16px;
  color: ${({ isSelected }) => (isSelected ? "#fff" : "#5a3f99")};
  border: 1px solid #5a3f99;
  background-color: ${({ isSelected }) =>
    isSelected ? "#5a3f99" : "transparent"};
  border-radius: 15px;
  cursor: pointer;

  &:hover {
    color: #fff;
    background-color: #7a58c8;
  }

  &:active {
    outline: none;
  }
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 375px;
  margin: 0 auto;
  margin-bottom: 14px;
  padding: 0 28px;
  font-size: 18;
`;

const LocationInput = styled.input<{ error: boolean }>`
  margin: 0 20px;
  line-height: 22px;
  font-size: 16px;
  border-width: 0;
  color: #333;
  border-bottom: ${({ error }) =>
    error ? "2px solid #F35E5E" : "1px solid #0f8b8d"};
  background-color: #fff;
  padding: 4px 0;
  &:focus {
    outline: none;
  }
`;

const LocationListWrapper = styled.div`
  position: absolute;
  background-color: #fff;
  z-index: 2;
  overflow-y: auto;
  width: 360px;
  height: auto;
  min-height: 18px;
  max-height: 120px;
  border: 1px solid #999;
  text-align: left;
  left: 50%;
  transform: translateX(-50%);
  bottom: 100%;
`;
const LocationWrapper = styled.div<{ isEmpty?: boolean }>`
  padding: 8px 9px 4px;
  color: ${({ isEmpty }) => (isEmpty ? "#ccc" : "#333")};
  cursor: ${({ isEmpty }) => (isEmpty ? "default" : "pointer")};
  :hover {
    background-color: ${({ isEmpty }) => (isEmpty ? "#fff" : "#dfd8f0")};
  }
`;
