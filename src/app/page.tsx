import Overlay from "@/components/overlay";
import Scene from "@/components/scene";

export default function Home() {
    return (
        <div className="relative w-screen h-screen overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Scene />
            </div>

            <div className="z-10 pointer-events-none">
                <Overlay />
            </div>
        </div>
    );
}
