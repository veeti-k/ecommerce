import {
  Tooltip,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { ResolvedCategory } from "../../types/Category";
import { FlexDiv } from "../Containers";
import { HamburgerIcon } from "../Icons";
import { Heading } from "../Text";
import { Category } from "./Category";

type Props = {
  categories: ResolvedCategory[];
};

export const CategoryDrawer: FC<Props> = ({ categories }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Tooltip label="Categories">
        <IconButton aria-label="Category menu" onClick={() => setOpen(true)}>
          <HamburgerIcon />
        </IconButton>
      </Tooltip>

      <Drawer isOpen={open} onClose={() => setOpen(false)} placement="left">
        <DrawerOverlay />

        <DrawerContent>
          <FlexDiv
            align
            spaceBetween
            style={{ padding: "1rem", borderBottom: "1px solid #ededed" }}
          >
            <Heading>Categories</Heading>
            <DrawerCloseButton style={{ position: "relative", top: 0, right: 0 }} />
          </FlexDiv>

          <DrawerBody style={{ padding: 0 }}>
            <FlexDiv gap0 column>
              {categories.map((category, i) => (
                <Category key={category.categoryId} category={category} indentation={1} />
              ))}
            </FlexDiv>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
