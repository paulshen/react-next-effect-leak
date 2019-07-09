import React from "react";

// Even though <InnerBody> unmounts (and remounts), this Fiber holds a reference to
// the initial <InnerBody> fiber node.
function Sidebar() {
  React.useEffect(() => {
    console.log("Sidebar");
  });
  return <div>Sidebar (look at my nextEffect chain)</div>;
}

// This is necessary because updating <Body> causes <App>
// to reclone its children and reset their nextEffect pointer.
// https://github.com/facebook/react/blob/67e3f3fb6e342f95f00215c84d5d013d7b0e1b33/packages/react-reconciler/src/ReactFiber.js#L418
function SidebarWrapper() {
  return <Sidebar />;
}

function InnerBody({ count }) {
  React.useEffect(() => {
    console.log(`InnerBody: ${count}`);
  });
  return <div>InnerBody: {count}</div>;
}

function Body() {
  const [count, setCount] = React.useState(1);
  return (
    <div>
      <InnerBody count={count} key={count} />
      <button onClick={() => setCount(x => x + 1)}>Remount InnerBody</button>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <SidebarWrapper />
      <Body />
    </div>
  );
}
