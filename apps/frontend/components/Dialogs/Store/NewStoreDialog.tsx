import { IconButton, Input, Tooltip, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { AddStoreRequest } from "../../../utils/Requests/Store";
import { FlexDiv, InputLabelContainer } from "../../Containers";
import { PlusIcon } from "../../Icons";
import { Dialog } from "../Dialog";

type Props = {
  getStores: () => void;
};

export const NewStoreDialog = ({ getStores }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [streetAddress, setStreetAddress] = useState<string>("");
  const [zip, setZip] = useState<string>("");

  const [mondayHours, setMondayHours] = useState<string>("");
  const [tuesdayHours, setTuesdayHours] = useState<string>("");
  const [wednesdayHours, setWednesdayHours] = useState<string>("");
  const [thursdayHours, setThursdayHours] = useState<string>("");
  const [fridayHours, setFridayHours] = useState<string>("");
  const [saturdayHours, setSaturdayHours] = useState<string>("");
  const [sundayHours, setSundayHours] = useState<string>("");

  const onSubmit = async () => {
    const notifId = toast.loading("Adding store");

    const res = await AddStoreRequest({
      name,
      phoneNumber,
      city,
      streetAddress,
      zip,
      mondayHours,
      tuesdayHours,
      wednesdayHours,
      thursdayHours,
      fridayHours,
      saturdayHours,
      sundayHours,
    });

    toast.dismiss(notifId);

    if (res) {
      toast.success("Store added");
      setName("");
      setPhoneNumber("");
      setCity("");
      setStreetAddress("");
      setZip("");
      setMondayHours("");
      setTuesdayHours("");
      setWednesdayHours("");
      setThursdayHours("");
      setFridayHours("");
      setSaturdayHours("");
      setSundayHours("");

      onClose();
      getStores();
    }
  };

  const submitDisabled =
    !name ||
    !phoneNumber ||
    !city ||
    !streetAddress ||
    !zip ||
    !mondayHours ||
    !tuesdayHours ||
    !wednesdayHours ||
    !thursdayHours ||
    !fridayHours ||
    !saturdayHours ||
    !sundayHours;

  return (
    <>
      <Tooltip label="Add a store">
        <IconButton aria-label="Add a store" size="sm" colorScheme="blue" onClick={onOpen}>
          <PlusIcon />
        </IconButton>
      </Tooltip>

      <Dialog
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        header="Add a store"
        submitLabel="Add"
        submitDisabled={submitDisabled}
        onSubmit={onSubmit}
      >
        <FlexDiv column>
          <InputLabelContainer label="Name" id="name">
            <Input
              id="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputLabelContainer>

          <InputLabelContainer label="Phone number" id="phone-number">
            <Input
              id="phone-number"
              type="tel"
              autoComplete="off"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </InputLabelContainer>

          <InputLabelContainer label="City" id="city">
            <Input
              id="city"
              type="text"
              autoComplete="off"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </InputLabelContainer>

          <InputLabelContainer label="Street address" id="street-address">
            <Input
              id="street-address"
              type="text"
              autoComplete="off"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
            />
          </InputLabelContainer>

          <InputLabelContainer label="Zip" id="zip">
            <Input
              id="zip"
              type="text"
              autoComplete="off"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
          </InputLabelContainer>

          <InputLabelContainer label="Monday opening hours" id="m-opening-hours">
            <Input
              id="m-opening-hours"
              type="text"
              autoComplete="off"
              placeholder="e.g. 9-19"
              value={mondayHours}
              onChange={(e) => setMondayHours(e.target.value)}
            />
          </InputLabelContainer>

          <InputLabelContainer label="Tuesday opening hours" id="t-opening-hours">
            <Input
              id="t-opening-hours"
              type="text"
              autoComplete="off"
              placeholder="e.g. 9-19"
              value={tuesdayHours}
              onChange={(e) => setTuesdayHours(e.target.value)}
            />
          </InputLabelContainer>

          <InputLabelContainer label="Wednesday opening hours" id="w-opening-hours">
            <Input
              id="w-opening-hours"
              type="text"
              autoComplete="off"
              placeholder="e.g. 9-19"
              value={wednesdayHours}
              onChange={(e) => setWednesdayHours(e.target.value)}
            />
          </InputLabelContainer>

          <InputLabelContainer label="Thursday opening hours" id="th-opening-hours">
            <Input
              id="th-opening-hours"
              type="text"
              autoComplete="off"
              placeholder="e.g. 9-19"
              value={thursdayHours}
              onChange={(e) => setThursdayHours(e.target.value)}
            />
          </InputLabelContainer>

          <InputLabelContainer label="Friday opening hours" id="f-opening-hours">
            <Input
              id="f-opening-hours"
              type="text"
              autoComplete="off"
              placeholder="e.g. 9-19"
              value={fridayHours}
              onChange={(e) => setFridayHours(e.target.value)}
            />
          </InputLabelContainer>

          <InputLabelContainer label="Saturday opening hours" id="s-opening-hours">
            <Input
              id="s-opening-hours"
              type="text"
              autoComplete="off"
              placeholder="e.g. 9-19"
              value={saturdayHours}
              onChange={(e) => setSaturdayHours(e.target.value)}
            />
          </InputLabelContainer>

          <InputLabelContainer label="Sunday opening hours" id="su-opening-hours">
            <Input
              id="su-opening-hours"
              type="text"
              autoComplete="off"
              placeholder="e.g. 9-19"
              value={sundayHours}
              onChange={(e) => setSundayHours(e.target.value)}
            />
          </InputLabelContainer>
        </FlexDiv>
      </Dialog>
    </>
  );
};
