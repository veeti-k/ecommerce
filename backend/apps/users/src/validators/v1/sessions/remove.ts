import { Validator, RemoveSessionsRequestBody, ValidationErrors, validateArray } from "shared";

export const removeSessionsRequestBodyValidator: Validator<RemoveSessionsRequestBody> = (obj) => {
  const errors: ValidationErrors<RemoveSessionsRequestBody> = {};

  const sessionIdsResult = validateArray(obj.sessionIds, "sessionIds");
  if (sessionIdsResult) errors["sessionIds"] = { message: sessionIdsResult };
  else {
    const sessionIds = obj.sessionIds as any[];
    sessionIds.forEach((sessionId, index) => {
      if (typeof sessionId !== "string")
        errors[`sessionIds[${index}]`] = {
          message: `'sessionIds' must be a string array, sessionIds[${index}] is not a string`,
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
      sessionIds: obj.sessionIds,
    },
  };
};
