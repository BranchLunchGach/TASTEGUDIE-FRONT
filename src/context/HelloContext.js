// HelloContext.js
import React, { createContext, useState } from 'react';

export const HelloContext = createContext();

export const HelloProvider = ({ children }) => {
    const [contextData, setContextData] = useState({ menu: '', avgX: '', avgY: ''}); // 전송할 데이터를 저장할 상태

    return (
        <HelloContext.Provider value={{ contextData, setContextData }}>
            {children}
        </HelloContext.Provider>
    );
};
