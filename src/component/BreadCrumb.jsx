import { createContext, useContext, useState } from 'react';

const BreadcrumbContext = createContext();

const useBreadcrumb = () => {
    const context = useContext(BreadcrumbContext);
    if (!context) {
        throw new Error("useBreadcrumb must be used within a BreadcrumbProvider");
    }
    return context;
};

const BreadcrumbProvider = ({ children }) => {
    const [breadcrumbItems, setBreadcrumbItems] = useState([{ title: 'Map' }]);

    return (
        <BreadcrumbContext.Provider value={{ breadcrumbItems, setBreadcrumbItems }}>
            {children}
        </BreadcrumbContext.Provider>
    );
};

export { useBreadcrumb, BreadcrumbProvider };