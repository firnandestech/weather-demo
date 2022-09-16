import { useRef, useState } from "react";
import { pointer, bisector, timeFormat } from "d3";
import HoverField from "./HoverField";
import Path from "./Path";
import Tooltip from "./Tooltip";

const Field = ({ data, lineGenerator, width, height, xScale, yScale }:any) => {
  const rectRef = useRef();

  const [showTooltip, setshowTooltip] = useState(false);
  const [focusPosition, setFocusPosition] = useState({
    isShow: false,
    x: 0,
    y: 0,
    label: {
      timestamp: "",
      temperature: "",
    },
  });

  function toggleShowFocus(condition = false) {
    setFocusPosition({ ...focusPosition });
    setshowTooltip(condition);
  }

  function trackingMouseMove(e:any) {
    if (data.length) {
      const bisect = bisector((d:any) => d?.timestamp).left;
      const xPos = pointer(e, e.target)[0];
      const x0 = bisect(data, xScale.invert(xPos));
      const d0 = data[x0];

      const focusPositions:any = {
        ...focusPosition,
        x: xScale(d0.timestamp),
        y: yScale(d0.temperature),
        label: {
          timestamp: timeFormat("%d/%m/%Y - %I %p")(d0.timestamp),
          temperature: Math.floor(d0.temperature),
        },
      };
      setFocusPosition(focusPositions);
    }
  }

  return (
    <g>
      <Path data={data} lineGenerator={lineGenerator} />
      {showTooltip && (
        <Tooltip
          x={focusPosition.x}
          y={focusPosition.y}
          label={focusPosition.label}
        />
      )}

      <HoverField
        ref={rectRef}
        width={width}
        height={height}
        toggleShowFocus={toggleShowFocus}
        trackingMouseMove={trackingMouseMove}
      />
    </g>
  );
};

export default Field;
