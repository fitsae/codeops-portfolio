// src/components/DishModal.jsx
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { useCartStore, selectAddItem } from "../store/cartStore";

function DishModal({ dish, onClose }) {
  const addItem = useCartStore(selectAddItem);

  const closeBtnRef = useRef(null);
  const previouslyFocused = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    // remember what had focus before we stole it
    previouslyFocused.current = document.activeElement;

    // move focus into the dialog
    closeBtnRef.current?.focus();

    // lock background scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(e) {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      // Minimal focus trap — cycle through focusables inside the dialog.
      const focusables = dialogRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      // hand focus back to the element that opened the modal
      previouslyFocused.current?.focus?.();
    };
  }, [onClose]);

  return createPortal(
    <div
      className="modal-backdrop"
      onMouseDown={(e) => {
        // only close if the press started on the backdrop itself
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dish-modal-title"
      >
        <button
          ref={closeBtnRef}
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          ×
        </button>

        <h2 id="dish-modal-title">{dish.name}</h2>
        <p className="modal__meta">
          {dish.category} · {dish.price} ETB
        </p>

        {dish.spicy && <span className="spicy-badge">🌶️ Spicy</span>}

        <p className="modal__desc">
          A house favourite. Add it to your order and pay with TeleBirr at
          checkout.
        </p>

        <div className="modal__actions">
          <button
            type="button"
            onClick={() => {
              addItem(dish);
              onClose();
            }}
          >
            Add {dish.price} ETB to cart
          </button>
        </div>
      </div>
    </div>,
    document.body, // ← portal target: escapes every stacking context
  );
}

DishModal.propTypes = {
  dish: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DishModal;
