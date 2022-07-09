import { FlexDiv } from "@ecommerce/ui";

import { Categories } from "./Categories/Categories";
import { MenubarContent, MenubarInner, MenubarOuter } from "./Menubar.styles";
import { ProfileButton } from "./ProfileButton";
import { SearchBar } from "./SearchBar";

export const Menubar = () => (
  <MenubarOuter>
    <MenubarInner>
      <MenubarContent>
        <FlexDiv justifyBetween fullWidth gap05>
          <Categories />
          <SearchBar />
          <ProfileButton />
        </FlexDiv>
      </MenubarContent>
    </MenubarInner>
  </MenubarOuter>
);
