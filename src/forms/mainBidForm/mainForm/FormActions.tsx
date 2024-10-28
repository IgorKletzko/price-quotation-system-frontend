import { SeparatorUrls } from "@/config/separatorUrls";


const FormActions: React.FC<{
  addHotel: () => void;
  addTransfer: () => void;
  addFlight: () => void;
  addImageComponent: () => void;
  selectedImageUrl: string;
  setSelectedImageUrl: React.Dispatch<React.SetStateAction<string>>;
}> = ({
  addHotel,
  addTransfer,
  addFlight,
  addImageComponent,
  setSelectedImageUrl,
  selectedImageUrl,
}) => {


  
  return (
    <div className="flex flex-col gap-2 mt-12">
      <button
        type="button"
        onClick={addHotel}
        className="bg-blue-300 rounded hover:bg-blue-500 p-2"
      >
        הוסף רכיב מלון
      </button>
      <button
        type="button"
        onClick={addTransfer}
        className="bg-rose-300 rounded hover:bg-rose-500 p-2"
      >
        הוסף רכיב הסעה
      </button>
      <button
        type="button"
        onClick={addFlight}
        className="bg-green-300 rounded hover:bg-green-500 p-2"
      >
        הוסף רכיב טיסה
      </button>

      <div className="bg-purple-300 rounded">
        <div className="flex justify-center">
          
          {/* <div className="flex flex-col-reverse md:flex-row">
            <div className="flex flex-row-reverse justify-start items-center gap-2">
              <Controller
                name="end"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => {
                      field.onChange(date);
                    }}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="עד התאריך"
                    className="border border-black p-1 text-center w-full"
                  />
                )}
              />
            </div>
            <p>_</p>
            <div className="flex flex-row-reverse justify-start items-center gap-2">
              <Controller
                name="start"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => {
                      field.onChange(date);
                    }}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="מהתאריך"
                    className="border border-black p-1 text-center w-full"
                  />
                )}
              />
            </div>
          </div> */}

          <button
            type="button"
            onClick={addImageComponent}
            className="bg-purple-400 rounded hover:bg-purple-500 p-2 sm:px-36"
          >
            הוסף רכיב תמונה
          </button>
          <select
            className="border border-black text-center rounded"
            value={selectedImageUrl}
            onChange={(e) => setSelectedImageUrl(e.target.value)}
          >
            {SeparatorUrls.map((image, index) => (
              <option key={index} value={image.url}>
                {image.description}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FormActions;
