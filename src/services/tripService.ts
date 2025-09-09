import { IRoute } from "@/models/Route";
import { ITripPopulated, Trip } from "@/models/Trip";
import routeService from "./routeService";
import { endOfDay, startOfDay } from "date-fns";
import "@/models/Bus";
import "@/models/Route";
import { connectDB } from "@/lib/db";

const tripService = {
  searchTrips: async ({
    origin,
    destination,
    selectedDate,
  }: {
    origin: string;
    destination: string;
    selectedDate: Date;
  }) => {
    try {
      await connectDB();
      const start = startOfDay(selectedDate);
      const end = endOfDay(selectedDate);
      const route: IRoute = await routeService.getRoute(origin, destination);
      const filter = {
        route: route._id,
        departureAt: { $gte: start, $lte: end },
      };
      const trips: ITripPopulated[] = await Trip.find(filter).populate("bus").populate("route");
      console.log("Route is here in Trip service", route);
      return trips;
    } catch (error: Error | unknown) {
      console.log(error);
    }
  },
  getTripById: async (id: string) => {
    try {
      const trip: ITripPopulated = await Trip.findById(id).populate("bus").populate("route");
      return trip;
    } catch (error) {
      console.log("error", error);
    }
  },
};

export default tripService;
