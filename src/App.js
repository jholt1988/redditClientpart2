import { Home } from "./features/Home/Home";
import Subreddits from "./features/SubReddit/Subreddit";
import "./styles.css";

export default function App() {
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
