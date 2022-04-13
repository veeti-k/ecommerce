import { IconButton, Input, Tooltip, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Store } from "../../../types/Store";
import { AddStoreRequest } from "../../../utils/Requests/Store";
import { FlexDiv, InputLabelContainer } from "../../Containers";
import { EditIcon } from "../../Icons";
import { Dialog } from "../Dialog";

type Props = {
  getStores: () => void;
  initialValues: Omit<Store, "id">;
};

export const EditStoreDialog = ({ getStores, initialValues }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [name, setName] = useState<string>(initialValues.name);
  const [phoneNumber, setPhoneNumber] = useState<string>(initialValues.phoneNumber);
  const [city, setCity] = useState<string>(initialValues.city);
  const [streetAddress, setStreetAddress] = useState<string>(initialValues.streetAddress);
  const [zip, setZip] = useState<string>(initialValues.zip);

  const [mondayHours, setMondayHours] = useState<string>(initialValues.mondayHours);
  const [tuesdayHours, setTuesdayHours] = useState<string>(initialValues.tuesdayHours);
  const [wednesdayHours, setWednesdayHours] = useState<string>(initialValues.wednesdayHours);
  const [thursdayHours, setThursdayHours] = useState<string>(initialValues.thursdayHours);
  const [fridayHours, setFridayHours] = useState<string>(initialValues.fridayHours);
  const [saturdayHours, setSaturdayHours] = useState<string>(initialValues.saturdayHours);
  const [sundayHours, setSundayHours] = useState<string>(initialValues.sundayHours);

  const onSubmit = async () => {
    const notifId = toast.loading("Updating store");

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
      toast.success("Store updated");
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
      <Tooltip label="Edit store">
        <IconButton aria-label="Edit store" size="sm" onClick={onOpen}>
          <EditIcon />
        </IconButton>
      </Tooltip>

      <Dialog
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        header="Edit store"
        submitLabel="Edit"
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
