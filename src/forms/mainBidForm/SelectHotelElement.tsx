// import React, { useEffect, useState } from "react";
// import { Check, ChevronsUpDown } from "lucide-react";
// import {
//   Command,
//   CommandEmpty,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "../../components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "../../components/ui/popover";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { useGetHotels } from "@/api/HotelsFormApi";
// import { Hotel } from "@/types/types";

// interface Props {
//   data: (hotelData: Hotel) => void;
// }

// const HotelDropdown: React.FC<Props> = ({ data }) => {
//   const [groupedHotels, setGroupedHotels] = useState<any>({});
//   const [selectedDestination, setSelectedDestination] = useState<string | null>(
//     null
//   );
//   const [selectedArea, setSelectedArea] = useState<string | null>(null);
//   const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
//   const [currentStep, setCurrentStep] = useState<
//     "destination" | "area" | "hotel"
//   >("destination");
//   const [open, setOpen] = useState(false);
//   const { hotels } = useGetHotels();

//   useEffect(() => {
//     if (hotels) {
//       // Group hotels by destination and area
//       const grouped = hotels.reduce((acc: any, hotel: Hotel) => {
//         if (!hotel.destination || !hotel.area) return acc; // Skip invalid data
//         if (!acc[hotel.destination]) acc[hotel.destination] = {};
//         if (!acc[hotel.destination][hotel.area])
//           acc[hotel.destination][hotel.area] = [];
//         acc[hotel.destination][hotel.area].push(hotel);
//         return acc;
//       }, {});

//       setGroupedHotels(grouped);
//     }
//   }, [hotels]);

//   useEffect(() => {
//     if (selectedHotel) data(selectedHotel);
//   }, [selectedHotel]);

//   const handleDestinationSelect = (destination: string) => {
//     setSelectedDestination(destination);
//     setCurrentStep("area");
//   };

//   const handleAreaSelect = (area: string) => {
//     setSelectedArea(area);
//     setCurrentStep("hotel");
//   };

//   const handleHotelSelect = (hotel: Hotel) => {
//     setSelectedHotel(hotel);
//     setOpen(false); // Close dropdown
//   };

//   const handleGoBack = () => {
//     if (currentStep === "hotel") {
//       setSelectedArea(null);
//       setCurrentStep("area");
//     } else if (currentStep === "area") {
//       setSelectedDestination(null);
//       setCurrentStep("destination");
//     }
//   };

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline"
//           role="combobox"
//           aria-expanded={open}
//           className="w-[300px] justify-between"
//         >
//           {selectedHotel?.hotelName ||
//             (selectedArea
//               ? `Select a hotel in ${selectedArea}`
//               : selectedDestination
//               ? `Select an area in ${selectedDestination}`
//               : "Select a destination...")}
//           <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-[300px] p-0">
//         <Command>
//           <CommandInput placeholder="Search..." />
//           <CommandList>
//             <CommandEmpty>No options found.</CommandEmpty>

//             {/* "Go Back" Button */}
//             {currentStep !== "destination" && (
//               <CommandItem onSelect={handleGoBack}>
//                 <Check className="mr-2 h-4 w-4 opacity-100" />
//                 Go Back
//               </CommandItem>
//             )}

//             {/* Destinations */}
//             {currentStep === "destination" &&
//               Object.keys(groupedHotels).map((destination) => (
//                 <CommandItem
//                   key={destination}
//                   value={destination}
//                   onSelect={() => handleDestinationSelect(destination)}
//                 >
//                   <Check
//                     className={cn(
//                       "mr-2 h-4 w-4",
//                       selectedDestination === destination
//                         ? "opacity-100"
//                         : "opacity-0"
//                     )}
//                   />
//                   {destination}
//                 </CommandItem>
//               ))}

//             {/* Areas */}
//             {currentStep === "area" &&
//               Object.keys(groupedHotels[selectedDestination!] || {}).map(
//                 (area) => (
//                   <CommandItem
//                     key={area}
//                     value={area}
//                     onSelect={() => handleAreaSelect(area)}
//                   >
//                     <Check
//                       className={cn(
//                         "mr-2 h-4 w-4",
//                         selectedArea === area ? "opacity-100" : "opacity-0"
//                       )}
//                     />
//                     {area}
//                   </CommandItem>
//                 )
//               )}

