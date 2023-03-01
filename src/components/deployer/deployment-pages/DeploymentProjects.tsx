import React, { useContext } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Card } from 'semantic-ui-react';
import {
    DeployableEnvironment,
    DeployableGroupItem,
    DeployRequest,
} from '../../../models/Deployment';
import AuthContext from '../../../store/auth-context';
import DeployContext from '../../../store/deploy-context';
import DeploymentBreadcrumb from '../../breadcrumb/DeploymentBreadcrumb';
import DeployableItem from '../DeployableItem';
import RunNpmButton from '../RunNpmButton';
import classes from './DeploymentProjects.module.css';

const DeploymentProjects: React.FC = () => {
    const deployCtx = useContext(DeployContext);
    const params = useParams();
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const [queryParams, setQueryParams] = useSearchParams();

    const selectProjectHandler = (projectName: string) => {
        console.log(projectName);
        const newSelectedDeployableNames = queryParams.getAll('projects');
        const indexOfClickedProject =
            // newSelectedDeployableNames.indexOf(projectName);
            newSelectedDeployableNames.indexOf(projectName);
        if (indexOfClickedProject === -1) {
            // Project was not here before, add it
            newSelectedDeployableNames.push(projectName);
        } else {
            // Project name was previously selected, remove it
            newSelectedDeployableNames.splice(indexOfClickedProject, 1);
        }
        setQueryParams({
            projects: newSelectedDeployableNames,
            npms: queryParams.getAll('npms'),
        });
    };
    const onSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const deployRequest: DeployRequest = {
            deployableGroupName: params.group!,
            environmentName: params.environment!,
            deployables: queryParams
                .getAll('projects')
                .map((deployableName: string) => {
                    const shouldRunNpmInstall = queryParams
                        .getAll('npms')
                        ?.some((projectName) => projectName === deployableName);
                    return {
                        deployableName,
                        npmInstall: shouldRunNpmInstall,
                    };
                }),
        };

        const url = 'http://deployer-api.com/deploy'; // TODO-LASZ: Update url accordingly
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                idToken: authCtx.token,
                ...deployRequest,
            }),
            headers: {
                'Content-Type': 'application/json',
                // TODO-LASZ: maybe add a bearer token here in an Authorization prop
            },
        })
            .then((res) => {
                console.log(res);
                navigate('/', { replace: true });
            })
            .catch((err) => {
                alert('Error: ' + err.message);
            });
    };
    // TODO-LASZ: Duplicated code with DeploymentEnvs.tsx - DRY
    const selectedGroupNameIndex =
        params.group && deployCtx.deploymentOptions?.deployableGroup?.length
            ? deployCtx.deploymentOptions?.deployableGroup.findIndex(
                  (groupItem: DeployableGroupItem) => {
                      return groupItem.deployableGroupName === params.group;
                  }
              )
            : -1;

    // Projects
    const selectedEnvironmentNameIndex =
        params.environment &&
        selectedGroupNameIndex !== -1 &&
        deployCtx.deploymentOptions?.deployableGroup?.[selectedGroupNameIndex]
            ?.environment?.length
            ? deployCtx.deploymentOptions.deployableGroup[
                  selectedGroupNameIndex
              ].environment.findIndex((environment: DeployableEnvironment) => {
                  return environment.environmentName === params.environment;
              })
            : -1;
    const deployableProjects =
        params.group &&
        params.environment &&
        selectedEnvironmentNameIndex !== -1 &&
        deployCtx.deploymentOptions?.deployableGroup?.[selectedGroupNameIndex]
            ?.environment?.[selectedEnvironmentNameIndex]?.deployables.length
            ? deployCtx.deploymentOptions.deployableGroup[
                  selectedGroupNameIndex
              ].environment[selectedEnvironmentNameIndex].deployables.map(
                  (project, i) => {
                      const isProjectSelected = queryParams
                          .getAll('projects')
                          ?.some(
                              (projectName: string) =>
                                  project.deployableName === projectName
                          );
                      return (
                          <Card key={i} color={isProjectSelected ? 'yellow' : undefined}>
                              <Card.Content>
                                  <DeployableItem
                                      itemName={project.deployableName}
                                      onClickItem={selectProjectHandler}
                                      isSelected={isProjectSelected}
                                  ></DeployableItem>
                              </Card.Content>
                              {project.isUi && (
                                  <Card.Content extra>
                                      <RunNpmButton
                                          index={i}
                                          projectName={project.deployableName}
                                          isDisabled={!isProjectSelected}
                                      ></RunNpmButton>
                                  </Card.Content>
                              )}
                          </Card>
                      );
                  }
              )
            : null;

    return (
        <React.Fragment>
            <DeploymentBreadcrumb></DeploymentBreadcrumb>
            {deployableProjects?.length && (
                <div className={classes.projects}>
                    <h4>Projects</h4>
                    <Card.Group itemsPerRow={3}>
                        {deployableProjects}
                    </Card.Group>
                </div>
            )}
            {!!queryParams.getAll('projects').length && (
                <button className={classes.deploy} onClick={onSubmitHandler}>
                    Deploy
                </button>
            )}
        </React.Fragment>
    );
};
export default DeploymentProjects;
