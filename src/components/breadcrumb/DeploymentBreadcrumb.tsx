import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumb } from 'semantic-ui-react';

const DeploymentBreadcrumb: React.FC = () => {
    const params = useParams();
    return (
        <React.Fragment>
            {params.group && (
                <Breadcrumb>
                    <Breadcrumb.Section as={Link} to='/groups'>
                        {params.group}
                    </Breadcrumb.Section>
                    {params.environment && (
                        <Breadcrumb.Divider icon='angle right' />
                    )}
                    {params.environment && (
                        <Breadcrumb.Section
                            as={Link}
                            to={`/groups/${params.group}/envs`}
                        >
                            {params.environment}
                        </Breadcrumb.Section>
                    )}
                </Breadcrumb>
            )}
        </React.Fragment>
    );
};

export default DeploymentBreadcrumb;
