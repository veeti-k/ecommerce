import {
  useDisclosure,
  Tooltip,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  Select,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { FC, useState, FormEvent } from "react";
import toast from "react-hot-toast";
import { Category } from "../../../types";
import { EditCategoryRequest } from "../../../utils/Requests/Category";
import { FlexDiv, InputLabelContainer } from "../../Containers";
import { EditIcon } from "../../Icons";

type Props = {
  category: Category;
  getCategories: () => void;
  categories: Category[];
};

export const EditCategoryModal: FC<Props> = ({ getCategories, categories, category }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [categoryName, setCategoryName] = useState<string>(category.name);
  const [categoryParentId, setCategoryParentId] = useState<number | null>(category.parentId);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const notifId = toast.loading("Saving your edits");

    const res = await EditCategoryRequest(category.id, {
      name: categoryName,
      parentId: categoryParentId,
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
