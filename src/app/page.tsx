import MainSearch from "@/_components/search/MainSearch";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from "@tanstack/react-query";

export default function Home() {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <h2>이준열짱</h2>
      <MainSearch />
    </HydrationBoundary>
  );
}
