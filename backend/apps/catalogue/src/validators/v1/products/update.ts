import { UpdateProductRequestBody } from "shared";
import { validateString, validateNumber, validateBoolean, validateArray } from "../../helpers";
import { ValidationErrors, Validator } from "../../validator";

export const updateProductRequestBodyValidator: Validator<UpdateProductRequestBody> = (obj) => {
  const errors = {} as ValidationErrors<UpdateProductRequestBody>;

  const nameResult = validateString(obj, "name");
  if (nameResult) errors["name"] = { message: nameResult };

  const descriptionResult = validateString(obj, "description");
  if (descriptionResult) errors["description"] = { message: descriptionResult };

  const shortDescriptionResult = validateString(obj, "shortDescription");
  if (shortDescriptionResult) errors["shortDescription"] = { message: shortDescriptionResult };

  const priceResult = validateNumber(obj, "price");
  if (priceResult) errors["price"] = { message: priceResult };

  const discountedPriceResult = validateNumber(obj, "discountedPrice");
  if (discountedPriceResult) errors["discountedPrice"] = { message: discountedPriceResult };

  const discountPercentResult = validateNumber(obj, "discountPercent");
  if (discountPercentResult) errors["discountPercent"] = { message: discountPercentResult };

  const discountAmountResult = validateNumber(obj, "discountAmount");
  if (discountAmountResult) errors["discountAmount"] = { message: discountAmountResult };

  const isDiscountedResult = validateBoolean(obj, "isDiscounted");
  if (isDiscountedResult) errors["isDiscounted"] = { message: isDiscountedResult };

  const deepestCategoryIdResult = validateNumber(obj, "deepestCategoryId");
  if (deepestCategoryIdResult) errors["deepestCategoryId"] = { message: deepestCategoryIdResult };

  const bulletPointsResult = validateArray(obj, "bulletPoints");
  if (bulletPointsResult) errors["bulletPoints"] = { message: bulletPointsResult };
  else {
    const bulletPoints = obj.bulletPoints as any[];
    bulletPoints.forEach((bulletPoint, index) => {
      if (typeof bulletPoint !== "string")
        errors[`bulletPoints[${index}]`] = {
          message: `'bulletPoints' must be a string array, bulletPoints[${index}] is not a string`,
        };
    });
  }

  const imageLinksResult = validateArray(obj, "imageLinks");
  if (imageLinksResult) errors["imageLinks"] = { message: imageLinksResult };
  else {
    const imageLinks = obj.imageLinks as any[];
    imageLinks.forEach((imageLink, index) => {
      if (typeof imageLink !== "string")
        errors[`imageLinks[${index}]`] = {
          message: `'imageLinks' must be a string array, imageLinks[${index}] is not a string`,
        };
    });
  }

  if (Object.keys(errors).length > 0)
    return {
      isValid: false,
      errors,
    };

  return {
    isValid: true,
    validated: {
      name: obj.name,
      description: obj.description,
      shortDescription: obj.shortDescription,
      bulletPoints: obj.bulletPoints,
      imageLinks: obj.imageLinks,
      deepestCategoryId: obj.deepestCategoryId,
      discountAmount: obj.discountAmount,
      discountPercent: obj.discountPercent,
      discountedPrice: obj.discountedPrice,
      isDiscounted: obj.isDiscounted,
      price: obj.price,
    } as UpdateProductRequestBody,
  };
};
