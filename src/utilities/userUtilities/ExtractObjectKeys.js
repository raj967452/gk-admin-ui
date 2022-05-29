const ExtractObjectKeys = (userObject) => {
  let objectKeys = [];

  Object.keys(userObject).forEach((objectKey) => {
    const value = userObject[objectKey];
    if (objectKey !== "id") {
      if (typeof value !== "object") {
        objectKeys.push(objectKey);
      } else {
        objectKeys = [...objectKeys, ...ExtractObjectKeys(value)];
      }
    }
  });

  return objectKeys;
};

export default ExtractObjectKeys;
