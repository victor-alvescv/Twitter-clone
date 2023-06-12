import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Helmet } from "react-helmet";

export default function App({ Component, pageProps }) {
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Twitter</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <meta name="description" content="Helmet application" />
      </Helmet>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </div>
  );
}
