import {
  BrowserRouter,
  Link,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Heroes from "./components/Heroes";
import RTKHeroes from "./components/RTKHeroes";
import Home from "./components/Home";
import { QueryClient, QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryDevtools } from "react-query/devtools";
import RTKCustomHookHeroes from "./components/RTKCustomHookHeroes";
import RTKHeroDetail from "./components/RTKHeroDetail";
import DynamicParallel from "./components/DynamicParallel";
import DependentQuery from "./components/DependentQuery";
import PaginatedQuery from "./components/PaginatedQuery";
import InfiniteQuery from "./components/InfiniteQuery";
import AddHero from "./components/AddHero";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/heroes">Heroes</Link>
            </li>
            <li>
              <Link to="/rtk-heroes">RTK Heroes</Link>
            </li>
            <li>
              <Link to="/rtk-custom-heroes">RTK Custom Heroes</Link>
            </li>
            <li>
              <Link to="/dynamic-parallel">Dynamic Parallel</Link>
            </li>
            <li>
              <Link to="/dependent-query">Dependent Query</Link>
            </li>
            <li>
              <Link to="/paginated-query">Paginated Query</Link>
            </li>
            <li>
              <Link to="/infinite-query">Infinite Query</Link>
            </li>
            <li>
              <Link to="/add-hero">Add Hero</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/heroes" element={<Heroes />} />
          <Route path="/rtk-heroes" element={<RTKHeroes />} />
          <Route path="/rtk-custom-heroes" element={<RTKCustomHookHeroes />} />
          <Route path="/rtk-hero-detail/:heroId" element={<RTKHeroDetail />} />
          <Route
            path="/dynamic-parallel"
            element={<DynamicParallel heroIds={[1, 3]} />}
          />
          <Route
            path="/dependent-query"
            element={<DependentQuery email="admin@example.com" />}
          />
          <Route path="/paginated-query" element={<PaginatedQuery />} />
          <Route path="/infinite-query" element={<InfiniteQuery />} />
          <Route path="/add-hero" element={<AddHero />} />
        </Routes>
        {/* https://mega.nz/folder/1FxDwDpY#-HSMVR7WQsuyadkdWMP2jw */}
        {/* https://mega.nz/folder/1FxDwDpY#-HSMVR7WQsuyadkdWMP2jw */}
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </>
  );
}

export default App;
