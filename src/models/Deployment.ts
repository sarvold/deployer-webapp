export interface DeployableGroup {
        deployableGroup: DeployableGroupItem [];
}
export interface DeployableGroupItem {
        deployableGroupName: string; // 'brella' | 'symetra'
        environment: DeployableEnvironment[];
}

export interface DeployableEnvironment {
    environmentName: string; // 'qa-platform' | 'staging-platform
    deployables: DeployableProject[];
}

export interface DeployableProject {
    deployableName: string; // 'core' | 'employer-fsl' | 'member-fsl'
    isUi: boolean;
}

export interface DeployRequest {
    deployableGroupName: string;
    environmentName: string;
    deployables: DeployableItemRequest[]
}
// response: 200 OK / 500 error
export interface DeployableItemRequest {
    deployableName: string;
    npmInstall: boolean,
}