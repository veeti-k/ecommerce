import { Flags } from "@ecommerce/shared";

import { Page } from "../../../../types/Page";

const AddProductPage: Page = () => {};

AddProductPage.requireAuth = true;
AddProductPage.requiredFlags = [Flags.ManageProducts];

export default AddProductPage;
