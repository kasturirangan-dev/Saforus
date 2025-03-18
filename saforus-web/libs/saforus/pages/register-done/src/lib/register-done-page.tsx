import RegisterDoneContainer from "@web-workspace/saforus/containers/register-done";
import { useLocation } from "react-router-dom";

export function SaforusRegisterDonePage() {
  const { state } = useLocation();
  const { email } = state || {};

  return <RegisterDoneContainer email={email} />;
}

export default SaforusRegisterDonePage;
