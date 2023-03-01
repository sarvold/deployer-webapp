import { DeployableGroup } from '../models/Deployment';

export const mockDeployableOptions: DeployableGroup = {
    deployableGroup: [
        {
            deployableGroupName: 'brella',
            environment: [
                {
                    environmentName: 'qa-platform',
                    deployables: [
                        {
                            deployableName: 'core',
                            isUi: false,
                        },
                        {
                            deployableName: 'employer-fsl',
                            isUi: true,
                        },
                        {
                            deployableName: 'member-fsl',
                            isUi: true,
                        },
                    ],
                },
                {
                    environmentName: 'staging-platform',
                    deployables: [
                        {
                            deployableName: 'core',
                            isUi: false,
                        },
                        {
                            deployableName: 'employer-fsl',
                            isUi: true,
                        },
                        {
                            deployableName: 'member-fsl',
                            isUi: true,
                        },
                    ],
                },
                {
                    environmentName: 'prod-platform',
                    deployables: [
                        {
                            deployableName: 'core',
                            isUi: false,
                        },
                        {
                            deployableName: 'employer-fsl',
                            isUi: true,
                        },
                        {
                            deployableName: 'member-fsl',
                            isUi: true,
                        },
                    ],
                },
            ],
        },
        {
            deployableGroupName: 'symetra',
            environment: [
                {
                    environmentName: 'qa-platform',
                    deployables: [
                        {
                            deployableName: 'core',
                            isUi: false,
                        },
                        {
                            deployableName: 'employer-fsl',
                            isUi: true,
                        },
                        {
                            deployableName: 'member-fsl',
                            isUi: true,
                        },
                    ],
                },
                {
                    environmentName: 'staging-platform',
                    deployables: [
                        {
                            deployableName: 'core',
                            isUi: false,
                        },
                        {
                            deployableName: 'employer-fsl',
                            isUi: true,
                        },
                        {
                            deployableName: 'member-fsl',
                            isUi: true,
                        },
                    ],
                },
                {
                    environmentName: 'prod-platform',
                    deployables: [
                        {
                            deployableName: 'core',
                            isUi: false,
                        },
                        {
                            deployableName: 'employer-fsl',
                            isUi: true,
                        },
                        {
                            deployableName: 'member-fsl',
                            isUi: true,
                        },
                    ],
                },
            ],
        },
    ],
};
