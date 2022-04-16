import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, MouseEvent, useState } from "react";
import { Chevron, HamburgerIcon } from "../Icons";
import * as Collapsible from "@radix-ui/react-collapsible";
import { FlexDiv } from "../Containers";
import { styled } from "../../stitches.config";
import { AnimatePresence, motion } from "framer-motion";
import { Heading } from "../Text";
import { pushUser } from "../../utils/router";
import { ResolvedCategory } from "../../types/Category";

const CollapsibleTrigger = styled(Collapsible.Trigger, {
  transition: "$buttonHover",
  borderTopRightRadius: "0.2rem",
  borderBottomRightRadius: "0.2rem",
  padding: "0.8rem 1rem",

  borderLeft: "1px solid #eaeaea",

  "&:hover": {
    backgroundColor: "#ededed",
    border: "none",
    cursor: "pointer",
  },

  "&:focus": {
    outline: "none",
    backgroundColor: "#ededed",
    border: "none",
    cursor: "pointer",
  },
});

const MenuItem = styled(motion.a, {
  all: "unset",
  transition: "$buttonHover",
  borderRadius: "0.2rem",
  padding: "0.8rem 1rem",

  "&:hover": {
    backgroundColor: "#ededed",
    border: "none",
    cursor: "pointer",
  },

  "&:focus": {
    backgroundColor: "#ededed",
    border: "none",
    cursor: "pointer",
  },

  variants: {
    aside: {
      true: {
        borderTopLeftRadius: "0.2rem",
        borderBottomLeftRadius: "0.2rem",
        borderTopRightRadius: "0",
        borderBottomRightRadius: "0",
        width: "100%",
      },
    },
  },
});

const containerVariants = {
  initial: { opacity: 0, height: 0 },
  animate: {
    opacity: 1,
    height: "auto",
    transition: {
      staggerChildren: 0.007,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

type CategoryMenuProps = {
  categories: ResolvedCategory[];
};

export const CategoryMenu: FC<CategoryMenuProps> = ({ categories }) => {
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
                <Category key={category.id} category={category} indentation={1} />
              ))}
            </FlexDiv>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

interface CategoryProps {
  category: ResolvedCategory;
  indentation: number;
}

const Category = ({ category, indentation }: CategoryProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();

  const indentWith = indentation * 15;

  const onCategoryClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    pushUser(router, `/category/${category.id}`, "categoryMenu");
  };

  if (category?.children?.length) {
    return (
      <Collapsible.Root>
        <FlexDiv spaceBetween gap0>
          <Link href={`/category/${category.id}`} passHref>
            <MenuItem
              style={{ paddingLeft: indentWith }}
              onClick={onCategoryClick}
              aside
              variants={itemVariants}
            >
              {category.name}
            </MenuItem>
          </Link>
          <CollapsibleTrigger onClick={() => setOpen(!open)}>
            <Chevron open={open} />
          </CollapsibleTrigger>
        </FlexDiv>

        <Collapsible.Content forceMount>
          <AnimatePresence>
            {open && (
              <motion.div
                initial="initial"
                animate="animate"
                exit="initial"
                variants={containerVariants}
                style={{ display: "flex", flexDirection: "column" }}
              >
                {category.children.map((child) => (
                  <Category key={child.id} category={child} indentation={indentation + 1} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </Collapsible.Content>
      </Collapsible.Root>
    );
  }

  return (
    <Link href={`/category/${category.id}`} passHref>
      <MenuItem
        style={{ paddingLeft: indentWith }}
        onClick={onCategoryClick}
        variants={itemVariants}
      >
        {category.name}
      </MenuItem>
    </Link>
  );
};
