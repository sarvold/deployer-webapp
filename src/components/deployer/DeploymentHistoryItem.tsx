import { PropsWithChildren } from 'react';
import { Card, Icon } from 'semantic-ui-react';
import {
    SemanticCOLORS,
    SemanticICONS,
} from 'semantic-ui-react/dist/commonjs/generic';
import {
    DeploymentStatus,
    PossibleDeploymentStatus,
} from '../../models/DeploymentHistory';

type ComponentProps = PropsWithChildren<{
    item: DeploymentStatus;
}>;
const mappedStatus: {
    [key in PossibleDeploymentStatus]: {
        color: SemanticCOLORS;
        status: string;
        iconName: SemanticICONS;
    };
} = {
    success: { color: 'green', status: 'Succeeded', iconName: 'check' },
    error: { color: 'red', status: 'Failed', iconName: 'times' },
    pending: { color: 'yellow', status: 'In progress', iconName: 'time' },
};
const DeploymentHistoryItem: React.FC<ComponentProps> = ({ item }) => {
    return (
        <Card fluid color={mappedStatus[item.status].color}>
            <Card.Content>
                <Card.Header>
                    <Icon
                        color={mappedStatus[item.status].color}
                        name={mappedStatus[item.status].iconName}
                    />
                    {mappedStatus[item.status].status}
                </Card.Header>
                <Card.Meta>{item.deployableGroupName}</Card.Meta>
                <p>{item.environmentName}</p>
                <p>
                    Started:
                    {item.started}
                </p>
                <p>
                    Ended:
                    {item.ended}
                </p>
            </Card.Content>
        </Card>
    );
};
export default DeploymentHistoryItem;
