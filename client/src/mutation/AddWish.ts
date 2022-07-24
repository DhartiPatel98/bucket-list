import { gql } from "@apollo/client";

const ADD_WISH = gql`
  mutation AddWish($title: String!, $description: String) {
    addWish(title: $title, description: $description) {
      id
      title
    }
  }
`;

export { ADD_WISH };
