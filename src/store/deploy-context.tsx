import React, { PropsWithChildren, useState } from 'react';
import { mockDeployableOptions } from '../mockData/mockDeployableOptions';
import { DeployableGroup } from '../models/Deployment';

type DeployContextProps = {
    deploymentOptions: DeployableGroup | null;
    populateDeploymentOptions: (_options: DeployableGroup) => void;
};
const DeployContext = React.createContext<DeployContextProps>({
    deploymentOptions: null,
    populateDeploymentOptions: (_options) => {},
});

// See React 18 types: https://stackoverflow.com/a/71800185/8430632
export const DeployContextProvider: React.FC<PropsWithChildren<{}>> = (
    props
) => {
    const [deploymentOptions, setDeploymentOptions] =
        useState<DeployableGroup | null>(mockDeployableOptions); // TODO-LASZ: Remember to update when using real endpoints
    const deploymentOptionsHandler = (options: DeployableGroup) => {
        setDeploymentOptions(options);
    };

    const contextValue: DeployContextProps = {
        deploymentOptions,
        populateDeploymentOptions: deploymentOptionsHandler,
    };
    return (
        <DeployContext.Provider value={contextValue}>
            {props.children}
        </DeployContext.Provider>
    );
};
export default DeployContext;
