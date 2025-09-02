import { IRoute } from "@/models/Route";
import { ITripPopulated, Trip } from "@/models/Trip";
import routeService from "./routeService";
import { connectDB } from "@/lib/db";
import { endOfDay, startOfDay } from "date-fns";
import "@/models/Bus";
import "@/models/Route";

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
      console.log("Trip is here");
      const start = startOfDay(selectedDate);
      const end = endOfDay(selectedDate);
      const route: IRoute = await routeService.getRoute(origin, destination);
      if (!route) return;
      const filter = {
        route: route._id,
        departureAt: { $gte: start, $lte: end },
      };
      const trips: ITripPopulated[] = await Trip.find(filter).populate("bus").populate("route");
      return trips;
    } catch (error: Error | unknown) {
      console.log(error);
    }
  },
};

export default tripService;
