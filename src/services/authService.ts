import { IUser, User } from "@/models/User";
import { validPassword } from "@/utils/bcryptUtils";
import { LoginInput, OauthInput, RegisterInput } from "@/validators/auth.schema";

// Main Service
const authService = {
  async loginUser({ email, password }: LoginInput) {
    const userExist = await this.findUser(email);
    if (!userExist) return null;
    const isPasswordValid = await validPassword(password, userExist.password);
    if (!isPasswordValid) return null;
    return userExist;
  },
  async findUser(email: string) {
    const user: IUser | null = await User.findOne({ email }).select("-provider -createdAt -updatedAt -__v");
    return user;
  },

  async registerUser({ firstname, lastname, email, password, phone }: RegisterInput): Promise<IUser | null> {
    const existingUser = await this.findUser(email);
    if (existingUser) return null;

    const user: IUser | null = await User.create({
      firstName: firstname,
      lastName: lastname,
      email,
      password,
      phone,
    });
    return user;
  },
  async registerOAuthUser({
    firstname,
    lastname,
    email,
    provider,
    providerId,
    profilePicture,
  }: OauthInput): Promise<IUser | null> {
    const user: IUser = await User.create({
      firstName: firstname,
      lastName: lastname,
      email,
      provider,
      providerId,
      profilePicture,
    });

    return user;
  },
};

export default authService;
