import { Button, Input, Tooltip } from "@chakra-ui/react";
import { FormEvent, useContext, useState } from "react";
import { InputLabelContainer } from "../Containers";
import { PlusIcon } from "../Icons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./Dialog";
import { FlexDiv } from "../Containers";
import { request } from "../../utils/requests";
import { apiRoutes } from "../../utils/routes";
import { toast } from "react-hot-toast";
import { getMe } from "../../utils/logout";
import { UserContext } from "../../UserProvider/provider";

export const NewAddressDialog = () => {
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [streetAddress, setStreetAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [zip, setZip] = useState<string>("");
  const [state, setState] = useState<string>("");

  const [open, setOpen] = useState<boolean>(false);

  const { dispatch } = useContext(UserContext);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const notifId = toast.loading("Adding the address");
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
      toast.success("Address added successfully");
      getMe(dispatch);

      setName("");
      setPhoneNumber("");
      setEmail("");
      setStreetAddress("");
      setCity("");
      setZip("");
      setState("");

      setOpen(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
      }}
    >
      <Tooltip label="Add an address">
        <DialogTrigger asChild>
          <Button colorScheme="blue" size="sm">
            <PlusIcon width={14} style={{ transform: "scale(1.6)" }} />
          </Button>
        </DialogTrigger>
      </Tooltip>

      <DialogContent>
        <form onSubmit={handleSubmit}>
          <FlexDiv column>
            <div>
              <DialogTitle style={{ fontWeight: 700 }}>Add an address</DialogTitle>
              <DialogDescription style={{ fontWeight: 300 }}>
                Add a new address here.
              </DialogDescription>
            </div>

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

            <FlexDiv flexEnd gap05>
              <DialogClose asChild>
                <Button>Cancel</Button>
              </DialogClose>

              <Button colorScheme="blue" type="submit">
                Add
              </Button>
            </FlexDiv>
          </FlexDiv>
        </form>
      </DialogContent>
    </Dialog>
  );
};
