import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DeployableGroupItem } from '../../../models/Deployment';
import DeployContext from '../../../store/deploy-context';
import DeploymentBreadcrumb from '../../breadcrumb/DeploymentBreadcrumb';
import DeployableItem from '../DeployableItem';
import classes from './DeploymentEnvs.module.css';

const DeploymentEnvs: React.FC = () => {
    const deployCtx = useContext(DeployContext);
    const navigate = useNavigate();
    const params = useParams();

    const selectEnvironmentHandler = (envName: string) => {
        console.log(envName);

        navigate(`/groups/${params.group}/envs/${envName}/projects`, { replace: true });
    };

    // Environments
    const selectedGroupNameIndex =
        params.group && deployCtx.deploymentOptions?.deployableGroup?.length
            ? deployCtx.deploymentOptions?.deployableGroup.findIndex(
                  (groupItem: DeployableGroupItem) => {
                      return groupItem.deployableGroupName === params.group;
                  }
              )
            : -1;
    const deployableEnvs =
        params.group &&
        selectedGroupNameIndex !== -1 &&
        deployCtx.deploymentOptions?.deployableGroup[selectedGroupNameIndex]
            ? deployCtx.deploymentOptions?.deployableGroup[
                  selectedGroupNameIndex
              ].environment.map((env, i) => (
                  <DeployableItem
                      key={i}
                      itemName={env.environmentName}
                      onClickItem={selectEnvironmentHandler}
                      isSelected={params.environment === env.environmentName}
                  ></DeployableItem>
              ))
            : null;

    return (
        <React.Fragment>
            <DeploymentBreadcrumb></DeploymentBreadcrumb>
            {deployableEnvs?.length && (
                <div className={classes.environments}>
                    <h4>Environment</h4>
                    <div>{deployableEnvs}</div>
                </div>
            )}
        </React.Fragment>
    );
};
export default DeploymentEnvs;
