import { ReactNode, createContext } from "react";
import { createContextualCan } from "@casl/react";
import { AppAbility, createAbility } from "../../auth/ability";
import { useAuth } from "../../queries/Auth";

const initialAbility = createAbility([]);

export const AbilityContext = createContext<AppAbility>(initialAbility);

export const Can = createContextualCan(AbilityContext.Consumer);

interface Props {
  children?: ReactNode;
}
export const AbilityProvider = ({ children }: Props) => {
  const query = useAuth();

  const ability = query.isSuccess ? query.data.ability : initialAbility;

  return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>;
};
