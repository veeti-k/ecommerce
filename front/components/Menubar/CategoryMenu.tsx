import { Button, Drawer, DrawerCloseButton, DrawerContent, DrawerOverlay } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEvent, useState } from "react";
import { Chevron, HamburgerIcon } from "../Icons";
import * as Collapsible from "@radix-ui/react-collapsible";
import { FlexDiv } from "../Containers";
import { styled } from "../../stitches.config";
import { AnimatePresence, motion } from "framer-motion";
import { Heading } from "../Text";
import { pushUser } from "../../utils/router";

interface Category {
  id: string;
  name: string;
  parent: string | null;
  children: Category[];
}

interface Props {
  category: Category;
  indentation: number;
}

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

const Category = ({ category, indentation }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();

  const indentWith = indentation * 15;

  const onCategoryClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    pushUser(router, `/category/${category.id}`, "categoryMenu");
  };

  if (category.children.length) {
    return (
      <Collapsible.Root>
        <FlexDiv spaceBetween gap0>
          <Link href={category.id} passHref>
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
    <MenuItem style={{ paddingLeft: indentWith }} onClick={onCategoryClick} variants={itemVariants}>
      {category.name}
    </MenuItem>
  );
};

export const CategoryMenu = () => {
  const categories = [
    {
      id: "111",
      name: "test",
      parent: null,
      children: [
        {
          id: "112",
          name: "test2",
          parent: "test",
          children: [],
        },
        {
          id: "113",
          name: "test2",
          parent: "test",
          children: [],
        },
        {
          id: "114",
          name: "test2",
          parent: "test",
          children: [],
        },
      ],
    },
    {
      id: "121",
      name: "test3",
      parent: null,
      children: [
        {
          id: "122",
          name: "test4",
          parent: "test3",
          children: [
            {
              id: "123",
              name: "test5",
              parent: "test4",
              children: [
                {
                  id: "124",
                  name: "test6",
                  parent: "test5",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: "123",
          name: "test4",
          parent: "test3",
          children: [],
        },
      ],
    },
  ];
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <HamburgerIcon />
      </Button>
      <Drawer isOpen={open} onClose={() => setOpen(false)} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <FlexDiv gap0 column>
            <FlexDiv
              align
              spaceBetween
              style={{ padding: "1rem", borderBottom: "1px solid #ededed" }}
            >
              <Heading>Categories</Heading>
              <DrawerCloseButton style={{ position: "relative", top: 0, right: 0 }} />
            </FlexDiv>
            {categories.map((category) => (
              <Category key={Math.random()} category={category} indentation={1} />
            ))}
          </FlexDiv>
        </DrawerContent>
      </Drawer>
    </>
  );
};