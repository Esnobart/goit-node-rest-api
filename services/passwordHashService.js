import bcrypt from "bcrypt";

export const createPasswordHash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  return passwordHash;
};

export const checkPasswordHash = async (candidate, passwordHash) => {
  const passIsValid = bcrypt.compare(candidate, passwordHash);

  return passIsValid;
};