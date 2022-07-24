import { gql } from "@apollo/client";

const GET_BUCKET_LIST = gql`
  query GetBucketList {
    wishes {
      id
      title
    }
  }
`;

export { GET_BUCKET_LIST };
