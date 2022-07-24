import { gql } from "@apollo/client";

const GET_WISH = gql`
  query GetWish($id: String!) {
    wish(id: $id) {
      id
      title
      description
      checklist {
        id
        item
        isFullfilled
      }
    }
  }
`;

export { GET_WISH };
