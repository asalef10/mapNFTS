import { Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import MapsView from "../component/pages/mapsView/mapsView.js";
import Game from "../component/pages/gameSnake/SnakeGame";
const AppRouter = () => {
  const [isCanBuy, setIsCanBuy] = useState(false);
  
  return (
    <>
      <Switch>
        <Route exact path="/">
          <MapsView isCanBuy={isCanBuy} setIsCanBuy={setIsCanBuy} />
        </Route>
        <Route exact path="/game">
          <Game isCanBuy={isCanBuy} setIsCanBuy={setIsCanBuy} />
        </Route>
      </Switch>
      ;
    </>
  );
};
export default AppRouter;
