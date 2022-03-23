import { Button, Input, Tooltip } from "@chakra-ui/react";
import { InputLabelContainer } from "../Containers";
import { EditIcon } from "../Icons";
import { Label, Paragraph } from "../Text";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./Dialog";

export const EditAddressDialog = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Tooltip label="Edit address">
        <Button colorScheme="blue" size="sm">
          <EditIcon />
        </Button>
      </Tooltip>
    </DialogTrigger>

    <DialogContent>
      <DialogTitle>
        <Paragraph>Edit address</Paragraph>
      </DialogTitle>
      <DialogDescription>
        Make changes to the address here. Click save when you&#39;re done.
      </DialogDescription>

      <InputLabelContainer>
        <Label htmlFor="name">Name</Label>
        <Input id="name" type="name" autoComplete="name" />
      </InputLabelContainer>

      <InputLabelContainer>
        <Label htmlFor="phone-number">Phone number</Label>
        <Input id="phone-number" type="tel" autoComplete="tel" />
      </InputLabelContainer>

      <InputLabelContainer>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" autoComplete="email" />
      </InputLabelContainer>

      <InputLabelContainer>
        <Label htmlFor="street-address">Street address</Label>
        <Input id="street-address" type="text" autoComplete="street-address" />
      </InputLabelContainer>

      <InputLabelContainer>
        <Label htmlFor="city">City</Label>
        <Input id="city" type="text" autoComplete="address-level2" />
      </InputLabelContainer>

      <InputLabelContainer>
        <Label htmlFor="zip">Zip code</Label>
        <Input id="zip" type="text" autoComplete="postal-code" />
      </InputLabelContainer>

      <InputLabelContainer>
        <Label htmlFor="state">State</Label>
        <Input id="state" type="text" autoComplete="address-level1" />
      </InputLabelContainer>
    </DialogContent>
  </Dialog>
);
