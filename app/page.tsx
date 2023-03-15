import {
  BoltIcon,
  ExclamationTriangleIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
function HomePage() {
  return (
    <div className="text-white flex flex-col items-center justify-center h-screen px-2 ">
      <h1 className="text-5xl font-bold mb-20">ChatGPT </h1>
      <div className="flex space-x-2 text-center">
        <div>
          <div
            className="flex flex-col items-center
        justify-center mb-5"
          >
            {/* sun icon */}
            <SunIcon className="h-8 w-8" />
            <h2>Examples</h2>
          </div>
          <div className="space-y-2 ">
            <p className="infoText">
              "Explain quantum computing in simple terms"
            </p>
            <p className="infoText">
              "Got any creative ideas for a 10 year old’s birthday?"
            </p>
            <p className="infoText">
              "How do I make an HTTP request in Javascript?"
            </p>
          </div>
        </div>
        <div>
          <div
            className="flex flex-col items-center
        justify-center mb-5"
          >
            {/* sun icon */}
            <BoltIcon className="h-8 w-8" />
            <h2>Capabilities</h2>
          </div>
          <div className="space-y-2 ">
            <p className="infoText">
              Remembers what user said earlier in the conversation
            </p>
            <p className="infoText">The messages are stored in firestore</p>
            <p className="infoText">
              Hot toast will notify you when ChatGPT starts working!
            </p>
          </div>
        </div>
        <div>
          <div
            className="flex flex-col items-center
        justify-center mb-5"
          >
            {/* sun icon */}
            <ExclamationTriangleIcon className="h-8 w-8" />
            <h2>Limitations</h2>
          </div>
          <div className="space-y-2 ">
            <p className="infoText">
              Can lead to inappropriate or incorrect responses.
            </p>
            <p className="infoText">Limited knowledge in relation to time.</p>
            <p className="infoText">
              May occasionally respond with biased or prejudicial content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
