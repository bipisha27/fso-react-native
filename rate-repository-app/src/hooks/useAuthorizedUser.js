import { useQuery } from "@apollo/client/react";
import { ME } from "../graphql/queries";

const useAuthorizedUser = () => {
  const { data, loading, error } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });

  return { user: data?.me, loading, error };
};

export default useAuthorizedUser;
