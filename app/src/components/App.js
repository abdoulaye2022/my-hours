import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/actions/users.actions";
// Pages importation
import Login from "../pages/Login";
import Accueil from "../pages/Accueil";
import Profile from "../pages/Profile";
import MesHoraires from "../pages/MesHoraires";
import Configuration from "../pages/Configuration";
import Very from "../pages/Very";
import NotFound from "../pages/NotFound";
import ResetPassword from "../pages/ResetPassword";

// Pages Admin
import Dashboard from "../pages/admin/Dashboard";
import Utilisateurs from "../pages/admin/Utilisateurs";

// App Css code
import "./App.css";
import { Layout } from "../components/Layouts/Layout";
import { LayoutAdmin } from "./Layouts/admin/LayoutAdmin";
import NewUser from "../pages/NewUser";
import Reset from "../pages/Reset";

import "@formatjs/intl-pluralrules/polyfill";
import "@formatjs/intl-pluralrules/locale-data/de"; // Add locale data for your supported languages
import "@formatjs/intl-relativetimeformat/polyfill";
import "@formatjs/intl-relativetimeformat/locale-data/de"; // Add locale data for your supported languages
import { IntlProvider } from "react-intl";

import messages_en from "../translations/en.json";
import messages_fr from "../translations/fr.json";
import { langueActions } from "../redux/actions/langues.actions";

const messages = {
    en: messages_en,
    fr: messages_fr,
};

// get browser language without the region code
// const language = navigator.language.split(/[-_]/)[0];

const App = () => {
    let navigate = useNavigate();
    const auth = useSelector((state) => state.user.authenticathed);
    const is_admin = useSelector((state) => state.user.user.is_admin);
    const loading = useSelector((state) => state.user.loading);
    const language = useSelector(state => state.langue.lang);
    const dispatch = useDispatch();

    const redirectToLogin = () => {
        return navigate("/");
    };

    useEffect(() => {
        // if (is_admin === 2)
        //   dispatch(userActions.logout(redirectToLogin));
        dispatch(langueActions.changeLangue(language));
    }, [auth]);

    return (
        <>
            <IntlProvider
                locale={navigator.language}
                messages={messages[language]}
            >
                <Routes>
                    <Route path="/creation-compte/:token" element={<Very />} />
                    <Route
                        path="/reinitialiser-mot-de-passe/:token"
                        element={<Reset />}
                    />
                    <Route
                        path="/reinitialiser-mot-de-passe"
                        element={
                            <ResetPasswordRoute>
                                <ResetPassword />
                            </ResetPasswordRoute>
                        }
                    />
                    <Route
                        path="/creer-un-compte"
                        element={
                            <NewUserRoute>
                                <NewUser />
                            </NewUserRoute>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            auth === true && is_admin === 1 ? (
                                <Navigate to="/dashboard" replace />
                            ) : auth === true && is_admin === 0 ? (
                                <Navigate to="/accueil" replace />
                            ) : (
                                <Login />
                            )
                        }
                    />
                    <Route
                        path="/accueil"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <Accueil />
                                </Layout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/mes-horaires"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <MesHoraires />
                                </Layout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/configuration"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <Configuration />
                                </Layout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/profil"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <Profile />
                                </Layout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <AdminRoute>
                                <LayoutAdmin>
                                    <Dashboard />
                                </LayoutAdmin>
                            </AdminRoute>
                        }
                    />
                    <Route
                        path="/utilisateurs"
                        element={
                            <AdminRoute>
                                <LayoutAdmin>
                                    <Utilisateurs />
                                </LayoutAdmin>
                            </AdminRoute>
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </IntlProvider>
        </>
    );
};

function NewUserRoute({ children }) {
    const new_user = useSelector((state) => state.user.user.new_user);
    return new_user === 1 ? children : <Navigate to="/" replace />;
}

function ResetPasswordRoute({ children }) {
    const resetPassword = useSelector((state) => state.user.resetPassword);
    return resetPassword ? children : <Navigate to="/" replace />;
}

function PrivateRoute({ children }) {
    const auth = useSelector((state) => state.user.authenticathed);
    const is_admin = useSelector((state) => state.user.user.is_admin);
    return auth === true && is_admin === 0 ? (
        children
    ) : (
        <Navigate to="/" replace />
    );
}

function AdminRoute({ children }) {
    const is_admin = useSelector((state) => state.user.user.is_admin);
    const auth = useSelector((state) => state.user.authenticathed);
    return auth === true && is_admin === 1 ? (
        children
    ) : (
        <Navigate to="/" replace />
    );
}

export default App;
