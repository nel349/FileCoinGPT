import React from "react";

interface IFrameComponentProps {
  src: string;
}

function IFrameComponent(props: IFrameComponentProps) {
  return <iframe src={props.src} />;
}

export default IFrameComponent;