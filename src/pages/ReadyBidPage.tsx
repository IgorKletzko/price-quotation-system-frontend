import { useEffect, useState } from "react";
import { useDeleteForm, useGetMainBidForms } from "@/api/MainFormApi";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { dateFormat } from "@/config/utils";
import RemoveButton from "@/components/RemoveButton";
import ConfirmationModalForMainFormDelete from "@/components/ConfirmationModalForMainFormDelete";
import Loader from "@/components/loader/Loader";

const ReadyBidPage = () => {
  const { data: initialData, refetch } = useGetMainBidForms();
  const [data, setData] = useState(initialData || []);

  // Default sort settings
  const [sortCriteria, setSortCriteria] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  // Bid approval filter state, default to "no"
  const [isBidApprovedFilter, setIsBidApprovedFilter] = useState<
    "all" | "yes" | "no"
  >("no");

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedForm, setSelectedForm] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const { deleteForm } = useDeleteForm();

  const handleDeleteForm = (id: string, formName: string) => {
    setSelectedForm({ id, name: formName });
    setShowModal(true);
  };

  const confirmDeleteForm = () => {
    if (selectedForm) {
      deleteForm(selectedForm.id);
      setData((prevData) =>
        prevData.filter((form) => form._id !== selectedForm.id)
      );
      refetch();
      setSelectedForm(null);
    }
    setShowModal(false);
  };

  useEffect(() => {
    setData(initialData || []);
  }, [initialData]);

  if (!data || !data.length) {
    return (
      <div className="flex justify-center mt-52">
        <Loader />
      </div>
    );
  }

  // Filter data by isBidApproved based on user selection
  const filteredData = data.filter((form) => {
    if (isBidApprovedFilter === "yes") return form.isBidApproved === true;
    if (isBidApprovedFilter === "no") return form.isBidApproved === false;
    return true; // If "all" is selected, return all forms
  });

  // Sort the filtered data
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortCriteria === "name") {
      return sortDirection === "asc"
        ? a.formName.localeCompare(b.formName)
        : b.formName.localeCompare(a.formName);
    } else if (sortCriteria === "createDate") {
      const dateA = new Date(a.createDate).getTime();
      const dateB = new Date(b.createDate).getTime();
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    }
    return 0;
  });

  return (
    <div dir="rtl" className="container mx-auto">
      <div className="flex gap-4 mb-4">
        <p>להציג תוצאות:</p>
        <select
          id="isBidApprovedFilter"
          value={isBidApprovedFilter}
          onChange={(e) =>
            setIsBidApprovedFilter(e.target.value as "all" | "yes" | "no")
          }
          className="border border-black text-center"
        >
          <option value="all">הכל</option>
          <option value="yes">מאושר</option>
          <option value="no">לא מאושר</option>
        </select>
      </div>
      <div className="flex gap-4 mb-4">
        <p>מיון לפי:</p>
        <select
          id="sortBy"
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
          className="border border-black text-center"
        >
          <option value="name">שם</option>
          <option value="createDate">תאריך הוספה</option>
        </select>

        <select
          id="sortDirection"
          value={sortDirection}
          onChange={(e) => setSortDirection(e.target.value)}
          className="border border-black"
        >
          <option value="asc">סדר עולה</option>
          <option value="desc">סדר יורד</option>
        </select>
      </div>

      <ul>
        {sortedData.map((form) => (
          <li key={form._id} className="space-y-2">
            <div className="flex justify-between mt-2 hover:text-blue-400">
              <Link to={`/form/${form.formName}`}>{form.formName}</Link>
              <div className="flex gap-12">
                <Link to={`/form/${form.formName}`}>
                  {dateFormat(form.createDate)}
                </Link>
                <RemoveButton
                  onRemove={() => handleDeleteForm(form._id, form.formName)}
                  text="מחק הצעה"
                ></RemoveButton>
              </div>
            </div>
            <Separator className="bg-gray-300" />
          </li>
        ))}
      </ul>

      {selectedForm && (
        <ConfirmationModalForMainFormDelete
          show={showModal}
          onConfirm={confirmDeleteForm}
          onCancel={() => setShowModal(false)}
          formName={selectedForm.name} // Pass the form name to the modal
        />
      )}
    </div>
  );
};

export default ReadyBidPage;
