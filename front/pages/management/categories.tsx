import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { NextPage } from "next";
import { FC, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Card } from "../../components/Card";
import { FlexDiv, InputLabelContainer } from "../../components/Containers";
import { Chevron, PlusIcon } from "../../components/Icons";
import { ManagementPageLayout } from "../../components/layouts/ManagementPageLayout";
import { TitleContainer } from "../../components/pages/Settings";
import { Heading } from "../../components/Text";
import { styled } from "../../stitches.config";
import { Category, ResolvedCategory } from "../../types";
import { request } from "../../utils/requests";
import { apiRoutes } from "../../utils/routes";
import { motion } from "framer-motion";

const CategoryCard = styled(Card, {
  padding: "1rem",
  boxShadow: "rgba(99, 99, 99, 0.1) 0px 2px 8px 0px",
});

const Categories: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [resolvedCategories, setResolvedCategories] = useState<ResolvedCategory[]>([]);

  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryParentId, setCategoryParentId] = useState<number | null>(null);

  const getCategories = async () => {
    const notifId = toast.loading("Getting categories...");

    const res = await request({
      method: "GET",
      path: apiRoutes.categoriesRoot,
    });

    toast.dismiss(notifId);

    console.log(res?.data);

    if (res) {
      setAllCategories((res.data as any)["allCategories"]);
      setResolvedCategories((res.data as any)["resolvedCategories"]);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const notifId = toast.loading("Creating the category...");

    const res = await request({
      method: "POST",
      path: apiRoutes.categoriesRoot,
      body: {
        name: categoryName,
        parentId: categoryParentId,
      },
    });

    toast.dismiss(notifId);

    if (res) {
      getCategories();
      toast.success("Category created");
      onClose();
    }
  };

  return (
    <ManagementPageLayout>
      <TitleContainer>
        <Heading>Categories</Heading>

        <Button onClick={onOpen}>
          <FlexDiv align>
            <PlusIcon /> Add a category
          </FlexDiv>
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add a category</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={onSubmit}>
                <FlexDiv column fullWidth>
                  <InputLabelContainer id="category-name" label="Category name">
                    <Input
                      id="category-name"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      autoComplete="off"
                      required
                    />
                  </InputLabelContainer>

                  <InputLabelContainer id="category-parent" label="Parent">
                    <Select
                      id="category-parent"
                      value={categoryParentId?.toString()}
                      onChange={(e) => setCategoryParentId(parseInt(e.target.value))}
                      required
                    >
                      <option value="">None</option>
                      {allCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </Select>
                  </InputLabelContainer>
                </FlexDiv>
              </form>
            </ModalBody>

            <ModalFooter>
              <FlexDiv gap05>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit" onClick={onSubmit} colorScheme="blue">
                  Add
                </Button>
              </FlexDiv>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </TitleContainer>

      <FlexDiv column>
        {resolvedCategories.map((category) => (
          <CollapsibleCategory category={category} />
        ))}
      </FlexDiv>
    </ManagementPageLayout>
  );
};

type CollapsibleProps = {
  open: boolean;
};

const Collapsible: FC<CollapsibleProps> = ({ children, open }) => {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: { opacity: 1, height: "auto" },
            collapsed: { opacity: 0, height: 0 },
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

type CollapsibleCategoryProps = {
  category: ResolvedCategory;
};

const CollapsibleCategory: FC<CollapsibleCategoryProps> = ({ category }) => {
  const [open, setOpen] = useState(false);
  console.log(category);

  return (
    <CategoryCard key={category.id} onClick={() => setOpen(!open)}>
      <FlexDiv spaceBetween fullWidth style={{ paddingBottom: "1rem" }}>
        <Heading>{category.name}</Heading>
        <Chevron open={open} />
      </FlexDiv>
      <Collapsible open={open}>
        <FlexDiv fullWidth>
          {category.children?.length &&
            category.children.map((child) => (
              <CollapsibleCategory key={child.id} category={child} />
            ))}
        </FlexDiv>
      </Collapsible>
    </CategoryCard>
  );
};

export default Categories;
