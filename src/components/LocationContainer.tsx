import { fetchUserLocation } from "../redux/features/locationSlice";

import React, { ReactNode } from "react";
import { useAppDispatch } from "../redux/store";

interface LocationContainerProps {
  children: ReactNode; // ReactNode represents any valid React children
}

const LocationContainer: React.FC<LocationContainerProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  //@ts-expect-error
  dispatch(fetchUserLocation());

  return <>{children}</>;
};

export default LocationContainer;
