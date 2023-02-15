import { createContext } from "react";
import { IUser } from "../../interfaces";

interface ContextProps {
	isLoggedIn: boolean;
	user?: IUser;
	loginUser: (email: string, password: string) => Promise<boolean>;
	logoutUser: () => void;
	registerUser: (email: string, name: string, password: string) => Promise<{ hasError: boolean; message?: string }>;
}

export const AuthContext = createContext({} as ContextProps);