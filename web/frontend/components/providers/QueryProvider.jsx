import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
/**
* Sets up the QueryClientProvider from react-query.
* @desc See: https://react-query.tanstack.com/reference/QueryClientProvider#_top
*/

export function QueryProvider({ children }) {
  const client = new QueryClient({
       queryCache: new QueryCache(),
       mutationCache: new MutationCache(),
  });

  return (
       <QueryClientProvider client={client}>
            {children}
            <ReactQueryDevtools />
       </QueryClientProvider>
  );
}








// import {
//   QueryClient,
//   QueryClientProvider,
//   QueryCache,
//   MutationCache,
// } from "react-query";

// /**
//  * Sets up the QueryClientProvider from react-query.
//  * @desc See: https://react-query.tanstack.com/reference/QueryClientProvider#_top
//  */
// export function QueryProvider({ children }) {
//   const client = new QueryClient({
//     queryCache: new QueryCache(),
//     mutationCache: new MutationCache(),
//   });

//   return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
// }
