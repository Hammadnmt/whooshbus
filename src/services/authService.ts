import { connectDB } from "@/lib/db";
import { IUser, User } from "@/models/User";

const authService = {
  findUser: async (email: string) => {
    await connectDB();
    console.log("in service");
    const user: IUser | null = await User.findOne({ email }).select(
      "-password -provider -createdAt -updatedAt -__v "
    );
    console.log("in service", user);
    return user;
  },
};
export default authService;
