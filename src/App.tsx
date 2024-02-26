import React, {
  useEffect,
  useState,
  useCallback,
  MouseEvent,
  KeyboardEvent,
} from "react";
import List from "./components/List";

interface User {
  id: number;
  username: string;
}

const App: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    console.log("first");
    console.log("Users:", users);
    return () => console.log("second");
  }, [users]);

  const addTwo = useCallback(
    (
      e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
    ): void => {
      setCount((prev) => prev + 2);
      console.log("Event:", e);
    },
    []
  );

  const updateUser = () => {
    setUsers([{ id: 1, username: "user1" }]);
  };

  return (
    <div className="App">
      <h1>{count}</h1>
      <button onClick={addTwo}>Add Two</button>
      <button onClick={updateUser}>Update Users</button>
      <List
        items={["☕ Coffee", "🌮 Tacos", "💻 Code"]}
        render={(item: string) => <span className="bold">{item}</span>}
      />
    </div>
  );
};

export default App;
