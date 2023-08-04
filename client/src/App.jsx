import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";

import "./App.css";
import LocationForm from "./components/LocationForm";

import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((parent, {headers}) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
function App() {

  return (
    <ApolloProvider client={client}>
      <h1>Ocean Data</h1>
      <LocationForm />

    </ApolloProvider>
  )
}

export default App
