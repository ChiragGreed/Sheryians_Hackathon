import React, { createContext, useState } from 'react';
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [login, setLogin] = useState(false);
    const [error, setError] = useState(null);

    return (
        <AuthContext.Provider value={{ user, setUser, login, setLogin, error, setError }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;