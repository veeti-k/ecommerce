import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  Select,
  ModalFooter,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { FC, useState, FormEvent } from "react";
import toast from "react-hot-toast";
import { Category } from "../../../types";
import { AddCategoryRequest } from "../../../utils/Requests/Category";
import { FlexDiv, InputLabelContainer } from "../../Containers";
import { PlusIcon } from "../../Icons";

type Props = {
  getCategories: () => void;
  categories: Category[];
};

export const AddCategoryDialog: FC<Props> = ({ getCategories, categories }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryParentId, setCategoryParentId] = useState<number | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const notifId = toast.loading("Creating the category...");

    const res = await AddCategoryRequest({ name: categoryName, parentId: categoryParentId });

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
      <Tooltip label="Add a category">
        <IconButton aria-label="Add a category" size="sm" colorScheme="blue" onClick={onOpen}>
          <PlusIcon />
        </IconButton>
      </Tooltip>

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
