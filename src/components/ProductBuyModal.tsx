"use client";

import { useState } from "react";
import { Modal, Button, TextInput, NumberInput, Group, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { createOrder } from "@/lib/api";

interface ProductBuyModalProps {
  product: { id: number; name: string; price: number; stock: number };
  opened: boolean;
  close: () => void;
}

export function ProductBuyModal({ product, opened, close }: ProductBuyModalProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      address: "",
      quantity: 1,
    },
    validate: {
      name: (value) => (value.length < 2 ? "Name is too short" : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      address: (value) => (value.length < 5 ? "Address is too short" : null),
      quantity: (value) => (value > product.stock ? "Not enough stock" : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    try {
      await createOrder({
        customerName: values.name,
        customerEmail: values.email,
        address: values.address,
        items: [{ productId: product.id, quantity: values.quantity }],
      });

      notifications.show({
        title: "Success",
        message: "Order placed successfully! We'll contact you soon.",
        color: "green",
      });
      close();
      form.reset(); 
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to place order. Try again.",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal opened={opened} onClose={close} title={`Buy ${product.name}`}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput label="Full Name" placeholder="John Doe" required {...form.getInputProps("name")} />
          <TextInput label="Email" placeholder="john@example.com" required {...form.getInputProps("email")} />
          <TextInput label="Shipping Address" placeholder="123 Street, City" required {...form.getInputProps("address")} />
          
          <Group grow>
            <NumberInput 
              label="Quantity" 
              min={1} 
              max={product.stock} 
              required 
              {...form.getInputProps("quantity")} 
            />
            <TextInput label="Price per item" value={`$${product.price}`} readOnly disabled />
          </Group>

          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={close}>Cancel</Button>
            <Button type="submit" loading={loading} color="blue">Place Order</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
