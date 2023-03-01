
export interface DeploymentStatus {
    deployableGroupName: string; // 'brella | symetra
    environmentName: string;
    started: string; // e.g.: '2022...',
    ended: string; // e.g.: '2022...',
    deployableName: string; // e.g.: 'qa-core',
    status: PossibleDeploymentStatus; // e.g.: 'error',
    statusMsg: string | null; // e.g.: 'ajsdlfjalsdjflñkad'
}
export type PossibleDeploymentStatus = 'error' | 'success' | 'pending';
