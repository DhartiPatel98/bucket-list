import { gql } from "@apollo/client";

const DELETE_WISH = gql`
  mutation DeleteWish($id: String!) {
    deleteWish(id: $id) {
      id
      title
    }
  }
`;

export { DELETE_WISH };
