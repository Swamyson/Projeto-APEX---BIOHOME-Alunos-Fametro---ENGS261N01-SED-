import { createBrowserRouter } from "react-router";
import { SplashScreen } from "./screens/SplashScreen";
import { WelcomeScreen } from "./screens/WelcomeScreen";
import { RegisterScreen } from "./screens/RegisterScreen";
import { DashboardScreen } from "./screens/DashboardScreen";
import { QuestionnaireScreen } from "./screens/QuestionnaireScreen";
import { ResultsScreen } from "./screens/ResultsScreen";
import { PlantsScreen } from "./screens/PlantsScreen";
import { PlantDetailScreen } from "./screens/PlantDetailScreen";
import { SettingsScreen } from "./screens/SettingsScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SplashScreen,
  },
  {
    path: "/welcome",
    Component: WelcomeScreen,
  },
  {
    path: "/register",
    Component: RegisterScreen,
  },
  {
    path: "/dashboard",
    Component: DashboardScreen,
  },
  {
    path: "/questionnaire/:roomId",
    Component: QuestionnaireScreen,
  },
  {
    path: "/results/:roomId",
    Component: ResultsScreen,
  },
  {
    path: "/plants",
    Component: PlantsScreen,
  },
  {
    path: "/settings",
    Component: SettingsScreen,
  },
  {
    path: "/plant/:plantId",
    Component: PlantDetailScreen,
  },
]);
