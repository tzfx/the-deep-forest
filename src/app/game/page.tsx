"use client";

import { useRef, useState } from "react";

import OracleCard from "@/components/OracleCard";
import FabricCanvas from "@/components/FabricCanvas";
import { Game } from "@/lib/Game";
import { Card } from "@/lib/oracle/deck";
import {
  Button,
  Container,
  Grid,
  Placeholder,
  PlaceholderHeader,
  Segment,
} from "semantic-ui-react";

const Page = () => {
  const game = useRef(new Game());
  const [card, setCard] = useState<Card | null>(null);

  const leftInSeason = () => {
    if (game.current.remaining > 1) {
      return `There are ${game.current.remaining} weeks remaining.`;
    } else if (game.current.remaining === 1) {
      return `There is 1 week remaining.`;
    } else {
      return "The season has ended.";
    }
  };
  const ended = game.current.ended;

  return (
    <Container>
      <h1>The Deep Forest</h1>
      <Grid relaxed columns={3}>
        <Grid.Row style={{ height: 300 }}>
          <Grid.Column>
            <p>It is currently {game.current.currentSeason}.</p>
            <p>{leftInSeason()}</p>
            <Button
              disabled={ended}
              onClick={() => {
                game.current.draw();
                setCard(game.current.currentCard);
              }}
            >
              Draw a card
            </Button>
          </Grid.Column>
          <Grid.Column width={8}>
            {card !== null ? (
              <OracleCard
                season={card.suit as any}
                value={card.value as any}
              ></OracleCard>
            ) : (
              <Segment raised placeholder textAlign="center"></Segment>
            )}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row stretched style={{ height: 400 }}>
          <FabricCanvas />
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default Page;
