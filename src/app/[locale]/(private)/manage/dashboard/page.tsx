"use client";

import { Card, Grid, Text, Box, Group, Skeleton, Table, Badge } from "@mantine/core";
import {
  IconBrandProducthunt,
  IconPackage,
  IconReorder,
  IconShoppingCart,
  IconDiscount,
  IconCurrencyDollar,
} from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";
import { getMeta, getOrders, type Order } from "@/lib/api";

type StatConfig = {
  key: keyof DashboardCounts;
  title: string;
  icon: (typeof IconBrandProducthunt);
  color: string;
  format?: (value: number) => string;
};

type DashboardCounts = {
  products: number;
  bundles: number;
  orders: number;
  leads: number;
  discounts: number;
  revenue: number;
};

const STAT_CONFIG: StatConfig[] = [
  {
    key: "products",
    title: "Total Products",
    icon: IconBrandProducthunt,
    color: "blue",
  },
  {
    key: "bundles",
    title: "Total Bundles",
    icon: IconPackage,
    color: "grape",
  },
  {
    key: "orders",
    title: "Total Orders",
    icon: IconReorder,
    color: "green",
  },
  {
    key: "leads",
    title: "Total Leads",
    icon: IconShoppingCart,
    color: "orange",
  },
  {
    key: "discounts",
    title: "Active Discounts",
    icon: IconDiscount,
    color: "pink",
  },
  {
    key: "revenue",
    title: "Total Revenue",
    icon: IconCurrencyDollar,
    color: "teal",
    format: (value) => `ETB ${value.toLocaleString()}`,
  },
];

const DEFAULT_COUNTS: DashboardCounts = {
  products: 0,
  bundles: 0,
  orders: 0,
  leads: 0,
  discounts: 0,
  revenue: 0,
};

export default function DashboardPage() {
  const [counts, setCounts] = useState<DashboardCounts>(DEFAULT_COUNTS);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const numberFormatter = useMemo(() => new Intl.NumberFormat(), []);

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      try {
        setLoading(true);
        const [summary, orders] = await Promise.all([
          getMeta(),
          getOrders().catch(() => [])
        ]);

        if (cancelled) return;

        setCounts({
          products: summary.products,
          bundles: summary.bundles,
          orders: summary.orders,
          leads: summary.leads,
          discounts: summary.discounts,
          revenue: summary.revenue,
        });
        setRecentOrders(orders.slice(0, 5));
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadData();

    return () => {
      cancelled = true;
    };
  }, []);

  const stats = STAT_CONFIG.map((config) => {
    const Icon = config.icon;
    const rawValue = counts[config.key];
    const formattedValue = config.format
      ? config.format(rawValue)
      : numberFormatter.format(rawValue);

    return {
      title: config.title,
      icon: Icon,
      color: config.color,
      value: formattedValue,
    };
  });

  return (
    <Box>
      <Text size="xl" fw={700} mb="lg">
        Dashboard Overview
      </Text>

      <Grid>
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Grid.Col key={stat.title} span={{ base: 12, sm: 6, md: 4 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between" mb="xs">
                  <Box>
                    <Text size="sm" c="dimmed" fw={500}>
                      {stat.title}
                    </Text>
                    {loading ? (
                      <Skeleton height={20} width={60} mt="xs" />
                    ) : (
                      <Text size="xl" fw={700} mt="xs">
                        {stat.value}
                      </Text>
                    )}
                  </Box>
                  <Box
                    style={{
                      backgroundColor: `var(--mantine-color-${stat.color}-1)`,
                      borderRadius: "8px",
                      padding: "12px",
                    }}
                  >
                    <Icon
                      size={24}
                      stroke={1.5}
                      color={`var(--mantine-color-${stat.color}-6)`}
                    />
                  </Box>
                </Group>
              </Card>
            </Grid.Col>
          );
        })}
      </Grid>

      <Text size="xl" fw={700} mt="xl" mb="lg">
        Recent Orders
      </Text>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Order #</Table.Th>
              <Table.Th>Customer</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Total</Table.Th>
              <Table.Th>Date</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {loading ? (
              <Table.Tr>
                <Table.Td colSpan={5}>
                  <Skeleton height={20} mt={6} radius="xl" />
                  <Skeleton height={20} mt={6} radius="xl" />
                  <Skeleton height={20} mt={6} radius="xl" />
                </Table.Td>
              </Table.Tr>
            ) : recentOrders.length === 0 ? (
              <Table.Tr>
                <Table.Td colSpan={5} align="center">
                  No orders found
                </Table.Td>
              </Table.Tr>
            ) : (
              recentOrders.map((order) => (
                <Table.Tr key={order.id}>
                  <Table.Td>{order.orderNumber}</Table.Td>
                  <Table.Td>{order.customerName}</Table.Td>
                  <Table.Td>
                    <Badge
                      color={order.status === "completed" ? "green" : "blue"}
                    >
                      {order.status}
                    </Badge>
                  </Table.Td>
                  <Table.Td>{order.total}</Table.Td>
                  <Table.Td>
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "—"}
                  </Table.Td>
                </Table.Tr>
              ))
            )}
          </Table.Tbody>
        </Table>
      </Card>
    </Box>
  );
}
