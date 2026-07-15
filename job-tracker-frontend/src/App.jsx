import Button from "./components/Button";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center gap-4 bg-gray-100">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="success">Success</Button>
      <Button variant="danger">Danger</Button>
    </div>
  );
}

export default App;