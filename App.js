import { createStackNavigator, createAppContainer } from "react-navigation";
import Main from "./components/Main";
import AccelerometerScreen from "./components/Accelerometer";

const Root = createStackNavigator({
  Main: { screen: Main },
  AccelerometerScreen: { screen: AccelerometerScreen }
});

const App = createAppContainer(Root);

export default App;
