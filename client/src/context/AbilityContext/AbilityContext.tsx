import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { createContextualCan } from "@casl/react";
import { AppAbility, createAbility } from "../../auth/ability";
import { AuthContext } from "../AuthContext";

const initialAbility = createAbility([]);

export const AbilityContext = createContext<AppAbility>(initialAbility);

export const Can = createContextualCan(AbilityContext.Consumer);

interface Props {
  children?: ReactNode;
}
export const AbilityProvider = ({ children }: Props) => {
  const { user } = useContext(AuthContext);
  const [ability, setAbility] = useState<AppAbility>(initialAbility);

  useEffect(() => {
    setAbility(createAbility(user?.full_role.permissions || []));
  }, [user]);

  return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>;
};
