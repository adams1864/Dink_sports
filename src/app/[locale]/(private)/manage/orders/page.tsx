"use client";

import { useEffect, useState } from "react";
import { getOrders, type Order } from "@/lib/api";
import { Entity } from "./_components/Entity";

type TableOrder = {
  id: string;
  orderId: string;
  customerName: string;
  email: string;
  amount: number;
  status: Order["status"];
  date: string;
};

function mapOrderToRow(order: Order): TableOrder {
  return {
    id: String(order.id),
    orderId: order.orderNumber || `ORD-${order.id}`,
    customerName: order.customerName,
    email: order.customerEmail,
    amount: order.total,
    status: order.status,
    date: order.createdAt ?? "",
  };
}

export default function OrdersPage() {
  const [rows, setRows] = useState<TableOrder[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await getOrders();
        if (cancelled) return;
        setRows(data.map(mapOrderToRow));
      } catch (error) {
        console.error("Failed to load orders", error);
        if (!cancelled) setRows([]);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return <Entity data={rows} total={rows.length} />;
}
