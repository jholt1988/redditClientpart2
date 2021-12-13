import Home  from "./features/Home/Home";
import Subreddits from "./features/SubReddit/Subreddit";
import "./App.css";

 function App() {
  return (
    <>
    <main>
      <Home/>
    </main>
    <aside>
      <Subreddits/>
    </aside>
    </>
  );
}

export default App