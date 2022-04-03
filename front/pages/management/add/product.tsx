import {
  Button,
  Input,
  InputGroup,
  InputRightAddon,
  InputRightElement,
  Switch,
  Textarea,
} from "@chakra-ui/react";
import { AnimatePresence, motion, usePresence } from "framer-motion";
import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { FlexDiv, InputLabelContainer } from "../../../components/Containers";
import { ManagementPageLayout } from "../../../components/layouts/ManagementPageLayout";
import { Heading } from "../../../components/Text";
import { ResolvedCategory } from "../../../types";
import { getCategories_STATIC_PROPS } from "../../../utils/getStaticProps";
import { request } from "../../../utils/requests";
import { apiRoutes } from "../../../utils/routes";

type Result = {
  categories: ResolvedCategory[];
};

export const getStaticProps: GetStaticProps = async (): Promise<GetStaticPropsResult<Result>> => {
  const categories = await getCategories_STATIC_PROPS();

  return {
    props: {
      categories,
    },
  };
};

const AddProduct: NextPage<Result> = ({ categories }) => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [discountedPrice, setDiscountedPrice] = useState<string>("0");
  const [discountPercent, setDiscountPercent] = useState<string>("0");
  const [discountAmount, setDiscountAmount] = useState<string>("0");

  const [bulletPoints, setBulletPoints] = useState<string[]>([""]);
  const [imageLinks, setImageLinks] = useState<string[]>([""]);

  const [isDiscounted, setIsDiscounted] = useState<boolean>(false);

  const onPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);

    setDiscountedPrice("0");
    setDiscountPercent("0");
    setDiscountAmount("0");
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const notifId = toast.loading("Adding the product");

    const res = await request({
      method: "POST",
      path: apiRoutes.productsRoot,
      body: {
        name,
        price,
        description,
        discountedPrice,
        discountPercent,
        discountAmount,
        isDiscounted,
        bulletPoints,
        imageLinks,
      },
    });

    toast.dismiss(notifId);

    if (res) toast.success("Product added");
  };

  return (
    <ManagementPageLayout categories={categories}>
      <Heading style={{ paddingBottom: "1rem" }}>Add a product</Heading>

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

          <InputLabelContainer id="description" label="Description" style={{ padding: "1rem 0" }}>
            <Textarea
              rows={10}
              id="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              autoComplete="off"
              required
            />
          </InputLabelContainer>

          <AnimatePresence>
            {bulletPoints.map((bulletPoint, index) => (
              <AnimatedListItem key={index}>
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
                          bulletPoints.map((bp, i) => (i === index ? e.target.value : bp))
                        )
                      }
                      value={bulletPoint}
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
            onClick={() => setBulletPoints([...bulletPoints, ""])}
            colorScheme="blue"
            variant="outline"
            size="sm"
          >
            {bulletPoints.length ? "Add another bullet point" : "Add a bullet point"}
          </Button>

          <AnimatePresence>
            {imageLinks.map((bulletPoint, index) => (
              <AnimatedListItem key={index}>
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
                          imageLinks.map((link, i) => (i === index ? e.target.value : link))
                        )
                      }
                      value={bulletPoint}
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
            onClick={() => setImageLinks([...imageLinks, ""])}
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
            Add
          </Button>
        </FlexDiv>
      </form>
    </ManagementPageLayout>
  );
};

const AnimatedListItem: FC = ({ children }) => {
  const [isPresent, safeToRemove] = usePresence();

  const props = {
    layout: true,
    initial: "initial",
    animate: isPresent ? "animate" : "initial",
    variants: variants,
    onAnimationComplete: () => !isPresent && safeToRemove(),
  };

  return (
    <motion.div {...props}>
      {children}
      <div style={{ paddingTop: "1rem" }}></div>
    </motion.div>
  );
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

type DiscountThingsProps = {
  price: number;
  discountedPrice: string | undefined;
  setDiscountedPrice: (discountedPrice: string) => void;
  discountPercentage: string | undefined;
  setDiscountPercentage: (discountPercentage: string) => void;
  discountAmount: string | undefined;
  setDiscountAmount: (discountAmount: string) => void;
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

export default AddProduct;
