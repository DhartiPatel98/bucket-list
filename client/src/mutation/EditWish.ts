import { gql } from "@apollo/client";

const EDIT_WISH = gql`
  mutation UpdateWish(
    $id: String!
    $title: String!
    $description: String
    $checklist: [ChecklistInputItem!]
    $deletedIds: [String]
  ) {
    updateWish(
      id: $id
      title: $title
      description: $description
      checklist: $checklist
      deletedIds: $deletedIds
    ) {
      id
      title
    }
  }
`;

export { EDIT_WISH };
