import React, { ComponentType } from "react";

const App = (
  { Page, pageProps }: { Page: ComponentType<any>; pageProps: any },
) => {
  return (
    <main>
      <head>
        <meta name="viewport" content="width=device-width" />
      </head>
      <Page {...pageProps} />
    </main>
  );
};

export default App;
