import { useState } from "react";

import { Header } from "./Header";
import PokemonView from "./PokemonView";
import { Sidebar } from "./Sidebar";

import "../scss/app.scss";

function App() {
  const [searchTerm, setSearchTerm] = useState("placeholder");

  const initializeSearch = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  return (
    <div className="all-content">
      <Header newSearchTerm={initializeSearch} />
      <div className="main-content">
        {/* <Sidebar />*/}
        <PokemonView searchTerm={searchTerm} />
      </div>
    </div>
  );
}

export default App;
