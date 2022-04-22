import * as Collapsible from "@radix-ui/react-collapsible";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { FC, useState } from "react";
import { ResolvedCategory } from "../../types/Category";
import { routes } from "../../utils/routes";
import { FlexDiv } from "../Containers";
import { Chevron } from "../Icons";
import { CollapsibleTrigger, containerVariants, itemVariants, MenuItem } from "./Styles";

type Props = {
  category: ResolvedCategory;
  indentation: number;
};

export const Category: FC<Props> = ({ category, indentation }) => {
  const [open, setOpen] = useState<boolean>(false);

  const indentWith = indentation * 15;

  if (category?.children?.length) {
    return (
      <Collapsible.Root>
        <FlexDiv spaceBetween gap0>
          <Link href={routes.categories(category.id)} passHref>
            <MenuItem style={{ paddingLeft: indentWith }} aside variants={itemVariants}>
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
    <Link href={routes.categories(category.id)} passHref>
      <MenuItem style={{ paddingLeft: indentWith }} variants={itemVariants}>
        {category.name}
      </MenuItem>
    </Link>
  );
};
