import logo2 from "./Assets/sc-logo.png";
import logo1 from "./Assets/cube.jpeg";


const Layout = ({ children }) => {
  return (
    <>
      <div className="min-h-screen relative">
        <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
            <div className="flex items-center gap-3">
              <img src={logo1} alt="Qplay Logo" className="w-10 h-10" />
              <h1 className="text-2xl font-bold text-gray-800">QPlay</h1>
            </div>
          </div>
        </header>

        <main className="h-full pt-16">{children}</main>
        <div className="fixed bottom-0 right-0 p-3 flip-wrapper">
          <img src={logo2} alt="spinning logo" className="flip-x w-20 h-30" />
        </div>
      </div>

      <style jsx>{`
        .flip-wrapper {
          z-index: 50;
        }

        .flip-x {
          animation: flipX 3s linear infinite;
          transform-style: preserve-3d;
        }

        @keyframes flipX {
          0% {
            transform: rotateY(0deg);
          }
          50% {
            transform: rotateY(180deg);
          }
          100% {
            transform: rotateY(360deg);
          }
        }
      `}</style>
    </>
  );
};

export default Layout;
