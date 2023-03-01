import React, { useContext, useEffect, useState } from 'react';
import { Card } from 'semantic-ui-react';
import { mockDeploymentHistory } from '../../mockData/mockDeploymentHistory';
import { DeploymentStatus } from '../../models/DeploymentHistory';
import AuthContext from '../../store/auth-context';
import DeploymentHistoryItem from './DeploymentHistoryItem';

const DeploymentHistory: React.FC = () => {
    const [deploymentHistory, setDeploymentHistory] = useState<
        DeploymentStatus[]
    >([]);
    const authCtx = useContext(AuthContext);
    // const [timerIsActive, setTimerIsActive] = useState(false);

    const timerDuration = 5000;

    useEffect(() => {
        const interval = setInterval(() => {
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
                .then((res) => res.json() as Promise<DeploymentStatus[]>)
                .then((data: DeploymentStatus[]) => {
                    console.log(data);
                    setDeploymentHistory(data);
                })
                .catch((err) => {
                    // TODO-LASZ: remove below line when implementing real endpoints
                    setDeploymentHistory(mockDeploymentHistory);
                    console.log(err);
                    // alert(
                    //     'Failed checking deployment status: ' + err.message
                    // );
                });
        }, timerDuration);
        return () => {
            console.log('CLEANUP');
            clearInterval(interval);
        };
    }, []);

    return (
        <React.Fragment>
            <h3>Deployment History</h3>
            {!!deploymentHistory.length && (
                <Card.Group>
                    {deploymentHistory.map((item, i) => (
                        <DeploymentHistoryItem
                            key={i}
                            item={item}
                        ></DeploymentHistoryItem>
                    ))}
                </Card.Group>
            )}
        </React.Fragment>
    );
};
export default DeploymentHistory;
