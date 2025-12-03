// TODO:
// Delete this component when connected to Django
import userData from "../Database/user.json";

export const MockLogin = (email: string, password: string) => {
  const user = userData.find((u) => u.email == email && u.password == password);
  if (!user) {
    return { success: false, message: "email or password is not correct" };
  }
  return { success: true, user };
};
