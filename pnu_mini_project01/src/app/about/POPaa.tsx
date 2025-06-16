'use client'

import PolygonCanvas from "./AboutCP";

export default function POPaa() {
    return (
        <div>
                            <PolygonCanvas

  polygons={[
    { points: [ [100, 100], [200, 100], [150, 200] ], name: "A" },
    { points: [ [300, 150], [350, 100], [400, 200] ], name: "B" },
  ]}
  onPolygonClick={(name) => alert(`${name} clicked!`)}
  width={640}
  height={480}
/>
        </div>
    );
}