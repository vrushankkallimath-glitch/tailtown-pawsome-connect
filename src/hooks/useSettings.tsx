import { useState, useEffect, createContext, useContext, ReactNode } from "react";

interface SettingsContextType {
  notifications: boolean;
  locationSharing: boolean;
  setNotifications: (value: boolean) => void;
  setLocationSharing: (value: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotificationsState] = useState(() => {
    const saved = localStorage.getItem("tailtown-notifications");
    return saved !== null ? saved === "true" : true;
  });

  const [locationSharing, setLocationSharingState] = useState(() => {
    const saved = localStorage.getItem("tailtown-location-sharing");
    return saved !== null ? saved === "true" : true;
  });

  const setNotifications = (value: boolean) => {
    setNotificationsState(value);
    localStorage.setItem("tailtown-notifications", String(value));
  };

  const setLocationSharing = (value: boolean) => {
    setLocationSharingState(value);
    localStorage.setItem("tailtown-location-sharing", String(value));
  };

  return (
    <SettingsContext.Provider
      value={{
        notifications,
        locationSharing,
        setNotifications,
        setLocationSharing,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
