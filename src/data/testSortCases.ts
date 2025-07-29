import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

export interface sortOption {
    option: string,
    itemType: 'title' | 'price'
}

export const sortOptions: sortOption[] = [
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