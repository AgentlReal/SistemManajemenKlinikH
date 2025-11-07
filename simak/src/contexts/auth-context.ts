import { createContext } from "react";
import type { AuthContextI } from "@/services/authServices";

export const AuthContext = createContext<AuthContextI | null>(null);
