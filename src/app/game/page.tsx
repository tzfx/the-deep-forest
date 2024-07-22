"use client";

import { useReducer, useRef, useState } from "react";

import OracleCard, { season2icon } from "@/components/OracleCard";
import FabricCanvas from "@/components/FabricCanvas";
import { Game } from "@/lib/Game";
import { Card } from "@/lib/oracle/deck";
import {
  Button,
  ButtonGroup,
  Container,
  Grid,
  Header,
  Segment,
} from "semantic-ui-react";
import Deck from "@/components/Deck";

const Page = () => {
  const game = useRef(new Game());
  const [card, setCard] = useState<Card | null>(null);
  const [started, setStarted] = useState<boolean>(false);
  
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

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

  const preamble = (
    <Segment style={{ marginTop: "20vh", padding: "50px" }} textAlign="center">
      <Header size="huge">The Deep Forest</Header>
      <p style={{ padding: "30px 10px" }}>
        &nbsp;&nbsp;For a long time, our monstrous home was occupied by invading
        humans. Now, finally, we&apos;ve driven them off, and we&apos;re left
        with this: a year of relative peace. One quiet year, with which to
        dismantle their settlements and reclaim our lands. Come Winter, a band
        of heroes will arrive and we might not survive the encounter. This is
        when the game will end. But we don&apos;t know about that yet. What we
        know is that right now, in this moment, we monsters have an opportunity
        for healing and self-discovery in our deep forest, away from human
        eyes...
      </p>
      <Button
        onClick={() => {
          setStarted(true);
        }}
      >
        Start
      </Button>
    </Segment>
  );

  const board = (
    <>
      <Header size="large">The Deep Forest</Header>
      <Grid relaxed columns={3}>
        <Grid.Row style={{ height: 300 }}>
          <Grid.Column>
            <p>It is currently {game.current.currentSeason}.</p>
            <p>{leftInSeason()}</p>
            <Segment style={{width: "245px"}}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "220px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Deck
                icon={season2icon(game.current.currentSeason as any)}
                cardsLeft={game.current.remaining}
              ></Deck>
              <div
                style={{
                  height: "100%",
                  width: "120px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <ButtonGroup vertical labeled>
                  <Button
                    size="mini"
                    disabled={ended || game.current.turnStatus.draw }
                    icon={game.current.turnStatus.draw ? "check circle outline" : "circle outline"}
                    content="Draw a card"
                    onClick={() => {
                      game.current.draw();
                      setCard(game.current.currentCard);
                    }}
                  ></Button>
                  <Button
                    size="mini"
                    icon={game.current.turnStatus.projects ? "check circle outline" : "circle outline"}
                    content="Work projects"
                    disabled={ended || game.current.turnStatus.projects }
                    onClick={() => {
                      // update projects on canvas.
                      game.current.turnProjects = true;
                      // forceUpdate();
                    }}
                  ></Button>
                  <Button
                    size="mini"
                    icon={game.current.turnStatus.action ? "check circle outline" : "circle outline"}
                    disabled={ended || game.current.turnStatus.action }
                    content="Take an action"
                    onClick={() => {
                      game.current.turnStatus.action = true;
                      // forceUpdate();
                    }}
                  ></Button>
                </ButtonGroup>
              </div>
            </div>
            </Segment>
          </Grid.Column>
          <Grid.Column width={8}>
            {card !== null && (
              <OracleCard
                season={card.suit as any}
                value={card.value as any}
              ></OracleCard>
            )}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row stretched style={{ height: 400 }}>
          <FabricCanvas />
        </Grid.Row>
      </Grid>
    </>
  );

  return <Container>{started ? board : preamble}</Container>;
};

export default Page;
