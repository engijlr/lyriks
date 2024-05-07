import { useDispatch } from "react-redux";
import { fetchUserLocation } from "../redux/features/locationSlice";

import React, { ReactNode } from "react";

interface LocationContainerProps {
  children: ReactNode; // ReactNode represents any valid React children
}

const LocationContainer: React.FC<LocationContainerProps> = ({ children }) => {
  const dispatch = useDispatch();
  // @ts-expect-error
  dispatch(fetchUserLocation());

  return <>{children}</>;
};

export default LocationContainer;
