import React, { useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import AuthForm from './pages/auth/AuthForm';
import Deployer from './pages/Deployer';
import AuthContext from './store/auth-context';
import { DeployContextProvider } from './store/deploy-context';

function App() {
    const authCtx = useContext(AuthContext);
    return (
        <DeployContextProvider>
            <BrowserRouter>
                <Layout>
                    {authCtx.isLoggedIn}
                    <Routes>
                        {!authCtx.isLoggedIn && (
                            <Route path='/auth' element={<AuthForm />} />
                        )}
                        {authCtx.isLoggedIn && (
                            <Route path='/*' element={<Deployer />} />
                        )}
                        {!authCtx.isLoggedIn && (
                            <Route
                                path='*'
                                element={<Navigate replace to='/auth' />}
                            />
                        )}
                    </Routes>
                </Layout>
            </BrowserRouter>
        </DeployContextProvider>
    );
}

export default App;
