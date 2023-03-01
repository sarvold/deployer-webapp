import { DeploymentStatus } from '../models/DeploymentHistory';

export const mockDeploymentHistory: DeploymentStatus[] = [
    {
        deployableGroupName: 'brella',
        environmentName: 'qa-platform',
        started: '2022...',
        ended: '2022...',
        deployableName: 'qa-core',
        status: 'error',
        statusMsg: 'ajsdlfjalsdjflñkad',
    },
    {
        deployableGroupName: 'brella',
        environmentName: 'qa-platform',
        started: '2022...',
        ended: '2022...',
        deployableName: 'qa-core',
        status: 'success',
        statusMsg: null,
    },
    {
        deployableGroupName: 'symetra',
        environmentName: 'qa-platform',
        started: '2022...',
        ended: '2022...',
        deployableName: 'qa-core',
        status: 'error',
        statusMsg: 'ajsdlfjalsdjflñkad',
    },
    {
        deployableGroupName: 'symetra',
        environmentName: 'qa-platform',
        started: '2022...',
        ended: '2022...',
        deployableName: 'qa-core',
        status: 'success',
        statusMsg: null,
    },
];
