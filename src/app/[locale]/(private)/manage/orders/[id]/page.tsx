import { getOrder, type Order } from "@/lib/api";
import {
  Box,
  Card,
  Group,
  SimpleGrid,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { IconCurrencyDollar, IconPackage, IconShoppingBag } from "@tabler/icons-react";
import { OrderStatusMenu } from "@/components/OrderStatusMenu";

const statusColor: Record<string, string> = {
  pending: "yellow",
  paid: "green",
  completed: "green",
  failed: "red",
  cancelled: "red",
  refunded: "gray",
};

function formatMoney(amount: number) {
  return amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function computeSubtotal(items: NonNullable<Order["items"]>) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id } = await params;

  let order: Order | null = null;
  try {
    order = await getOrder(id);
  } catch (error) {
    order = null;
  }

  if (!order) {
    return (
      <Box p="md">
        <Title order={2} mb="lg">
          Order Not Found
        </Title>
        <Text>The order you are looking for does not exist.</Text>
      </Box>
    );
  }

  const items = order.items ?? [];
  const subtotal = items.length > 0 ? computeSubtotal(items) : order.total;

  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <Title order={2}>Order Details</Title>
        <OrderStatusMenu orderId={order.id} currentStatus={order.status} />
      </Group>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
          <Stack gap="xs">
            <Text c="dimmed" size="sm">
              Order Number
            </Text>
            <Group gap="xs">
              <IconPackage size={16} />
              <Text fw={600}>{order.orderNumber}</Text>
            </Group>
          </Stack>
          <Stack gap="xs">
            <Text c="dimmed" size="sm">
              Customer
            </Text>
            <Group gap="xs">
              <IconShoppingBag size={16} />
              <Text fw={600}>{order.customerName}</Text>
            </Group>
          </Stack>
          <Stack gap="xs">
            <Text c="dimmed" size="sm">
              Email
            </Text>
            <Text fw={600}>{order.customerEmail}</Text>
          </Stack>
          <Stack gap="xs">
            <Text c="dimmed" size="sm">
              Date
            </Text>
            <Text fw={600}>{order.createdAt ? new Date(order.createdAt).toLocaleString() : "-"}</Text>
          </Stack>
        </SimpleGrid>
      </Card>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between" align="center" mb="md">
          <Title order={3}>Items</Title>
          <Group gap="xs">
            <IconCurrencyDollar size={16} />
            <Text fw={700}>Total: ETB {formatMoney(order.total)}</Text>
          </Group>
        </Group>
        {items.length === 0 ? (
          <Text c="dimmed">No items recorded for this order.</Text>
        ) : (
          <Table highlightOnHover>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Line Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={`${item.id ?? item.productId}`}>
                  <td>{item.productName || `#${item.productId}`}</td>
                  <td>{item.quantity}</td>
                  <td>ETB {formatMoney(item.price)}</td>
                  <td>ETB {formatMoney(item.price * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        <Group justify="flex-end" gap="sm" mt="md">
          <Text size="sm" c="dimmed">
            Subtotal
          </Text>
          <Text fw={700}>ETB {formatMoney(subtotal)}</Text>
        </Group>
      </Card>
    </Stack>
  );
}
