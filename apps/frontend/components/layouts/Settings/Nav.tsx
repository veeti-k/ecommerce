import { routes } from "../../../utils/routes";
import { UserIcon, PasswordIcon, AddressesIcon, SessionsIcon } from "../../Icons";
import { Text } from "../../Text";
import { PageSelectorButtons, PageSelectorButton } from "../Styles";

export const SettingsNav = () => (
  <PageSelectorButtons>
    <PageSelectorButton
      route={routes.settingsAccount}
      active={window.location.pathname.includes("password")}
    >
      <UserIcon /> <Text>Account</Text>
    </PageSelectorButton>
    <PageSelectorButton
      route={routes.settingsPassword}
      active={window.location.pathname.includes("password")}
    >
      <PasswordIcon /> <Text>Password</Text>
    </PageSelectorButton>
    <PageSelectorButton
      route={routes.settingsAddresses}
      active={window.location.pathname.includes("password")}
    >
      <AddressesIcon /> <Text>Addresses</Text>
    </PageSelectorButton>
    <PageSelectorButton
      route={routes.settingsSessions}
      active={window.location.pathname.includes("password")}
    >
      <SessionsIcon /> <Text>Sessions</Text>
    </PageSelectorButton>
  </PageSelectorButtons>
);
