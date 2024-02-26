import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  MouseEvent,
  KeyboardEvent,
} from "react";

interface User {
  id: number;
  username: string;
}

type fibFunc = (n: number) => number;

const fib: fibFunc = (n) => {
  if (n < 2) return n;
  return fib(n - 1) + fib(n - 2);
};

const myNum: number = 8;

const App: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [users, setUsers] = useState<User[] | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  console.log(inputRef?.current);
  console.log(inputRef?.current?.value);

  useEffect(() => {
    console.log("mounting");
    console.log("Users: ", users);

    return () => console.log("unmounting");
  }, [users]);

  const addTwo = useCallback(
    (
      e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
    ): void => {
      setCount((prev) => prev + 2);
      console.log(e);
    },
    []
  );

  const updateUser = () => {
    if (inputRef?.current && inputRef?.current?.value) {
      const newUsername = inputRef.current.value;
      const newUserData: User = {
        id: users ? users.length + 1 : 1,
        username: newUsername,
      };
      setUsers(users ? [...users, newUserData] : [newUserData]);
      inputRef.current.value = ""; // Clear input after updating user data
    }
  };
  const result = useMemo<number>(() => fib(myNum), []);

  return (
    <div className="App">
      <h1>{count}</h1>
      <button onClick={addTwo}>Add</button>
      <h2>{result}</h2>
      <input ref={inputRef} type="text" />
      <button onClick={updateUser}>Update Users</button>
      <div>
        <h2>User Data:</h2>
        <ul>
          {users?.map((user) => (
            <li key={user.id}>
              ID: {user.id}, Username: {user.username}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
