import React, { useEffect, useState, useRef } from "react";

import {
  getTransactionValues,
  getTransactions,
  importTransactions,
} from "../../redux/slices/transactionSlice";
import { Button, Message } from "semantic-ui-react";

import { useDispatch, useSelector } from "react-redux";
import { toastMessage } from "../../lib/common-helper";
import CollapsibleSection from "../Collapsible/Collapsible";

const ExportButton = ({ transactionList }) => {
  const handleExport = async () => {
    try {
      if (!transactionList || transactionList.length === 0) {
        toastMessage("No transactions to export.", "error");
        // console.error("No transactions to export.");
        return;
      }

      const filename = "transactions.json";
      const blob = new Blob([JSON.stringify(transactionList)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting transactions:", error);
    }
  };

  return (
    <React.Fragment>
      <Button
        content="Export JSON File"
        icon="file text"
        onClick={handleExport}
      />
    </React.Fragment>
  );
};

const ImportButton = ({ transactionList }) => {
  const dispatch = useDispatch();
  const [selectedFileName, setSelectedFileName] = useState(""); // State to hold the selected file name

  const handleOpenFile = async () => {
    console.log("Handling Import ...");
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    console.log("FILLLELEEE", file);
    if (file) {
      console.log(typeof file);
      setSelectedFileName(file.name);
      try {
        const { payload } = await dispatch(
          importTransactions({ params: { file: file } })
        );
        if (payload.message) {
          toastMessage(`${payload.message}`, "success");
        }
      } catch (error) {
        console.error("Error importing transactions:", error);
      }
    }
  };

  const handleOpenFileAndChange = async () => {
    handleOpenFile();
    fileInputRef.current.click();
  };

  const fileInputRef = useRef();

  return (
    <div className="mt-dataImport">
      <p>Import transactions from a CSV file.</p>

      <React.Fragment>
        <Button
          content="Open File"
          icon="file text"
          onClick={handleOpenFileAndChange}
        />
        <input
          type="file"
          accept="text/csv"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {selectedFileName && <p> {selectedFileName}</p>}
      </React.Fragment>
    </div>
  );
};

const UserImport = () => {
  const dispatch = useDispatch();
  const { transactionList } = useSelector(getTransactionValues);

  const initialMasters = async () => {
    await dispatch(getTransactions());
  };
  useEffect(() => {
    initialMasters();
  }, []);
  return (
    <>
      <CollapsibleSection name="import" label="Data Import">
        <ImportButton />
      </CollapsibleSection>
      <CollapsibleSection name="export" label = "Data Export">
        <ExportButton transactionList={transactionList} />
      </CollapsibleSection>
    </>
  );
};

export default UserImport;
