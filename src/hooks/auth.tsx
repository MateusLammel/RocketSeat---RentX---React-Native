import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { database } from "../database";
import api from "../services/api";
import { User as ModelUser } from "../database/models/User";

interface User {
  id: string;
  user_id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
  token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthProviderPops {
  children: ReactNode;
}

interface AuthContextData {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  load: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderPops) {
  const [data, setData] = useState<User>({} as User);
  const [load, setLoad] = useState(false);

  async function signIn({ email, password }: SignInCredentials) {
    setLoad(true)
    try {
      const response = await api.post("/sessions", {
        email,
        password,
      });

      const { token, user } = response.data;
      
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const userCollection = database.get<ModelUser>("users");
      await database.write(async () => {
        await userCollection.create((newUser) => {
          [
            (newUser.user_id = user.id),
            (newUser.name = user.name),
            (newUser.email = user.email),
            (newUser.driver_license = user.driver_license),
            (newUser.avatar = user.avatar),
            (newUser.token = token),
          ];
        });
      });

      setData({ token, ...user });


    } catch (error) {
      throw new Error(error);
    }
  }

  async function signOut() {
    try {
      const userCollection = database.get<ModelUser>("users");
      await database.write(async () => {
        const userSelected = await userCollection.find(data.id);
        await userSelected.destroyPermanently();
      });

      setData({} as User);
    } catch (error) {
      throw new Error(error);
    }
  }

  async function updateUser(user: User) {
    try {
      const userCollection = database.get<ModelUser>("users");
      await database.write(async () => {
        const userSelected = await userCollection.find(user.id);
        await userSelected.update((userData) => {
          userData.name = user.name;
          (userData.driver_license = user.driver_license),
            (userData.avatar = user.avatar);
        });
      });

      setData(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    async function loadUserData() {
      const userCollection = database.get<ModelUser>("users");
      const response = await userCollection.query().fetch();

      if (response.length > 0) {
        const userData = response[0]._raw as unknown as User;
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${userData.token}`;
        setData(userData);
      }
      setLoad(false);
    }

    loadUserData();
  });

  return (
    <AuthContext.Provider
      value={{ user: data, signIn, signOut, updateUser, load }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
