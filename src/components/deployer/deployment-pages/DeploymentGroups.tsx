import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DeployContext from '../../../store/deploy-context';
import DeploymentBreadcrumb from '../../breadcrumb/DeploymentBreadcrumb';
import DeployableItem from '../DeployableItem';
import classes from './DeploymentGroups.module.css';

const DeploymentGroups: React.FC = () => {
    const params = useParams();
    const deployCtx = useContext(DeployContext);
    const navigate = useNavigate();

    const selectGroupItemHandler = (groupName: string) => {
        console.log(groupName);

        navigate(`/groups/${groupName}/envs`, { replace: true });
    };

    const isValidGroupFromParam =
        !params.group ||
        deployCtx.deploymentOptions?.deployableGroup?.some(
            (group) => group.deployableGroupName === params.group
        );
    const deployableGroups = deployCtx.deploymentOptions?.deployableGroup?.map(
        (group, i) => (
            <DeployableItem
                key={i}
                itemName={group.deployableGroupName}
                onClickItem={selectGroupItemHandler}
                isSelected={params.group === group.deployableGroupName}
            ></DeployableItem>
        )
    );
    return (
        <React.Fragment>
            <DeploymentBreadcrumb></DeploymentBreadcrumb>
            {!isValidGroupFromParam && (
                <legend>
                    Group name entered in the url does not exist. Select one
                    from below list.
                </legend>
            )}
            {deployableGroups?.length && (
                <div className={classes.groups}>
                    <h3>Deployable Group</h3>
                    <div>{deployableGroups}</div>
                </div>
            )}
        </React.Fragment>
    );
};
export default DeploymentGroups;
