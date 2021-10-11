import type { NextPage } from 'next'

export type CustomNextPage = NextPage & {
    auth?:boolean
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