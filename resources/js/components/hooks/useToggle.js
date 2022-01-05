import { useState } from "react"

function useToggle (initialState = true) {
  const [visible, setVisible] = useState(initialState);




  return [visible, () => setVisible(prevVisible => !prevVisible)];
}

export default useToggle