import { useGetHotels } from "@/api/HotelsFormApi";
import { Hotel } from "@/types/types";
import React, { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
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


interface Props {
  data: (hotelData: Hotel) => void;
  hotelName: string | undefined;
  hotelsToUpdate: Hotel | null;
}

const HotelDropdown: React.FC<Props> = ({
  data,
  hotelName,
  hotelsToUpdate,
}) => {
  const [hotelsData, setHotelsData] = useState<Hotel[]>([]);
  // console.log("hotelsData", hotelsData);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(hotelsToUpdate);
  // console.log("selectedHotel", selectedHotel);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>("");

  const { hotels } = useGetHotels();

  useEffect(() => {
    if (selectedHotel) {
      data(selectedHotel);
    }
  }, [selectedHotel]);

  useEffect(() => {
    if (hotels) {
      setHotelsData(hotels);
    }
  }, [hotels]);

  const handleHotelSelect = (selectedValue: string) => {
    console.log(selectedValue)
    const selectedHotel = hotelsData.find(
      (hotel) => hotel.hotelName === selectedValue
    );
    setSelectedHotel(selectedHotel || null);
    setValue(selectedValue);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? hotelsData.find((hotel) => hotel.hotelName === value)?.hotelName
            : hotelName || "Select a hotel..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search hotel..." />
          <CommandList>
            <CommandEmpty>No hotel found.</CommandEmpty>
            <CommandGroup>
              {hotelsData.map((hotel) => (
                <CommandItem
                  key={hotel.hotelName}
                  value={hotel.hotelName}
                      onSelect={handleHotelSelect}
                      // defaultValue={hotelsToUpdate[index]?._id}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === hotel.hotelName ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {hotel.hotelName}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default HotelDropdown;


