/* import { Ditto } from "../types/ditto";

const DittoCard = ({ ditto }:{ditto:Ditto}) => {
  return (
    <p className="ditto-card" key={ditto.id}>
      {ditto.title}
    </p>
  );
};

export default DittoCard; */



import React from "react";
import { Ditto } from "../types/ditto";

interface DittoCardProps  extends React.HTMLAttributes<HTMLParagraphElement>{
  ditto: Ditto;
}

const DittoCard : React.FC<DittoCardProps> = ({ ditto , ...props }) => {
  return (
    <p className="ditto-card" key={ditto.id} {...props}>
      {ditto.title}
    </p>
  );
};

export default DittoCard;