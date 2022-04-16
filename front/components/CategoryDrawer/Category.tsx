import * as Collapsible from "@radix-ui/react-collapsible";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, MouseEvent, useState } from "react";
import { ResolvedCategory } from "../../types/Category";
import { pushUser } from "../../utils/router";
import { FlexDiv } from "../Containers";
import { Chevron } from "../Icons";
import { CollapsibleTrigger, containerVariants, itemVariants, MenuItem } from "./Styles";

type Props = {
  category: ResolvedCategory;
  indentation: number;
};

export const Category: FC<Props> = ({ category, indentation }) => {
  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();

  const indentWith = indentation * 15;

  const onCategoryClick = (e: MouseEvent) => {
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
