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
import SortableItem from "./SortableItem";
import { FieldArrayWithId } from "react-hook-form";
import HotelCard from "../HotelCard";
import TransferCard from "../TransferCard";
import FlightCard from "../FlightCard";
import { FormFields } from "@/types/types";
import ImageSeparatorCard from "../ImageSeparatorCard";



const SortableList: React.FC<{
  fields: FieldArrayWithId<FormFields, "items", "id">[];

  move: (from: number, to: number) => void;
  handleHotelRemove: (index: number) => void;
  handleHotelDataChange: (index: number, data: any) => void;
  remove: (index: number) => void;
}> = ({
  fields,
  move,
  handleHotelRemove,
  handleHotelDataChange,
  remove,
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
            <SortableItem key={field.id} id={field.id}>
              {field.type === "hotel" ? (
                <HotelCard
                  id={field.id}
                  index={index}
                  onRemove={() => handleHotelRemove(index)}
                  onDataChange={handleHotelDataChange}
                />
              ) : field.type === "transfer" ? (
                <TransferCard
                  id={field.id}
                  index={index}
                  onRemove={() => remove(index)}
                />
              ) : field.type === "flight" ? (
                <FlightCard
                  id={field.id}
                  index={index}
                  onRemove={() => remove(index)}
                />
              ) : (
                <ImageSeparatorCard
                  id={field.id}
                  index={index}
                  imageUrl={field.imageUrl}
                  imageText={field.description}
                  onRemove={remove}
                />
              )}
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default SortableList;

