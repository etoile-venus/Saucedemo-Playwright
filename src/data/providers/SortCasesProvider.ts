import { IProductSortOption } from '../../utilities/Interfaces';

export const productSortOptions: IProductSortOption[] = [
    {
        option: 'Name (A to Z)',
        itemType: 'title'
    },
    {
        option: 'Name (Z to A)',
        itemType: 'title'
    },
    {
        option: 'Price (low to high)',
        itemType: 'price'
    },
    {
        option: 'Price (high to low)',
        itemType: 'price'
    },
];