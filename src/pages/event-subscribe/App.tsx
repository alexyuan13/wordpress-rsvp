import { useEffect, useState } from "react";
import EventSubscribeModal from "./EventSubscribeModal";

export default function App() {
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    const handleOnOpenModal = () => {
      setOpenModal(true);
    };

    const keepMePostedButton = document.getElementById("keep-me-posted");
    keepMePostedButton?.addEventListener("click", handleOnOpenModal);
    return () => {
      keepMePostedButton?.removeEventListener("click", handleOnOpenModal);
    };
  }, []);

  const handleOnCloseModal = () => {
    setOpenModal(false);
  };

  return openModal && <EventSubscribeModal onClose={handleOnCloseModal} />;
}
