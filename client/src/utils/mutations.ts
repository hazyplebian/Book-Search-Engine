import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
        token
        user {
            _id
            username
            email
            savedBooks {
            bookId
            authors
            description
            title
            image
            link
            }
        }
        }
    }
    `;

    export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
            email
            savedBooks {
            bookId
            authors
            description
            title
            image
            link
            }
        }
        }
    }
    `;

    export const SAVE_BOOK = gql`
    mutation saveBook($bookId: String!, $authors: [String]!, $description: String!, $title: String!, $image: String, $link: String) {
        saveBook(bookId: $bookId, authors: $authors, description: $description, title: $title, image: $image, link: $link) {
            _id
            username
            email
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
    `;

    export const REMOVE_BOOK = gql`
    mutation deleteBook($bookId: String!) {
        deleteBook(bookId: $bookId) {
            _id
            username
            email
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
    `;