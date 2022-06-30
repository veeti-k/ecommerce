import * as Collapsible from "@radix-ui/react-collapsible";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

import { ArrayElement } from "@ecommerce/shared";
import { Button, ChevronIcon, FlexDiv, MenuIcon, Popover } from "@ecommerce/ui";

import { inferQueryOutput } from "~utils/trpc";

import {
  CategoryNavigator,
  StyledCategory,
  containerVariants,
  itemVariants,
} from "./Categories.styles";

export const Categories = () => {
  const categories = [
    {
      name: "Test",
      id: 1,
      children: [
        {
          name: "Test",
          id: 2,
          parentId: 1,
          children: [],
        },
      ],
    },
    {
      name: "Test",
      id: 3,
      children: [
        {
          name: "Test",
          id: 4,
          parentId: 3,
          children: [],
        },
      ],
    },
  ];

  return (
    <Popover
      trigger={
        <Button icon>
          <MenuIcon />
        </Button>
      }
    >
      <FlexDiv column gap0>
        {categories.map((category) => (
          <Category key={category.id} category={category} indentation={1} />
        ))}
      </FlexDiv>
    </Popover>
  );
};

type Props = {
  category: ArrayElement<inferQueryOutput<"categories.get-all">>;
  indentation: number;
};

export const Category = ({ category, indentation }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const indentWith = indentation * 15;

  if (category?.children?.length) {
    return (
      <Collapsible.Root>
        <FlexDiv justifyBetween gap0>
          <Link href="/" passHref>
            <StyledCategory
              style={{ paddingLeft: indentWith }}
              aside
              variants={itemVariants}
            >
              {category.name}
            </StyledCategory>
          </Link>

          <CategoryNavigator onClick={() => setOpen(!open)}>
            <ChevronIcon open={open} />
          </CategoryNavigator>
        </FlexDiv>

        <Collapsible.Content forceMount>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial="initial"
                animate="animate"
                exit="initial"
                variants={containerVariants}
                style={{ display: "flex", flexDirection: "column" }}
              >
                {category.children.map((child, i) => (
                  <Category
                    key={child.id}
                    category={child}
                    indentation={indentation + 1}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </Collapsible.Content>
      </Collapsible.Root>
    );
  }

  return (
    <Link href="/" passHref>
      <StyledCategory
        style={{ paddingLeft: indentWith }}
        variants={itemVariants}
      >
        {category.name}
      </StyledCategory>
    </Link>
  );
};
