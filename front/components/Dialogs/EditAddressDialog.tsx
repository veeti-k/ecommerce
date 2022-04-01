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

      <InputLabelContainer id="name" label="Name">
        <Input id="name" type="name" autoComplete="name" />
      </InputLabelContainer>

      <InputLabelContainer id="phone-number" label="Phone number">
        <Input id="phone-number" type="tel" autoComplete="tel" />
      </InputLabelContainer>

      <InputLabelContainer id="email" label="Email">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" autoComplete="email" />
      </InputLabelContainer>

      <InputLabelContainer id="street-address" label="Street address">
        <Input id="street-address" type="text" autoComplete="street-address" />
      </InputLabelContainer>

      <InputLabelContainer id="city" label="City">
        <Input id="city" type="text" autoComplete="address-level2" />
      </InputLabelContainer>

      <InputLabelContainer id="zip" label="Zip code">
        <Input id="zip" type="text" autoComplete="postal-code" />
      </InputLabelContainer>

      <InputLabelContainer id="state" label="State">
        <Input id="state" type="text" autoComplete="address-level1" />
      </InputLabelContainer>
    </DialogContent>
  </Dialog>
);
