import * as React from "react";

const getRandomId = () => Math.random().toString(36).substring(2, 15);

export const useRandomId = (staticId?: string) => {
  const [id, setId] = React.useState(staticId);

  React.useEffect(() => {
    setId(getRandomId());
  }, [staticId]);

  return staticId || id;
};
