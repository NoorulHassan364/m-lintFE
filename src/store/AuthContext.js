import React from "react";

//Creating context and give default value
export const AuthContext = React.createContext({
  admin: {},
  user: {},
  setAdmin: () => {},
  setUser: () => {},
});
//Provide context value
const AuthContextProvider = ({ children, admin, user }) => {
  const [adminState, setAdmin] = React.useState(admin);
  const [userState, setUser] = React.useState(user);

  return (
    <AuthContext.Provider
      value={{ admin: adminState, setAdmin, user: userState, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
