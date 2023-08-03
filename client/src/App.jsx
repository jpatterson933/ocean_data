import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import "./App.css";
import LocationForm from "./components/LocationForm";


const client = new ApolloClient({
  uri: "/graphql",
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
