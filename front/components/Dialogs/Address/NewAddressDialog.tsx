import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { MouseEvent, useContext, useState } from "react";
import { InputLabelContainer } from "../../Containers";
import { PlusIcon } from "../../Icons";

import { FlexDiv } from "../../Containers";
import { request } from "../../../utils/requests";
import { apiRoutes } from "../../../utils/routes";
import { toast } from "react-hot-toast";
import { getMe } from "../../../utils/logout";
import { UserContext } from "../../../UserProvider/provider";

export const NewAddressDialog = () => {
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [streetAddress, setStreetAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [zip, setZip] = useState<string>("");
  const [state, setState] = useState<string>("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { dispatch } = useContext(UserContext);

  const onSubmit = async (e: MouseEvent) => {
    e.preventDefault();
    const notifId = toast.loading("Adding address");
    const res = await request({
      method: "POST",
      path: apiRoutes.user.addressesRoot("me"),
      body: {
        name,
        phoneNumber,
        email,
        streetAddress,
        city,
        zip,
        state,
      },
    });

    toast.dismiss(notifId);

    if (res) {
      toast.success("Address added");
      getMe(dispatch);

      setName("");
      setPhoneNumber("");
      setEmail("");
      setStreetAddress("");
      setCity("");
      setZip("");
      setState("");

      onClose();
    }
  };

  const submitDisabled =
    !name || !phoneNumber || !email || !streetAddress || !city || !zip || !state;

  return (
    <>
      <Tooltip label="Add an address">
        <Button colorScheme="blue" size="sm" onClick={onOpen}>
          <PlusIcon width={14} style={{ transform: "scale(1.6)" }} />
        </Button>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader style={{ paddingBottom: "0" }}>Add an address</ModalHeader>

          <ModalBody>
            <FlexDiv column>
              <InputLabelContainer id="name" label="Name">
                <Input
                  id="name"
                  type="name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </InputLabelContainer>
              <InputLabelContainer id="phone-number" label="Phone number">
                <Input
                  id="phone-number"
                  type="tel"
                  autoComplete="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </InputLabelContainer>
              <InputLabelContainer id="email" label="Email">
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputLabelContainer>
              <InputLabelContainer id="street-address" label="Street address">
                <Input
                  id="street-address"
                  type="text"
                  autoComplete="street-address"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  required
                />
              </InputLabelContainer>
              <InputLabelContainer id="city" label="City">
                <Input
                  id="city"
                  type="text"
                  autoComplete="address-level2"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </InputLabelContainer>
              <InputLabelContainer id="zip" label="Zip code">
                <Input
                  id="zip"
                  type="text"
                  autoComplete="postal-code"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  required
                />
              </InputLabelContainer>
              <InputLabelContainer id="state" label="State">
                <Input
                  id="state"
                  type="text"
                  autoComplete="address-level1"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </InputLabelContainer>
            </FlexDiv>
          </ModalBody>

          <ModalFooter>
            <FlexDiv flexEnd gap05>
              <Button onClick={onClose}>Cancel</Button>

              <Button colorScheme="blue" onClick={onSubmit} type="submit" disabled={submitDisabled}>
                Add
              </Button>
            </FlexDiv>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
