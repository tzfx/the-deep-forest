import { Header, Icon, Segment, SemanticICONS } from "semantic-ui-react";

const Deck = ({
  icon,
  cardsLeft,
  bgColor,
}: {
  icon: string;
  cardsLeft: number;
  bgColor?: string;
}) => {
  return (
    <div
      style={{
        borderRadius: "10px",
        borderColor: "black",
        borderStyle: "solid",
        height: "100px",
        width: "75px",
      }}
    >
      <div
        style={{
          borderRadius: "10px",
          borderColor: "white",
          borderStyle: "solid",
          borderWidth: "7px",
          width: "100%",
          height: "100%",
        }}
      >
        <Segment
          style={{
            backgroundColor: bgColor ?? "lightgrey",
            borderRadius: "10px",
            width: "100%",
            height: "100%",
            textAlign: "center",
            verticalAlign: "middle",
          }}
        >
            <Header icon>
              <Icon name={icon as SemanticICONS} size="large"></Icon>
              {cardsLeft ?? 0}
              </Header>
        </Segment>
      </div>
    </div>
  );
};

export default Deck;
