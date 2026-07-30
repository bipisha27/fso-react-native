import { useQuery } from "@apollo/client/react";

import { GET_SINGLE_REPOSITORY } from "../graphql/queries";

const useRepository = (id) => {
  const { data, loading, error } = useQuery(GET_SINGLE_REPOSITORY, {
    variables: { id },
    fetchPolicy: "cache-and-network",
  });

  const repository = data?.repository;

  return { repository, loading, error };
};

export default useRepository;
