import Container from "../container/Container";

const Header = () => {
  return (
    <div className="flex justify-between w-full mx-auto py-3 gap-2 border-b">
      <Container>
        <div className="flex items-center justify-between w-full">
          {/* Brand */}
          <div>
            <h2 className="text-2xl uppercase font-bold">
              <span className="rotate-12 inline-block bg-black text-white rounded-sm px-[2px]">
                T
              </span>

              <span className="rotate-12 inline-block bg-black text-white rounded-sm px-[2px]">
                o
              </span>

              <span className="rotate-12 inline-block bg-black text-white rounded-sm px-[2px]">
                d
              </span>

              <span className="rotate-12 inline-block bg-black text-white rounded-sm px-[2px]">
                d
              </span>

              <span className="rotate-12 inline-block bg-black text-white rounded-sm px-[2px]">
                o
              </span>
            </h2>

            <span className="text-sm text-gray-500">
              Task Management System
            </span>
          </div>

          {/* Profile */}
          <div>
            <div className="w-10 h-10 rounded-full bg-black"></div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
