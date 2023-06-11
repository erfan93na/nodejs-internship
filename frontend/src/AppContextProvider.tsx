import React, { createContext, PropsWithChildren, useState } from "react";

type Props = {};
export const AppContext = createContext<null | {
  username: string;
  setUsername: (username: string) => void;
}>(null);
export const AppContextProvider = (props: PropsWithChildren) => {
  const [username, setUsername] = useState("");
  return (
    <AppContext.Provider value={{ username, setUsername }}>
      {props.children}
    </AppContext.Provider>
  );
};
