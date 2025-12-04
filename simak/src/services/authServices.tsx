import type { UserUpdate } from "@/components/modals/AddUserModal";
import { AuthContext } from "@/contexts/auth-context";
import apiFetch from "@/lib/api";
import { AuthError } from "@/lib/errors";
import type { Role } from "@/types";
import { useEffect, useState, type ReactNode } from "react";

export interface UserData {
  id: number;
  username: string;
  name: string;
  role: Role;
  id_dokter: string | null;
  id_kasir: string | null;
  id_resepsionis: string | null;
  id_staf_lab: string | null;
  remember_token: string | null;
  created_at: string;
  updated_at: string;
}
export interface UserDataWithPassword {
  id: number;
  username: string;
  password: string;
  name: string;
  role: Role;
  id_dokter: string | null;
  id_kasir: string | null;
  id_resepsionis: string | null;
  id_staf_lab: string | null;
  remember_token: string | null;
  created_at: string;
  updated_at: string;
}

interface Auth {
  user: UserData;
  token: string;
}

export interface AuthContextI {
  user: UserData | null;
  login: (username: string, password: string) => Promise<UserData>;
  logout: () => Promise<void>;
  loading: boolean;
}

export const fetchAllUsersAPI = async (): Promise<UserData[]> => {
  const response = await apiFetch(`/users`);
  return response.data;
};

export const createUserAPI = async (
  newReceptionist: Omit<UserUpdate, "id"> & {
    id_resepsionis: string | null;
    id_dokter: string | null;
    id_staf_lab: string | null;
    id_kasir: string | null;
  }
) => {
  await apiFetch("/register", {
    method: "POST",
    body: JSON.stringify(newReceptionist),
  });
  return;
};

export const updateUserAPI = async (
  updatedUser: UserUpdate & { updatedAt: string }
) => {
  await apiFetch(`/user/${updatedUser.id}`, {
    method: "PUT",
    body: JSON.stringify(updatedUser),
  });
  return;
};

const postLoginAPI = async (
  username: string,
  password: string
): Promise<Auth> => {
  const response = await apiFetch("/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
  return {
    user: response.data.user,
    token: response.data.access_token,
  };
};

const getUserDataAPI = async (): Promise<UserData> => {
  const response = await apiFetch("/user");
  return response.data.user;
};

const logoutAPI = async () => {
  return apiFetch("/logout", {
    method: "POST",
  });
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const user = await getUserDataAPI();
        setUser(user);
      }
    } catch (error) {
      if (error instanceof AuthError) {
        localStorage.removeItem("token");
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (
    username: string,
    password: string
  ): Promise<UserData> => {
    const response = await postLoginAPI(username, password);
    const { user, token } = response;

    localStorage.setItem("token", token);
    setUser(user);

    return user;
  };

  const logout = async () => {
    try {
      await logoutAPI();
    } catch (error) {
      console.error(error);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
