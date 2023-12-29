import { RoutesContext, _useRoutes } from "~/hooks/use-route";

export const Providers = (props: { children: React.ReactNode }) => {
  const routes = _useRoutes();

  return (
    <RoutesContext.Provider value={routes}>
      {props.children}
    </RoutesContext.Provider>
  );
};
