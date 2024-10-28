import React from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { FieldArrayWithId } from "react-hook-form";
import SortableItem_update from "./SortableItem_update";
import HotelCard_Update from "../HotelCard_update";
import TransferCard_Update from "../TransferCard_update";
import FlightCard_Update from "../FlightCard_update";
import ImageSeparator_Update from "../ImageSeparatorCard_update";
import { FormFields, Hotel, Room } from "@/types/types";

const SortableList_Update: React.FC<{
  fields: FieldArrayWithId<FormFields, "items", "id">[];
  sortedFormToUpdate: FormFields;
  move: (from: number, to: number) => void;
  handleHotelRemove: (index: number) => void;
  handleHotelDataChange: (
    index: number,
    data: { selectedHotel: Hotel | null; selectedRooms: Room[] }
  ) => void;
  remove: (index: number) => void;
  control: any;
}> = ({
  fields,
  move,
  handleHotelRemove,
  handleHotelDataChange,
  remove,
  sortedFormToUpdate,
}) => {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);
      move(oldIndex, newIndex);
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext
        items={fields.map((field) => field.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {fields.map((field, index) => (
            <SortableItem_update key={field.id} id={field.id}>
              {field.type === "hotel" ? (
                <HotelCard_Update
                  id={field.id}
                  index={index}
                  onRemove={() => handleHotelRemove(index)}
                  onDataChange={handleHotelDataChange}
                  initialSelectedHotel={
                    sortedFormToUpdate.items[index]?.type === "hotel"
                      ? (sortedFormToUpdate.items[index] as Hotel)
                      : null
                  }
                  initialSelectedRooms={
                    sortedFormToUpdate.items[index]?.type === "hotel"
                      ? (sortedFormToUpdate.items[index] as Hotel).rooms
                      : []
                  }
                />
              ) : field.type === "transfer" ? (
                <TransferCard_Update
                  id={field.id}
                  index={index}
                  onRemove={() => remove(index)}
                />
              ) : field.type === "flight" ? (
                <FlightCard_Update
                  id={field.id}
                  index={index}
                  onRemove={() => remove(index)}
                />
              ) : (
                <ImageSeparator_Update
                  id={field.id}
                  index={index}
                  imageUrl={field.imageUrl}
                  imageText={field.description}
                  onRemove={remove}
                />
              )}
            </SortableItem_update>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default SortableList_Update;
