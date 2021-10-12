import type { NextPage, NextComponentType } from 'next'

export type CustomNextPage = NextPage & {
    auth?:boolean,
    subLayout?: string,
    subLayoutIndex?: number
}

export type CustomNextComponent = NextComponentType & {
    subLayout?: string,
    subLayoutIndex?: number
}

export type FormValues = {
    title: string,
    published: boolean,
    tags: [string],
    content: string
};

export type FormDataAccount = {
    username: string;
    name : string;
};