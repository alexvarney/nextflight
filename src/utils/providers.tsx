import {
  BboxAiportsContext,
  _useBboxAirports,
} from "~/hooks/use-bbox-airports";
import { RoutesContext, _useRoutes } from "~/hooks/use-route";

export const Providers = (props: { children: React.ReactNode }) => {
  const routes = _useRoutes();
  const bboxAiports = _useBboxAirports();

  return (
    <RoutesContext.Provider value={routes}>
      <BboxAiportsContext.Provider value={bboxAiports}>
        {props.children}
      </BboxAiportsContext.Provider>
    </RoutesContext.Provider>
  );
};