//             {/* Hotels */}
//             {currentStep === "hotel" &&
//               groupedHotels[selectedDestination!]?.[selectedArea!]?.map(
//                 (hotel: Hotel) => (
//                   <CommandItem
//                     key={hotel.id}
//                     value={hotel.hotelName}
//                     onSelect={() => handleHotelSelect(hotel)}
//                   >
//                     <Check
//                       className={cn(
//                         "mr-2 h-4 w-4",
//                         selectedHotel?.id === hotel.id
//                           ? "opacity-100"
//                           : "opacity-0"
//                       )}
//                     />
//                     {hotel.hotelName}
//                   </CommandItem>
//                 )
//               )}
//           </CommandList>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   );
// };

// export default HotelDropdown;


import React, { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGetHotels } from "@/api/HotelsFormApi";
import { Hotel } from "@/types/types";

interface Props {
  data: (hotelData: Hotel) => void;
}

const HotelDropdown: React.FC<Props> = ({ data }) => {
  const [groupedHotels, setGroupedHotels] = useState<any>({});
  const [selectedDestination, setSelectedDestination] = useState<string | null>(
    null
  );
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [currentStep, setCurrentStep] = useState<
    "destination" | "area" | "hotel"
  >("destination");
  const [open, setOpen] = useState(false);
  const { hotels } = useGetHotels();

  useEffect(() => {
    if (hotels) {
      // Group hotels by destination and area
      const grouped = hotels.reduce((acc: any, hotel: Hotel) => {
        if (!hotel.destination || !hotel.area) return acc; // Skip invalid data
        if (!acc[hotel.destination]) acc[hotel.destination] = {};
        if (!acc[hotel.destination][hotel.area])
          acc[hotel.destination][hotel.area] = [];
        acc[hotel.destination][hotel.area].push(hotel);
        return acc;
      }, {});

      setGroupedHotels(grouped);
    }
  }, [hotels]);

  useEffect(() => {
    if (selectedHotel) data(selectedHotel);
  }, [selectedHotel]);

  const handleDestinationSelect = (destination: string) => {
    setSelectedDestination(destination);
    setCurrentStep("area");
  };

  const handleAreaSelect = (area: string) => {
    setSelectedArea(area);
    setCurrentStep("hotel");
  };

  const handleHotelSelect = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setOpen(false); // Close dropdown
  };

  const handleGoBack = () => {
    if (currentStep === "hotel") {
      setSelectedArea(null);
      setCurrentStep("area");
    } else if (currentStep === "area") {
      setSelectedDestination(null);
      setCurrentStep("destination");
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {selectedHotel?.hotelName ||
            (selectedArea
              ? `Select a hotel in ${selectedArea}`
              : selectedDestination
              ? `Select an area in ${selectedDestination}`
              : "Select a destination...")}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>

            {/* "Go Back" Button */}
            {currentStep !== "destination" && (
              <CommandItem onSelect={handleGoBack} className="ml-20">
                חזרה
              </CommandItem>
            )}

            {/* Destinations */}
            {currentStep === "destination" &&
              Object.keys(groupedHotels).map((destination) => (
                <CommandItem
                  key={destination}
                  value={destination}
                  onSelect={() => handleDestinationSelect(destination)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedDestination === destination
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {destination}
                </CommandItem>
              ))}

            {/* Areas */}
            {currentStep === "area" &&
              Object.keys(groupedHotels[selectedDestination!] || {}).map(
                (area) => (
                  <CommandItem
                    key={area}
                    value={area}
                    onSelect={() => handleAreaSelect(area)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedArea === area ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {area}
                  </CommandItem>
                )
              )}

            {/* Hotels */}
            {currentStep === "hotel" &&
              groupedHotels[selectedDestination!]?.[selectedArea!]?.map(
                (hotel: Hotel) => (
                  <CommandItem
                    key={hotel.id}
                    value={hotel.hotelName}
                    onSelect={() => handleHotelSelect(hotel)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedHotel?.id === hotel.id
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {hotel.hotelName}
                  </CommandItem>
                )
              )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default HotelDropdown;
