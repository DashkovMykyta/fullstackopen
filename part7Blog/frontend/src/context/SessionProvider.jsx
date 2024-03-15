import { createContext, useState } from "react";

export const SessionContext = createContext();

const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <SessionContext.Provider value={{ user, setUser }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
