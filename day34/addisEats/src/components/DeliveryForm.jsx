// in src/components/DeliveryForm.jsx — replace the success block
import { useNavigate } from "react-router-dom";

// inside component:
const navigate = useNavigate();

// on success:
const orderId = crypto.randomUUID();
sessionStorage.setItem(
  "last-order",
  JSON.stringify({
    id: orderId,
    customer: form,
    items,
    total,
    placedAt: new Date().toISOString(),
  }),
);
clear();
setForm(EMPTY_FORM);
setTouched({});
navigate(`/receipt/${orderId}`, { replace: true });
