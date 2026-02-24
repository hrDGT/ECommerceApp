import { createPortal } from "react-dom";

import styles from "./ModalWrapper.module.css";

export function ModalWrapper({
  setIsOpen,
  children,
}: {
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
}) {
  return createPortal(
    <div
      className={styles.modalWrapper}
      onClick={() => setIsOpen(false)}
    >
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
        aria-modal="true"
        aria-label="Product details"
      >
        <button
          className={styles.closeButton}
          onClick={() => setIsOpen(false)}
          aria-label="Close modal"
        >
          ✕
        </button>

        {children}
      </div>
    </div>,
    document.body
  );
}
