"use client";

import { oracle } from "@/lib/oracle";

import OracleCard from "@/components/card"
import { Container, Segment } from "semantic-ui-react";

const Page = ({ params }: { params: { slug: string[] } }) => {
  const [season, card] = params.slug;

  return (
    <Container>
      <h1>Oracle: {params.slug.join(",")}</h1>
      <OracleCard season={season} value={card}></OracleCard>
    </Container>
  );
};

export default Page;