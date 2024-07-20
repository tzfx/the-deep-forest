"use client";

import { oracle } from "@/lib/oracle";

import { useEffect, useRef, useState } from "react";

import OracleCard from "@/components/card";
import { Button, Container, Grid, Message, Segment } from "semantic-ui-react";
import { Game } from "@/lib/Game";
import { Card } from "@/lib/oracle/deck";
import * as fabric from "fabric";
import { FabricCanvas } from "@/components/fabricCanvas";

const Page = () => {
  const game = useRef(new Game());
  const [card, setCard] = useState<Card | null>(null);

  const leftInSeason = game.current.remaining;
  const ended = game.current.ended;

  return (
    <Container>
      <h1>The Deep Forest</h1>
      <Grid relaxed columns={3}>
        <Grid.Row>
          <Grid.Column>
            <p>It is currently {game.current.currentSeason}.</p>
            <p>
              {ended
                ? "The game is over."
                : `${leftInSeason} week${leftInSeason === 1 ? "" : "s"} remain${
                    leftInSeason === 1 ? "s" : ""
                  }.`}
            </p>
            <Button
              disabled={ended}
              onClick={() => {
                game.current.draw();
                setCard(game.current.currentCard);
              }}
            >
              Draw a card.
            </Button>
          </Grid.Column>
          <Grid.Column stretched>
            {card !== null && (
              <OracleCard
                season={card.suit as any}
                value={card.value as any}
              ></OracleCard>
            )}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row stretched style={{height: 400}}>
            <FabricCanvas />
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default Page;
