import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { getTracing } from "./commonTracing";
import { useEffectMonkeyPatching} from "./automation";
useEffectMonkeyPatching();

export default  function Content() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);

   
  useEffect(() => {
    const tracer = getTracing("example-react-load", "reactload-: mounting");
    tracer.end();
    return () => {
      console.log(
        "Behavior right before the component is removed from the DOM."
      );
      const tracer = getTracing("example-react-load", "reactload-: unmounting");
      tracer.end();
    };
  }, []);



  const buttonHandler = (e) => {

    console.log("Button handler method called");
    setIsLoading(true);
    const randomDelay = Math.random() * 10000;
    const tracer = getTracing("example-react-load", "reactload: btnClick");

    fetchAPI()
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        tracer.end();
        setIsLoading(false);
        setResults(result);
      });
  };

  return (
    <div>
      <h1>React Plugin Demo App</h1>
      <Button
        className="m-3"
        onClick={buttonHandler}
        variant="primary"
        size="lg"
      >
        Make Request
      </Button>
      <div id="results" className="m-3">
        {isLoading && <div> Loading results...</div>}
        {results && <div>Username is: {results.username}</div>}
      </div>
    </div>
  );
}

function fetchAPI() {
  // param is a highlighted word from the user before it clicked the button
  console.log("================= trigger api=========");
  return fetch("http://hn.algolia.com/api/v1/users/pg");
}

