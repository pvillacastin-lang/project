import { createBrowserRouter } from "react-router";
import Root from "./components/Root";
import Onboarding from "./components/Onboarding";
import VibeCheck from "./components/VibeCheck";
import Dashboard from "./components/Dashboard";
import BreathingSession from "./components/BreathingSession";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
  },
  {
    path: "/onboarding",
    Component: Onboarding,
  },
  {
    path: "/vibe-check",
    Component: VibeCheck,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/breathing/:technique",
    Component: BreathingSession,
  },
]);
