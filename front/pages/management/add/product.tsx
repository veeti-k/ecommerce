import { Button, Input, InputGroup, InputRightAddon, Switch, Textarea } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { NextPage } from "next";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { FlexDiv, InputLabelContainer } from "../../../components/Containers";
import { ManagementPageLayout } from "../../../components/layouts/ManagementPageLayout";
import { Heading } from "../../../components/Text";
import { request } from "../../../utils/requests";
import { apiRoutes } from "../../../utils/routes";

const AddProduct: NextPage = () => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [discountedPrice, setDiscountedPrice] = useState<string>(price);
  const [discountPercent, setDiscountPercent] = useState<string>("0");
  const [discountAmount, setDiscountAmount] = useState<string>("0");

  const [isDiscounted, setIsDiscounted] = useState<boolean>(false);

  const onPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);

    setDiscountedPrice("");
    setDiscountPercent("");
    setDiscountAmount("");
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      },
    });

    if (res) toast.success("Product added");
  };

  return (
    <ManagementPageLayout>
      <Heading style={{ paddingBottom: "1rem" }}>Add a product</Heading>

      <form onSubmit={onSubmit}>
        <FlexDiv column gap0>
          <FlexDiv>
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

          <InputLabelContainer id="description" label="Description" style={{ paddingTop: "1rem" }}>
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
            id="on-sale"
            label="Is the product on sale?"
            row
            style={{ paddingTop: "1rem" }}
          >
            <Switch
              id="on-sale"
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
