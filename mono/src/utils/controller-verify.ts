export const verifyUser = (user: any): any => {
  if (user.Count >= 1) {
    return { success: false, message: "User already exists"};
  } else {
    return { success: true, message: "Successful registration"};
  }
}

export const parseName = (nameFromRequest: any): string => {
  if (!isString(nameFromRequest)) {
    throw new Error("Incorrect or missing name");
  }
  return nameFromRequest;
};

export const parseEmail = (emailFromRequest: any): string => {
  if (!isEmail(emailFromRequest)) {
    console.log(emailFromRequest);

    throw new Error("enter valid email");
  }
  return emailFromRequest;
};

const isEmail = (string: string): boolean => {
  const patronEmail: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return patronEmail.test(string);
};

const isString = (string: string): boolean => {
  return typeof string === "string";
};
