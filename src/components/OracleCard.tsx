import {
  Card,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Segment,
  SegmentGroup,
} from "semantic-ui-react";
import { oracle } from "@/lib/oracle";
import { marked } from "marked";

const season2icon = (season: string) => {
  let icon = "";
  switch (season) {
    case "spring":
      icon = "seedling";
      break;
    case "summer":
      icon = "sun";
      break;
    case "autumn":
      icon = "leaf";
      break;
    case "winter":
      icon = "snowflake";
      break;
  }
  return icon;
}

const OracleCard = ({
  season,
  value,
}: {
  season: keyof typeof oracle;
  value: keyof typeof oracle.autumn;
}) => {
  let icon = season2icon(season);
  const choices = oracle[season][value];
  return (
    <SegmentGroup raised>
      <Segment>
        <Grid verticalAlign="middle" columns={2}>
          <Grid.Column>
            <Header textAlign="center" size="large">
              {value}
            </Header>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Icon size="huge" className={icon}></Icon>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment>
        <Grid relaxed columns={choices.length as any}>
          <Grid.Column textAlign="center">
            <div
              dangerouslySetInnerHTML={{ __html: marked.parse(choices[0]) }}
            ></div>
          </Grid.Column>
          {choices.length > 1 && (
            <Grid.Column textAlign="center">
              <div
                dangerouslySetInnerHTML={{ __html: marked.parse(choices[1]) }}
              ></div>
            </Grid.Column>
          )}
        </Grid>
        {choices.length > 1 && <Divider vertical>OR</Divider>}
      </Segment>
      <Segment textAlign="right">
        {value} of {season}
      </Segment>
    </SegmentGroup>
  );
};

export default OracleCard;
export { season2icon };
