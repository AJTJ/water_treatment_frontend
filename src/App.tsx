import React from "react";

function call(word: string) {
  console.log("hello " + word);
}

function App() {
  return (
    <div className="App">
      <div>memes</div>
      <button onClick={() => call("world")}>call</button>
    </div>
  );
}

export default App;
