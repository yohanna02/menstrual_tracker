import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  createContext,
  useState,
} from "react";

export const userContext = createContext<{
  user: any;
  setUser: any;
}>({ user: null, setUser: null });

const UserContextProvider = (props: {
  children:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | null
    | undefined;
}) => {
  const [user, setUser] = useState(null);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {props.children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
