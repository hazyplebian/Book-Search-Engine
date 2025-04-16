import User from "../models/User.js";
import { signToken } from "../services/auth.js";

interface AddUserArgs {
    input: {
        username: string;
        email: string;
        password: string;
    };
}

interface LoginArgs {
    username: string;
    password: string;
}

interface SaveBookArgs {
    bookId: string;
    authors: string[];
    description: string;
    title: string;
    image?: string;
    link?: string;
}

interface DeleteBookArgs {
    bookId: string;
}

interface Context {
    user: {
        _id: string;
    };
}

const resolvers = {
    Query: {
        me: async (_parent: unknown, _args: unknown, context: Context) => {
            if (context.user) {
                return User.findById(context.user._id).populate("savedBooks");
            }
            throw new Error("Not authenticated");
        },
    },
    Mutation: {
        addUser: async (_parent: unknown, { input }: AddUserArgs) => {
            const user = await User.create(input);
            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },
        login: async (_parent: unknown, { username, password }: LoginArgs) => {
            const user = await User.findOne({ username });
            if (!user || !(await user.isCorrectPassword(password))) {
                throw new Error("Invalid credentials");
            }
            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },
        saveBook: async (_parent: unknown, { bookId, authors, description, title, image, link }: SaveBookArgs, context: Context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    context.user._id,
                    { $addToSet: { savedBooks: { bookId, authors, description, title, image, link } } },
                    { new: true }
                ).populate("savedBooks");
                return updatedUser;
            }
            throw new Error("Not authenticated");
        },
        deleteBook: async (_parent: unknown, { bookId }: DeleteBookArgs, context: Context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    context.user._id,
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                ).populate("savedBooks");
                return updatedUser;
            }
            throw new Error("Not authenticated");
        },
    },
};

export default resolvers;