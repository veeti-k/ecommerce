import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { useEffect, useState } from "react";
import { InfoCard } from "../../../components/Card";
import { FlexDiv, MgmtSettingsPageScrollableContent } from "../../../components/Containers";
import { DeleteStoreDialog } from "../../../components/Dialogs/Store/DeleteStoreDialog";
import { EditStoreDialog } from "../../../components/Dialogs/Store/EditStoreDialog";
import { NewStoreDialog } from "../../../components/Dialogs/Store/NewStoreDialog";
import { ManagementPageLayout } from "../../../components/layouts/ManagementPageLayout";
import { TitleContainer } from "../../../components/layouts/Styles";
import { Heading, Text } from "../../../components/Text";
import { ResolvedCategory } from "../../../types/Category";
import { Store } from "../../../types/Store";
import { getCategories_STATIC_PROPS } from "../../../utils/getStaticProps";
import { GetStoresRequest } from "../../../utils/Requests/Store";

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

const Stores: NextPage<Result> = ({ categories }) => {
  const [stores, setStores] = useState<Store[]>([]);

  const getStores = async () => {
    const res = await GetStoresRequest();

    if (res) setStores(res.data);
  };

  useEffect(() => {
    getStores();
  }, []);

  return (
    <ManagementPageLayout categories={categories}>
      <TitleContainer>
        <Heading>Stores</Heading>

        <NewStoreDialog getStores={getStores} />
      </TitleContainer>

      <MgmtSettingsPageScrollableContent>
        <FlexDiv column gap05>
          {stores.map((store) => (
            <InfoCard key={store.id}>
              <FlexDiv spaceBetween>
                <FlexDiv column gap05>
                  <Text>{store.name}</Text>
                  <FlexDiv column gap0>
                    <Text>{store.streetAddress}</Text>
                    <Text>
                      {store.zip} {store.city}
                    </Text>
                  </FlexDiv>
                </FlexDiv>

                <FlexDiv column gap05>
                  <EditStoreDialog getStores={getStores} initialValues={store} />
                  <DeleteStoreDialog getStores={getStores} store={store} />
                </FlexDiv>
              </FlexDiv>
            </InfoCard>
          ))}
        </FlexDiv>
      </MgmtSettingsPageScrollableContent>
    </ManagementPageLayout>
  );
};

export default Stores;
