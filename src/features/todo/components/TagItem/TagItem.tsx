import { FC, Fragment } from "react";
import { Badge, CloseButton } from "react-bootstrap";
import "./TagItem.css";

type TagItemProps = {
  tag: string;
  onDestroy: (id: string) => void;
};

const TagItem: FC<TagItemProps> = ({ tag, onDestroy }) => {
  const handleDelete = () => {
    onDestroy(tag);
  };

  return (
    <Fragment>
      <Badge variant="secondary" className="badge">
        {tag}
        <CloseButton className="ml-1" onClick={handleDelete} />
      </Badge>{" "}
    </Fragment>
  );
};

export default TagItem;
