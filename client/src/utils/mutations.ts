import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
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
      }
    }
  }
`;

export const SAVE_BOOK = gql`
 mutation SaveBook($authors: [String!], $description: String!, $bookId: String!, $image: String!, $link: String, $title: String!) {
  saveBook(authors: $authors, description: $description, bookId: $bookId, image: $image, link: $link, title: $title) {
    _id
    username
    email
    savedBooks {
      authors
      bookId
      description
      image
      link
      title
    }
  }
}
`;

export const REMOVE_BOOK = gql`
  mutation RemoveBook($bookId: String!) {
  removeBook(bookId: $bookId) {
    _id
    email
    password
    username
    savedBooks {
      authors
      bookId
      description
      image
      link
      title
    }
  }
}
`;