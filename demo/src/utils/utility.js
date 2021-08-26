export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const removeFields = (obj, ...disallowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (!disallowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
