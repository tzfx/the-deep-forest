import { Action } from "@/lib/Actions";
import { marked } from "marked";
import { Header, Segment } from "semantic-ui-react";

const ActionModal = ({ action }: { action: Action }) => {
  return (
    <Segment>
      <Header>{action.title}</Header>
      <div
        dangerouslySetInnerHTML={{ __html: marked.parse(action.description) }}
      ></div>
    </Segment>
  );
};

export default ActionModal;
