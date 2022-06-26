import * as Collapsible from "@radix-ui/react-collapsible";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

import { Button, ChevronIcon, FlexDiv, MenuIcon, Popover } from "@ecommerce/ui";

import {
  CollapsibleMenuItem,
  CollapsibleMenuItemTrigger,
  containerVariants,
  itemVariants,
} from "./Categories.styles";

export const Categories = () => {
  const categories = [
    {
      name: "Test",
      categoryId: 1,
      parentId: null,
      children: [
        {
          name: "Test",
          categoryId: 2,
          parentId: 1,
        },
      ],
    },
    {
      name: "Test",
      categoryId: 3,
      parentId: null,
      children: [
        {
          name: "Test",
          categoryId: 4,
          parentId: 3,
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
          <Category category={category} indentation={1} />
        ))}
      </FlexDiv>
    </Popover>
  );
};

type Props = {
  category: any;
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
            <CollapsibleMenuItem
              style={{ paddingLeft: indentWith }}
              aside
              variants={itemVariants}
            >
              {category.name}
            </CollapsibleMenuItem>
          </Link>
          <CollapsibleMenuItemTrigger onClick={() => setOpen(!open)}>
            <ChevronIcon open={open} />
          </CollapsibleMenuItemTrigger>
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
                {category.children.map((child: any, i: number) => (
                  <Category
                    key={i}
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
      <CollapsibleMenuItem
        style={{ paddingLeft: indentWith }}
        variants={itemVariants}
      >
        {category.name}
      </CollapsibleMenuItem>
    </Link>
  );
};
