import { useNavigate } from "react-router";

function Landing() {
    const navigate = useNavigate();

    return (
        <>
            <div className="w-full min-h-screen bg-[url(./assets/Bar-bg.png)] bg-cover flex justify-center">
                <div className="bg-secondary/80 min-h-screen w-[80%] flex flex-col items-center justify-center text-center px-4">
                    <div className="max-w-4xl text-white">
                        <h1 className="text-8xl font-black uppercase tracking-tight font-fraunces">
                            THE VELVET
                        </h1>
                        <h1 className="text-8xl font-black text-[#EE9300] tracking-tight leading-none mb-10 font-fraunces">
                            HIDEAWAY
                        </h1>
                        <h2 className="text-4xl font-bold mb-10 font-fraunces">
                            Your private sanctuary for the liquid crafts
                        </h2>
                        <p className="text-2xl font-semibold mb-12 opacity-90">
                            The Velvet Hideaway is a digital sanctuary for the home mixologist who appreciates a stiff drink and a soft chair. Curate your personal collection in a space designed for slow sips and quiet evenings.
                        </p>
                        <button
                            className="btn btn-primary text-black bg-[#EE9300] hover:bg-[#EE9300]/90 border-none rounded-full px-12 py-3 h-auto text-2xl font-semibold transform hover:scale-105 transition-all duration-200"
                            onClick={() => navigate('/auth/login')} // Correct way to handle click navigation
                        >
                            Enter your hideaway
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Landing;