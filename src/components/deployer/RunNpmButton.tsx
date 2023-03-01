import { PropsWithChildren } from 'react';
import { useSearchParams } from 'react-router-dom';
import classes from './RunNpmButton.module.css';

type ComponentProps = PropsWithChildren<{
    index: number;
    projectName: string;
    // onChecked: (_projectName: string, _checkedValue: boolean) => void;
    // isChecked: boolean;
    isDisabled: boolean;
}>;
const RunNpmButton: React.FC<ComponentProps> = ({
    index,
    projectName,
    // onChecked,
    // isChecked,
    isDisabled,
}) => {
    const [queryParams, setQueryParams] = useSearchParams();

    const npmCheckboxHandler = (projectName: string, checkedValue: boolean) => {
        const newProjectsToRunNpm = queryParams.getAll('npms');
        const indexOfProject = newProjectsToRunNpm.indexOf(projectName);
        if (indexOfProject === -1 && checkedValue) {
            // Project was not here before and should be added
            newProjectsToRunNpm.push(projectName);
        } else if (indexOfProject > -1 && checkedValue === false) {
            // Project name was previously here and should be removed
            newProjectsToRunNpm.splice(indexOfProject, 1);
        }
        setQueryParams({
            projects: queryParams.getAll('projects'),
            npms: newProjectsToRunNpm,
        });
    };

    const isNpmChecked = !!queryParams
        .getAll('npms')
        ?.some((projectToRunNpm: string) => projectName === projectToRunNpm);

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        npmCheckboxHandler(projectName, event.target.checked);
    };
    return (
        <div>
            <label
                className={isDisabled ? classes.isDisabled : ''}
                htmlFor={'runNpmInstallCheckbox-' + index}
            >
                Run npm install?
            </label>
            <input
                id={'runNpmInstallCheckbox-' + index}
                type='checkbox'
                disabled={isDisabled}
                checked={isNpmChecked}
                onChange={onChangeHandler}
            />
        </div>
    );
};
export default RunNpmButton;
