import React from "react";

const Modal = () => {
  const category = encodeURIComponent("Sách")
  return(
    <div className="w-full relative">
      <p> {category} </p>
    </div>
  )
}
export default Modal;