import React, { useContext, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import DeploymentHistory from '../components/deployer/DeploymentHistory';
import DeploymentSelections from '../components/deployer/DeploymentSelections';
import { mockDeployableOptions } from '../mockData/mockDeployableOptions';
import { DeployableGroup } from '../models/Deployment';
import AuthContext from '../store/auth-context';
import DeployContext from '../store/deploy-context';

const Deployer: React.FC = () => {
    const authCtx = useContext(AuthContext);
    const deployCtx = useContext(DeployContext);

    useEffect(() => {
        if (!authCtx.isLoggedIn) return;

        const url = 'http://deployer-api.com/checkDeploymentStatus'; // TODO-LASZ: Update url accordingly
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                idToken: authCtx.token,
            }),
            headers: {
                'Content-Type': 'application/json',
                // TODO-LASZ: maybe add a bearer token here in an Authorization prop
            },
        })
            .then((res) => res.json() as Promise<DeployableGroup>)
            .then((data: DeployableGroup) => {
                console.log(data);
                deployCtx.populateDeploymentOptions(data);
            })
            .catch((err) => {
                // TODO-LASZ: remove below line when implementing real endpoints
                deployCtx.populateDeploymentOptions(mockDeployableOptions);
                alert('Failed checking deployment status: ' + err.message);
            });
    }, [authCtx.isLoggedIn]);

    return (
        <Container>
            <DeploymentSelections></DeploymentSelections>
            <DeploymentHistory></DeploymentHistory>
        </Container>
    );
};

export default Deployer;
