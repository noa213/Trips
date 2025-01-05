"use client";
import React, { useEffect, useState } from "react";
import { getTrip } from "@/app/services/trips";
import { ITrip } from "@/app/types/trip";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import AdminTripDetail from "./admin/TripDetails";
import UserTripDetail from "./user/TripDetails";

const Container = () => {
  const [trip, setTrip] = useState<ITrip>();
  const { data: session } = useSession();

  const router = useParams();
  const id = router.tripId;

  const tripId = Array.isArray(id) ? id[0] : id;
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await getTrip(tripId);
          setTrip(response);
        } catch (error) {
          console.error("Failed to fetch trip:", error);
        }
      };
      fetchData();
    }, [tripId]);
  
  return session?.user.name === trip?.adminNmame ? (
    <AdminTripDetail />
  ) : (
    <UserTripDetail />
  );
};

export default Container;
