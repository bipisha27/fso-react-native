import { useQuery } from "@apollo/client/react";

import { GET_SINGLE_REPOSITORY } from "../graphql/queries";

const useRepository = (id, first) => {
  const { data, loading, error, fetchMore, ...result } = useQuery(
    GET_SINGLE_REPOSITORY,
    {
      variables: { id, first },
      fetchPolicy: "cache-and-network",
    },
  );

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    console.log(
      "canFetchMore ->",
      canFetchMore,
      "hasNextPage ->",
      data?.repository.reviews.pageInfo.hasNextPage,
      "totalCount ->",
      data?.repository.reviews.totalCount,
    );

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        id,
        first,
        after: data.repository.reviews.pageInfo.endCursor,
      },
    });
  };

  const repository = data?.repository;

  return { repository, fetchMore: handleFetchMore, loading, error, ...result };
};

export default useRepository;
