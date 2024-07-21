"use client";

import OracleCard from "@/components/OracleCard";
import { Container } from "semantic-ui-react";

const Page = ({ params }: { params: { slug: string[] } }) => {
  const [season, card] = params.slug;

  return (
    <Container>
      <h1>Oracle: {params.slug.join(",")}</h1>
      <OracleCard season={season as any} value={card as any}></OracleCard>
    </Container>
  );
};

export default Page;
