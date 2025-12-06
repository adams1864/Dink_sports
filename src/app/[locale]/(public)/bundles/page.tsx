import { getBundles } from "@/lib/api";
import { Box, Card, Container, Grid, SimpleGrid, Text, Title, Badge, Group, Button } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { IconPackage } from "@tabler/icons-react";

export default async function BundlesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  let bundlesResponse;
  try {
    bundlesResponse = await getBundles({ status: "published", perPage: 50 });
  } catch (error) {
    bundlesResponse = { data: [], meta: { page: 1, perPage: 50, total: 0, totalPages: 0 } };
  }

  const bundles = bundlesResponse.data;

  if (bundles.length === 0) {
    return (
      <Container size="lg" py="xl">
        <Box ta="center" py={60}>
          <IconPackage size={64} stroke={1.5} style={{ margin: "0 auto", opacity: 0.3 }} />
          <Title order={2} mt="md" c="dimmed">
            No Bundles Available
          </Title>
          <Text c="dimmed" mt="sm">
            Check back soon for curated product bundles!
          </Text>
        </Box>
      </Container>
    );
  }

  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="xl">
        Product Bundles
      </Title>
      <Text size="lg" c="dimmed" mb="xl">
        Save more with our specially curated bundles - everything you need in one package!
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
        {bundles.map((bundle) => {
          const productCount = bundle.products?.length ?? 0;
          const totalValue = bundle.products?.reduce((sum, p) => sum + p.price, 0) ?? 0;
          
          return (
            <Link
              key={bundle.id}
              href={`/${locale}/bundle/${bundle.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                style={{ height: "100%", transition: "transform 0.2s, box-shadow 0.2s", cursor: "pointer" }}
                className="hover:shadow-lg"
              >
                <div style={{ position: "relative", width: "100%", paddingBottom: "133.33%", marginBottom: "1rem" }}>
                  <Image
                    src={bundle.coverImage || bundle.bundleImage}
                    alt={bundle.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "cover", borderRadius: "8px" }}
                  />
                </div>

                <Group justify="space-between" mt="md" mb="xs">
                  <Title order={3} size="h4" lineClamp={2}>
                    {bundle.title}
                  </Title>
                  <Badge color="pink" variant="light">
                    {productCount} Items
                  </Badge>
                </Group>

                <Text size="sm" c="dimmed" lineClamp={3} mb="md">
                  {bundle.description}
                </Text>

                <Group justify="space-between" mt="auto">
                  <div>
                    <Text size="xs" c="dimmed">
                      Total Value
                    </Text>
                    <Text fw={700} size="lg">
                      ETB {totalValue.toFixed(2)}
                    </Text>
                  </div>
                  <Button variant="light" color="pink">
                    View Bundle
                  </Button>
                </Group>
              </Card>
            </Link>
          );
        })}
      </SimpleGrid>
    </Container>
  );
}
