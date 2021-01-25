import { Header } from "../components/Header/Header";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { usePostsQuery } from "../generated/graphql";

const Index = () => {
  const [{ fetching, data }] = usePostsQuery();
  return (
    <>
      <Header />
      {fetching ? (
        <h1>Loading...</h1>
      ) : (
        data?.posts.map((post) => <div key={post.id}>{post.title}</div>)
      )}
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
