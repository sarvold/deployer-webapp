import React, { PropsWithChildren } from 'react';
import classes from './DeployableItem.module.css';

type ComponentProps = PropsWithChildren<{
    itemName: string;
    onClickItem: (_: string) => void;
    isSelected: boolean;
}>;

const DeployableItem: React.FC<ComponentProps> = ({
    itemName,
    onClickItem,
    isSelected,
}) => {
    const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onClickItem(itemName);
    };
    return (
        <button
            className={`${classes.item} ${isSelected ? classes.selected : ''}`}
            onClick={onClickHandler}
        >
            {itemName}
        </button>
    );
};

export default DeployableItem;
