import {
  Input,
  InputGroup,
  InputRightAddon,
  Textarea,
  InputRightElement,
  Button,
  Switch,
  Select,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Category } from "../../types/Category";
import {
  bulletPoint,
  imageLink,
  ProductPageProduct,
  bulletPointDefaultValue,
  imageLinkDefaultValue,
} from "../../types/Product";
import { AnimatedListItem } from "../Animate";

import { FlexDiv, InputLabelContainer } from "../Containers";

export type ProductFormValues = {
  name: string;
  price: string;
  description: string;
  shortDescription: string;

  isDiscounted: boolean;
  discountedPrice: string;
  discountPercent: string;
  discountAmount: string;

  bulletPoints: bulletPoint[];
  imageLinks: imageLink[];

  deepestCategoryId: number;
};

export type ProductFormProps = {
  categories: Category[];
  onSubmit: (values: ProductFormValues) => void;
  initialValues?: ProductPageProduct;
  submitButtonText: string;
};

export const ProductForm: FC<ProductFormProps> = ({
  onSubmit: outerSubmit,
  categories,
  initialValues,
  submitButtonText,
}) => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [shortDescription, setShortDescription] = useState<string>("");

  const [categoryId, setCategoryId] = useState<string | null>(null);

  const [discountedPrice, setDiscountedPrice] = useState<string>("");
  const [discountPercent, setDiscountPercent] = useState<string>("");
  const [discountAmount, setDiscountAmount] = useState<string>("");

  const [bulletPoints, setBulletPoints] = useState<bulletPoint[]>([{ id: null, text: "" }]);
  const [imageLinks, setImageLinks] = useState<imageLink[]>([{ id: null, link: "" }]);

  const [isDiscounted, setIsDiscounted] = useState<boolean>(false);

  const onPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);

    setDiscountedPrice("0");
    setDiscountPercent("0");
    setDiscountAmount("0");
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !name ||
      !price ||
      !description ||
      !categoryId ||
      !imageLinks.length ||
      !bulletPoints.length
    )
      return toast.error("Please fill out all the fields");

    outerSubmit({
      name,
      price,
      description,
      shortDescription,

      isDiscounted,
      discountedPrice,
      discountPercent,
      discountAmount,

      bulletPoints,
      imageLinks,

      deepestCategoryId: Number(categoryId),
    });
  };

  useEffect(() => {
    setName(initialValues?.name ?? "");
    setPrice(initialValues?.price?.toString() ?? "");
    setDescription(initialValues?.description ?? "");
    setShortDescription(initialValues?.shortDescription ?? "");

    setCategoryId(initialValues?.path[initialValues?.path.length - 1]?.id?.toString() ?? null);

    setDiscountedPrice(initialValues?.discountedPrice?.toString() ?? "");
    setDiscountPercent(initialValues?.discountPercent?.toString() ?? "");
    setDiscountAmount(initialValues?.discountAmount?.toString() ?? "");

    setBulletPoints(initialValues?.bulletPoints ?? [bulletPointDefaultValue]);
    setImageLinks(initialValues?.images ?? [imageLinkDefaultValue]);

    setIsDiscounted(initialValues?.isDiscounted ?? false);
  }, [initialValues]);

  return (
    <form onSubmit={onSubmit}>
      <FlexDiv column gap0>
        <FlexDiv fullWidth>
          <InputLabelContainer label="Name" id="name">
            <Input
              id="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              autoComplete="off"
              required
            />
          </InputLabelContainer>
          <InputLabelContainer label="Price" id="price">
            <InputGroup>
              <Input
                id="price"
                type="number"
                onChange={onPriceChange}
                value={price}
                autoComplete="off"
                required
              />
              <InputRightAddon>€</InputRightAddon>
            </InputGroup>
          </InputLabelContainer>
        </FlexDiv>

        <InputLabelContainer label="Category" id="category" style={{ paddingTop: "1rem" }}>
          <Select
            id="category"
            onChange={(e) => setCategoryId(e.target.value)}
            value={categoryId ?? ""}
            required
          >
            <option value="">None</option>
            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
                selected={categoryId?.toString() === category.id.toString()}
              >
                {category.name}
              </option>
            ))}
          </Select>
        </InputLabelContainer>

        <InputLabelContainer id="description" label="Description">
          <Textarea
            rows={10}
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            autoComplete="off"
            required
          />
        </InputLabelContainer>

        <InputLabelContainer
          id="short-description"
          label="Short description"
          style={{ padding: "1rem 0" }}
        >
          <Textarea
            rows={5}
            id="short-description"
            onChange={(e) => setShortDescription(e.target.value)}
            value={shortDescription}
            autoComplete="off"
            required
          />
        </InputLabelContainer>

        <AnimatePresence>
          {bulletPoints.map((bulletPoint, index) => (
            <AnimatedListItem paddingBottom="1rem" key={index}>
              <InputLabelContainer
                key={index}
                id={`bulletpoint-${index + 1}`}
                label={`Bullet point ${index + 1}`}
              >
                <InputGroup>
                  <Input
                    id={`bulletpoint-${index + 1}`}
                    type="text"
                    onChange={(e) =>
                      setBulletPoints(
                        bulletPoints.map((bulletPoint, i) =>
                          i === index ? { id: bulletPoint.id, text: e.target.value } : bulletPoint
                        )
                      )
                    }
                    value={bulletPoint.text}
                    autoComplete="off"
                  />
                  <InputRightElement width="6rem">
                    <Button
                      size="sm"
                      height="1.75rem"
                      colorScheme="red"
                      onClick={() => {
                        setBulletPoints(bulletPoints.filter((_, i) => i !== index));
                      }}
                    >
                      Remove
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </InputLabelContainer>
            </AnimatedListItem>
          ))}
        </AnimatePresence>

        <Button
          style={{ marginBottom: "1rem" }}
          onClick={() => setBulletPoints([...bulletPoints, bulletPointDefaultValue])}
          colorScheme="blue"
          variant="outline"
          size="sm"
        >
          {bulletPoints.length ? "Add another bullet point" : "Add a bullet point"}
        </Button>

        <AnimatePresence initial={false}>
          {imageLinks.map((imagelink, index) => (
            <AnimatedListItem paddingBottom="1rem" key={index}>
              <InputLabelContainer
                key={index}
                id={`image-link-${index + 1}`}
                label={`Image link ${index + 1}`}
              >
                <InputGroup>
                  <Input
                    id={`image-link-${index + 1}`}
                    type="text"
                    onChange={(e) =>
                      setImageLinks(
                        imageLinks.map((imageLink, i) =>
                          i === index ? { id: imageLink.id, link: e.target.value } : imageLink
                        )
                      )
                    }
                    value={imagelink.link}
                    autoComplete="off"
                  />
                  <InputRightElement width="6rem">
                    <Button
                      size="sm"
                      height="1.75rem"
                      colorScheme="red"
                      onClick={() => {
                        setImageLinks(imageLinks.filter((_, i) => i !== index));
                      }}
                    >
                      Remove
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </InputLabelContainer>
            </AnimatedListItem>
          ))}
        </AnimatePresence>

        <Button
          onClick={() => setImageLinks([...imageLinks, imageLinkDefaultValue])}
          colorScheme="blue"
          variant="outline"
          size="sm"
        >
          {imageLinks.length ? "Add another image link" : "Add an image link"}
        </Button>

        <InputLabelContainer
          id="is-on-sale"
          label="Is the product on sale?"
          row
          style={{ paddingTop: "1rem" }}
        >
          <Switch
            id="is-on-sale"
            onChange={(e) => setIsDiscounted(!isDiscounted)}
            isChecked={isDiscounted}
          />
        </InputLabelContainer>

        <AnimatePresence initial={false}>
          {isDiscounted && (
            <DiscountThings
              price={Number(price)}
              discountedPrice={discountedPrice}
              discountPercentage={discountPercent}
              discountAmount={discountAmount}
              setDiscountedPrice={setDiscountedPrice}
              setDiscountPercentage={setDiscountPercent}
              setDiscountAmount={setDiscountAmount}
            />
          )}
        </AnimatePresence>

        <Button colorScheme="blue" type="submit" style={{ marginTop: "1rem" }}>
          {submitButtonText}
        </Button>
      </FlexDiv>
    </form>
  );
};

