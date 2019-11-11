import React from "react";
import useDebounce from "./useDebounce";
import TextField from "@material-ui/core/TextField";

import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResult, setSearchResult] = React.useState([]);
  const searchThisText = useDebounce(searchTerm, 500);

  const search = async term => {
    if (term.length > 0) {
      const response = await fetch(`http://localhost:8000/search/${term}`);
      const jsonResp = await response.json();
      setSearchResult(jsonResp);
    } else {
      setSearchResult([]);
    }
  };
  React.useEffect(() => {
    const lastword = searchThisText.split(/[ ,.]+/).pop();
    search(lastword.trim());
  }, [searchThisText]);
  // return (
  //   <div className="App">
  //     <textarea
  //       name="text-input"
  //       className="text-input"
  //       onChange={e => setSearchTerm(e.target.value)}
  //     ></textarea>
  //   </div>
  // );

  return (
    <div className="App">
      <div style={{ width: 300 }}>
        <TextField
          label="Search input"
          margin="normal"
          variant="outlined"
          fullWidth
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      <div style={{ width: 300 }}>
        Suggestions
        <div style={{ textAlign: "left" }}>
          <ol>
            {searchResult.map(result => {
              return <li key={result}>{result}</li>;
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default App;
