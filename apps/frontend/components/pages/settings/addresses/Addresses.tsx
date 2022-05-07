import { useContext } from "react";
import { UserContext } from "../../../../UserProvider/provider";
import { Card } from "../../../Card";
import { FlexDiv } from "../../../Containers";
import { DeleteAddressDialog } from "../../../Dialogs/Address/DeleteAddressDialog";
import { EditAddressDialog } from "../../../Dialogs/Address/EditAddressDialog";
import { Text } from "../../../Text";

export const Addresses = () => {
  const { state } = useContext(UserContext);

  return (
    <>
      {state.addresses.map((address) => (
        <Card key={address.addressId} shadowNear>
          <FlexDiv style={{ padding: "1rem" }} spaceBetween>
            <FlexDiv column>
              <FlexDiv column gap0>
                <Text bold>{address.name}</Text>
                <Text>{address.streetAddress}</Text>
                <Text>
                  {address.zip} {address.city}
                </Text>
                <Text>{address.state}</Text>
              </FlexDiv>

              <FlexDiv column gap0>
                <Text bold>{address.email}</Text>
                <Text bold>{address.phoneNumber}</Text>
              </FlexDiv>
            </FlexDiv>

            <FlexDiv column gap05>
              <EditAddressDialog address={address} />

              <DeleteAddressDialog address={address} />
            </FlexDiv>
          </FlexDiv>
        </Card>
      ))}
    </>
  );
};
