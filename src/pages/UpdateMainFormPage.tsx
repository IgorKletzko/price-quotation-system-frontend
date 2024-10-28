import MainBidForm_Update from "@/forms/UpdateMainForm/MainForm_update/MainForm_update";
import { useLocation } from "react-router-dom";

const UpdateMainFormPage = () => {
     const location = useLocation();
    const form = location.state?.mainForm;

    return (
      <div>
        <MainBidForm_Update formToUpdate={form}/>
      </div>
  )
}

export default UpdateMainFormPage