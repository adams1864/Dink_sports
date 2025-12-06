"use client";

import { updateOrderStatus } from "@/lib/api";
import { Badge, Button, Group, Menu } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { notifications } from "@mantine/notifications";

const statusColor: Record<string, string> = {
  pending: "yellow",
  paid: "green",
  completed: "green",
  failed: "red",
  cancelled: "red",
  refunded: "gray",
};

interface OrderStatusMenuProps {
  orderId: number;
  currentStatus: string;
}

export function OrderStatusMenu({ orderId, currentStatus }: OrderStatusMenuProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    try {
      setLoading(true);
      await updateOrderStatus(orderId, newStatus);
      notifications.show({
        title: "Success",
        message: `Order status updated to ${newStatus}`,
        color: "green",
      });
      router.refresh();
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to update order status",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  // Define allowed transitions based on current status
  const canMarkAsPaid = currentStatus === "pending";
  const canMarkAsCompleted = currentStatus === "pending" || currentStatus === "paid";
  const canCancel = currentStatus === "pending" || currentStatus === "paid";
  const canRefund = currentStatus === "paid" || currentStatus === "completed";

  return (
    <Group gap="sm">
      <Badge size="lg" color={statusColor[currentStatus] ?? "blue"} variant="light">
        {currentStatus.toUpperCase()}
      </Badge>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button variant="light" rightSection={<IconChevronDown size={16} />} loading={loading}>
            Update Status
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Change Order Status</Menu.Label>
          {canMarkAsPaid && (
            <Menu.Item color="green" onClick={() => handleStatusChange("paid")}>
              Mark as Paid
            </Menu.Item>
          )}
          {canMarkAsCompleted && (
            <Menu.Item color="blue" onClick={() => handleStatusChange("completed")}>
              Mark as Completed
            </Menu.Item>
          )}
          {canCancel && (
            <Menu.Item color="red" onClick={() => handleStatusChange("cancelled")}>
              Cancel Order
            </Menu.Item>
          )}
          {canRefund && (
            <Menu.Item color="gray" onClick={() => handleStatusChange("refunded")}>
              Mark as Refunded
            </Menu.Item>
          )}
          {!canMarkAsPaid && !canMarkAsCompleted && !canCancel && !canRefund && (
            <Menu.Item disabled>No actions available</Menu.Item>
          )}
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
