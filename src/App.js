import React from "react";

function Sidebar() {
  React.useEffect(() => {
    console.log("Sidebar");
  });
  return <div>Sidebar (look at my nextEffect chain)</div>;
}

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
  const [showExample, setShowExample] = React.useState(false);

  if (!showExample) {
    return <button onClick={() => setShowExample(true)}>Show Example</button>;
  }

  return (
    <div>
      <SidebarWrapper />
      <Body />
    </div>
  );
}
