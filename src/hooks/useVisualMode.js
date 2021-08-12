import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    setHistory(prev => replace ? [...prev.slice(0, prev.length - 1), mode] : [...prev, mode]
    )
  }
  function back() {
    if (history.length < 2) {
      return;
    }
    setHistory(prev => [...prev.slice(0, prev.length - 1)])
  }
  return { mode: history[history.length - 1], transition, back };
}

// --

// import React from "react";
// import { renderHook, act } from "@testing-library/react-hooks";

// export default function useVisualMode(initial) {
//   const [mode, setMode] = useState(initial);
//   const [history, setHistory] = useState([initial]);

//   function transition(mode, replace = false) {
//     function useCustomHook() {
//       function action() {
//         function back(mode, replace = false) {
//           function history() {
//           }
//         }
//       } return { action };
//     }
//   }

//   return { mode, transition, back, history };

// }