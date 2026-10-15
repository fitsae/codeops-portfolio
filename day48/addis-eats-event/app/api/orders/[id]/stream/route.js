// app/api/orders/[id]/stream/route.js
import { demoOrder } from "@/lib/orders";

export const runtime = "nodejs";

const demoStatuses = ["Preparing", "Picked up", "On the way", "Delivered"];

export async function GET(request, { params }) {
  const { id } = await params;

  if (id !== demoOrder.id) {
    return Response.json({ error: "Order not found" }, { status: 404 });
  }

  const encoder = new TextEncoder();
  let index = Math.max(0, demoStatuses.indexOf(demoOrder.status));

  const stream = new ReadableStream({
    start(controller) {
      let closed = false;
      let timer;

      function send(data) {
        if (closed) return;
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      }

      function close() {
        if (closed) return;
        closed = true;
        clearInterval(timer);
        request.signal.removeEventListener("abort", close);
        try {
          controller.close();
        } catch {}
      }

      function sendStatus() {
        send({
          orderId: id,
          status: demoStatuses[index],
          updatedAt: new Date().toISOString(),
        });
        if (demoStatuses[index] === "Delivered") {
          close();
          return;
        }
        index += 1;
      }

      sendStatus();
      if (!closed) timer = setInterval(sendStatus, 5000);
      request.signal.addEventListener("abort", close, { once: true });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
