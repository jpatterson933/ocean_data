import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { Outlet } from "react-router-dom";
import "./App.css";

import NavigationBar from "./components/Nav";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationBar />
      <Outlet />
    </ApolloProvider>
  )
}

export default App;