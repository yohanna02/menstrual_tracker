import { createContext, useState } from "react";

type userType = { id: string; name: string; email: string };

type userContextType = {
  user: userType | null;
  setUser: React.Dispatch<React.SetStateAction<userType | null>>;
  bleedingDates: string[];
  setBleedingDates: React.Dispatch<React.SetStateAction<string[]>>;
  ovulationDates: string[];
  setOvulationDates: React.Dispatch<React.SetStateAction<string[]>>;
  fertileDates: string[];
  setFertileDates: React.Dispatch<React.SetStateAction<string[]>>;
  selectedFeelingIndex: number;
  setSelectedFeelingIndex: React.Dispatch<React.SetStateAction<number>>;
};

export const userContext = createContext<userContextType>({
  user: null,
  setUser: (): userType | null => null,
  bleedingDates: [],
  setBleedingDates: () => [],
  ovulationDates: [],
  setOvulationDates: () => [],
  fertileDates: [],
  setFertileDates: () => [],
  selectedFeelingIndex: -1,
  setSelectedFeelingIndex: () => -1,
});

const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<userType | null>(null);
  const [bleedingDates, setBleedingDates] = useState<string[]>([]);
  const [ovulationDates, setOvulationDates] = useState<string[]>([]);
  const [fertileDates, setFertileDates] = useState<string[]>([]);
  const [selectedFeelingIndex, setSelectedFeelingIndex] = useState<number>(-1);

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        bleedingDates,
        setBleedingDates,
        ovulationDates,
        setOvulationDates,
        fertileDates,
        setFertileDates,
        selectedFeelingIndex,
        setSelectedFeelingIndex
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
