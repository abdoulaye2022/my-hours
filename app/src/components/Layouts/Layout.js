import React from "react";
import { HeaderApp } from "./HeaderApp";
import { FooterApp } from "./FooterApp";

export const Layout = ({ children }) => {
    return (
        <>
            <HeaderApp />
                {children}
            <FooterApp />
        </>
    );
}