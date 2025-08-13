import { Routes, Route } from "react-router-dom";
import routes from "./routes/AppRoutes";

function App() {
  return (
    <Routes>
      {routes.map(({ path, element }, i) => (
        <Route key={i} path={path} element={element} />
      ))}
    </Routes>
  );
}
export default App;
