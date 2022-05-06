import { IconButton, Input, Tooltip, useDisclosure } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { InputLabelContainer } from "../../Containers";
import { EditIcon } from "../../Icons";
import { FlexDiv } from "../../Containers";
import { toast } from "react-hot-toast";
import { UserContext } from "../../../UserProvider/provider";
import { EditAddressRequest } from "../../../utils/Requests/Address";
import { Address } from "../../../types/User";
import { Dialog } from "../Dialog";
import { GetMe } from "../../../utils/Requests/Account";

export const EditAddressDialog = ({ address }: { address: Address }) => {
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [streetAddress, setStreetAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [zip, setZip] = useState<string>("");
  const [state, setState] = useState<string>("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { dispatch } = useContext(UserContext);

  const onSubmit = async () => {
    const notifId = toast.loading("Editing address");

    const res = await EditAddressRequest(address.addressId, {
      name,
      phoneNumber,
      email,
      streetAddress,
      city,
      zip,
      state,
    });

    toast.dismiss(notifId);

    if (res) {
      toast.success("Address edited");
      GetMe(dispatch);

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

  useEffect(() => {
    if (!address) return;

    setName(address.name);
    setPhoneNumber(address.phoneNumber);
    setEmail(address.email);
    setStreetAddress(address.streetAddress);
    setCity(address.city);
    setZip(address.zip);
    setState(address.state);
  }, [address]);

  return (
    <>
      <Tooltip label="Edit address">
        <IconButton
          aria-label="Edit address"
          colorScheme="blue"
          size="sm"
          icon={<EditIcon />}
          onClick={onOpen}
        />
      </Tooltip>

      <Dialog
        header="Edit address"
        submitLabel="Update"
        submitDisabled={submitDisabled}
        onSubmit={onSubmit}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      >
        {" "}
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
      </Dialog>
    </>
  );
};