type DiscountThingsProps = {
  price: number;
  discountedPrice: string | undefined;
  setDiscountedPrice: (discountedPrice: string) => void;
  discountPercentage: string | undefined;
  setDiscountPercentage: (discountPercentage: string) => void;
  discountAmount: string | undefined;
  setDiscountAmount: (discountAmount: string) => void;
};

const variants = {
  initial: { opacity: 0, height: 0 },
  animate: {
    opacity: 1,
    height: "auto",
    transition: {
      staggerChildren: 0.007,
    },
  },
};

const DiscountThings: FC<DiscountThingsProps> = ({
  price,
  discountAmount,
  discountPercentage,
  discountedPrice,
  setDiscountAmount,
  setDiscountPercentage,
  setDiscountedPrice,
}) => {
  const onDiscountedPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDiscountedPrice(e.target.value);

    const discountPercentage = (100 * (price - Number(e.target.value))) / price;

    setDiscountPercentage(discountPercentage.toFixed(2));
    setDiscountAmount((price - Number(e.target.value)).toFixed(2));
  };

  const onDiscountPercentageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDiscountPercentage(e.target.value);

    const discountedPrice = price - (price * Number(e.target.value)) / 100;

    setDiscountedPrice(discountedPrice.toFixed(2));
    setDiscountAmount((price - discountedPrice).toFixed(2));
  };

  const onDiscountAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDiscountAmount(e.target.value);

    const discountedPrice = price - Number(e.target.value);

    setDiscountedPrice(discountedPrice.toFixed(2));
    setDiscountPercentage(((100 * (price - discountedPrice)) / price).toFixed(2));
  };

  return (
    <motion.div initial="initial" animate="animate" exit="initial" variants={variants}>
      <FlexDiv column style={{ paddingTop: "1rem" }}>
        <InputLabelContainer key="1" id="discounted-price" label="Discounted price">
          <InputGroup>
            <Input
              id="discounted-price"
              type="number"
              onChange={onDiscountedPriceChange}
              value={discountedPrice}
              autoComplete="off"
            />
            <InputRightAddon>€</InputRightAddon>
          </InputGroup>
        </InputLabelContainer>

        <InputLabelContainer key="2" id="discount-amount" label="Discount amount">
          <InputGroup>
            <Input
              id="discount-amount"
              type="number"
              onChange={onDiscountAmountChange}
              value={discountAmount}
              autoComplete="off"
            />
            <InputRightAddon>€</InputRightAddon>
          </InputGroup>
        </InputLabelContainer>

        <InputLabelContainer key="3" id="discount-percentage" label="Discount percentage">
          <InputGroup>
            <Input
              id="discount-percentage"
              type="number"
              onChange={onDiscountPercentageChange}
              value={discountPercentage}
              autoComplete="off"
            />
            <InputRightAddon>%</InputRightAddon>
          </InputGroup>
        </InputLabelContainer>
      </FlexDiv>
    </motion.div>
  );
};
