
import React, { useEffect, useState } from "react";


interface ChildProps {
  triggerDataSend: boolean; // This prop triggers the sending of data
  sendDataToParent: (data: number[]) => void; // Function to send data back to the parent
}

const Child: React.FC<ChildProps> = ({ triggerDataSend, sendDataToParent }) => {
  useEffect(() => {
    if (triggerDataSend) {
      // When the trigger prop is true, send data to the parent
      sendDataToParent([1, 2, 3, 4, 5]);
    }
  }, [triggerDataSend, sendDataToParent]);

  return <h2>Child Component</h2>;
};







const Parent: React.FC = () => {
  const [triggerDataSend, setTriggerDataSend] = useState(false);
  const [childData, setChildData] = useState<number[]>([]);

  const handleFetchDataFromChild = () => {
    setTriggerDataSend(true); // Trigger the child to send data
  };

  const receiveDataFromChild = (data: number[]) => {
    setChildData(data);
    setTriggerDataSend(false); // Reset the trigger
    console.log("Data received from child:", data);
  };

  return (
    <div>
      <h1>Parent Component</h1>
      <Child
        triggerDataSend={triggerDataSend}
        sendDataToParent={receiveDataFromChild}
      />
      <button onClick={handleFetchDataFromChild}>Fetch Data from Child</button>
      <p>Data from child: {childData.join(", ")}</p>
    </div>
  );
};





// function App() {
//   const [dataFromChild, setDataFromChild] = useState('');

//   // Function to handle data from child
//   const handleDataFromChild = (data) => {
//     setDataFromChild(data);
//   };

//   return (
//     <div>
//       <h1>Data from Child: {dataFromChild}</h1>
//       <ChildComponent onData={handleDataFromChild} />
//     </div>
//   );
// }



// import React, { useState } from 'react';

// function ChildComponent({ onData }) {
//   const handleClick = () => {
//     const data = 'Hello from Child';
//     onData(data); // Passing data to parent
//   };

//   return (
//     <div>
//       <button onClick={handleClick}>Send Data to Parent</button>
//     </div>
//   );
// }

