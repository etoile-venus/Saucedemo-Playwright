import { TItemFilter, TSortName } from "./Types";

export interface IProductSortOption {
    option: TSortName,
    itemType: TItemFilter
}

export interface IUserCredentials {
    username: string;
    password: string;
    errorMessage: string;
}

export interface IItemData {
    id: string;
    title: string;
    description: string;
    price: number;
    imageSrc: string;
    button: string;
}