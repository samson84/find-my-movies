import { useMovieDetails } from "../../api/wikipedia";
import Details from "./Details";

type DetailsContainerProps = {
  query?: string;
};

const DetailsContainer = ({ query }: DetailsContainerProps) => {
  const { data, error, loading } = useMovieDetails(query);

  return (
    <Details
      details={data}
      title={query}
      errorCode={error?.code}
      isLoading={loading}
    />
  );
};

export default DetailsContainer;
