import React, { useContext } from 'react';
import {
    Navigate,
    Route,
    Routes
} from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import DeployContext from '../../store/deploy-context';
import DeploymentEnvs from './deployment-pages/DeploymentEnvs';
import DeploymentGroups from './deployment-pages/DeploymentGroups';
import DeploymentProjects from './deployment-pages/DeploymentProjects';

const DeploymentSelections: React.FC = () => {
    const deployCtx = useContext(DeployContext);
    const authCtx = useContext(AuthContext);

    return (
        <React.Fragment>
            {!deployCtx.deploymentOptions && (
                <p>Fetching deployment options...</p>
            )}
            {deployCtx.deploymentOptions && (
            <Routes>
                {authCtx.isLoggedIn && (
                    <Route path='/groups' element={<DeploymentGroups />} />
                )}
                {authCtx.isLoggedIn && (
                    <Route
                        path='/groups/:group/envs'
                        element={<DeploymentEnvs />}
                    />
                )}
                {authCtx.isLoggedIn && (
                    <Route
                        path='/groups/:group/envs/:environment/projects'
                        element={<DeploymentProjects />}
                    />
                )}
                {authCtx.isLoggedIn && (
                    <Route
                        path='/groups/:group/envs/:environment/projects '
                        element={<DeploymentProjects />}
                    />
                )}
                {authCtx.isLoggedIn && (
                    <Route
                        path='*'
                        element={<Navigate replace to='/groups' />}
                    />
                )}
            </Routes>
            )}
        </React.Fragment>
    );
};

export default DeploymentSelections;
