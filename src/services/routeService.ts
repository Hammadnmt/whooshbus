import { Route } from "@/models/Route";

const routeService = {
  getRoute: async (origin: string, destination: string) => {
    try {
      const filter = {
        originStation: origin,
        destinationStation: destination,
      };
      console.log(origin, destination);
      const route = await Route.findOne(filter);
      console.log("Route is here in service", route);
      if (!route) {
        return null;
      }
      return route;
    } catch (error: Error | unknown) {
      throw new Error("Failed to get route", {
        cause: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
};

export default routeService;
