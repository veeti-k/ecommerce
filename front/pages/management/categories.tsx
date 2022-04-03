import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { FC, FormEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Card } from "../../components/Card";
import { FlexDiv, InputLabelContainer } from "../../components/Containers";
import { EditIcon, PlusIcon, TrashIcon } from "../../components/Icons";
import { ManagementPageLayout } from "../../components/layouts/ManagementPageLayout";
import { TitleContainer } from "../../components/pages/Settings";
import { Heading, Paragraph } from "../../components/Text";
import { styled } from "../../stitches.config";
import { Category } from "../../types";
import { request } from "../../utils/requests";
import { apiRoutes } from "../../utils/routes";

const CategoryCard = styled(Card, {
  padding: "1rem",
  boxShadow: "rgba(99, 99, 99, 0.1) 0px 2px 8px 0px",
});

const Categories: NextPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = async () => {
    const notifId = toast.loading("Getting categories...");

    const res = await request({
      method: "GET",
      path: apiRoutes.categoriesRoot,
    });

    toast.dismiss(notifId);

    if (res) setCategories((res.data as any)["allCategories"]);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <ManagementPageLayout>
      <TitleContainer>
        <Heading>Categories</Heading>

        <AddCategoryModal categories={categories} getCategories={getCategories} />
      </TitleContainer>

      <FlexDiv column gap05>
        {categories.map((category) => (
          <CategoryCard key={category.id}>
            <FlexDiv spaceBetween fullWidth>
              <Heading>{category.name}</Heading>
              <FlexDiv gap05>
                <DeleteCategoryModal category={category} getCategories={getCategories} />

                <EditCategoryModal
                  categories={categories}
                  category={category}
                  getCategories={getCategories}
                />
              </FlexDiv>
            </FlexDiv>
          </CategoryCard>
        ))}
      </FlexDiv>
    </ManagementPageLayout>
  );
};

type CategoryModalProps = {
  getCategories: () => void;
  categories: Category[];
};

const AddCategoryModal: FC<CategoryModalProps> = ({ getCategories, categories }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryParentId, setCategoryParentId] = useState<number | null>(null);

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
      setCategoryName("");
      setCategoryParentId(null);
      onClose();
    }
  };

  return (
    <>
      <Button onClick={onOpen}>
        <FlexDiv align gap05>
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
                    defaultValue=""
                  >
                    <option value="">None</option>
                    {categories.map((category) => (
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
    </>
  );
};

type EditCategoryModalProps = {
  category: Category;
} & CategoryModalProps;

const EditCategoryModal: FC<EditCategoryModalProps> = ({ getCategories, categories, category }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [categoryName, setCategoryName] = useState<string>(category.name);
  const [categoryParentId, setCategoryParentId] = useState<number | null>(category.parentId);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const notifId = toast.loading("Saving your edits...");

    const res = await request({
      method: "PATCH",
      path: apiRoutes.categories.category(category.id.toString()),
      body: {
        name: categoryName,
        parentId: categoryParentId,
      },
    });

    toast.dismiss(notifId);

    if (res) {
      getCategories();
      toast.success("Category edited");
      onClose();
    }
  };

  return (
    <>
      <Tooltip label="Edit category">
        <IconButton
          aria-label="Edit category"
          icon={<EditIcon />}
          colorScheme="blue"
          onClick={onOpen}
        />
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit a category</ModalHeader>
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
                    {categories.map((optionCategory) => (
                      <option
                        key={optionCategory.id}
                        value={optionCategory.id}
                        disabled={optionCategory.id == category.id}
                      >
                        {optionCategory.name}
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
                Edit
              </Button>
            </FlexDiv>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

type DeleteCategoryModalProps = {
  category: Category;
  getCategories: () => void;
};

const DeleteCategoryModal = ({ category, getCategories }: DeleteCategoryModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const notifId = toast.loading("Deleting the category...");

    const res = await request({
      method: "DELETE",
      path: apiRoutes.categories.category(category.id.toString()),
    });

    toast.dismiss(notifId);

    if (res) {
      getCategories();
      toast.success("Category deleted");
      onClose();
    }
  };

  return (
    <>
      <Tooltip label="Delete category">
        <IconButton
          aria-label="Delete category"
          icon={<TrashIcon />}
          colorScheme="red"
          onClick={onOpen}
        />
      </Tooltip>

      <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef}>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Delete a category</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <Paragraph>
              Are you sure you want to delete the category <strong>{category.name}</strong>?
            </Paragraph>
          </AlertDialogBody>

          <AlertDialogFooter>
            <FlexDiv gap05>
              <Button onClick={onClose} ref={cancelRef}>
                Cancel
              </Button>
              <Button type="submit" onClick={onSubmit} colorScheme="red">
                Delete
              </Button>
            </FlexDiv>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Categories;
