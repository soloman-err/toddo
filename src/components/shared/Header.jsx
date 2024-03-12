import Container from "../container/Container";

const Header = () => {
  return (
    <div className="flex justify-between w-full mx-auto py-2 rounded-lg gap-2 border-b">
      <Container>
        <div>
          <h2 className="text-4xl uppercase font-bold">
            <span className="rotate-12 inline-block">T</span>
            <span className="rotate-12 inline-block">o</span>
            <span className="rotate-12 inline-block">d</span>
            <span className="rotate-12 inline-block">d</span>
            <span className="rotate-12 inline-block">o</span>
          </h2>
          <h3 className="text text-gray-400">Task Management Board</h3>
        </div>
      </Container>
    </div>
  );
};

export default Header;
