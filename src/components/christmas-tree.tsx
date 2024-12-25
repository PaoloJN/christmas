"use client";

import { PointMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";

import Star from "@/components/star";

export default function ChristmasTree() {
    return (
        <>
            <Cone height={1} baseRadius={1.4} particleCount={1100} yOffset={-2} />
            <Cone height={1} baseRadius={1.2} particleCount={900} yOffset={-1} />
            <Cone height={1} baseRadius={1} particleCount={700} yOffset={0} />
            <Cone height={1} baseRadius={0.8} particleCount={500} yOffset={1} />
            <Star />
        </>
    );
}

interface ConeProps {
    height: number;
    baseRadius: number;
    particleCount: number;
    yOffset: number;
}

function Cone({ height, baseRadius, particleCount, yOffset }: ConeProps) {
    const particleRef = useRef(null);
    const decorationRef = useRef([]);

    const { positions, basePositions, initialOffsets, decorationPositions, decorationOffsets } =
        useMemo(() => {
            const posArray = [];
            const basePosArray = [];
            const initialOffsetsArray = [];
            const decorationPosArray = [];
            const decorationOffsetsArray = [];

            for (let i = 0; i < particleCount; i++) {
                const progress = Math.random(); // Random progress along the height (0 to 1)
                const y = progress * height + yOffset; // Vertical position
                const radius = baseRadius * (1 - progress); // Radius decreases with height

                // Add a smooth wave factor to make the edges slightly wavy
                const waveFactor = Math.sin(progress * 10 + Math.random() * Math.PI) * 0.1;
                const finalRadius = radius + waveFactor;

                const angle = Math.random() * Math.PI * 2; // Random angle around the cone
                const x = finalRadius * Math.cos(angle);
                const z = finalRadius * Math.sin(angle);

                posArray.push(x, y, z);
                basePosArray.push(x, y, z);
                initialOffsetsArray.push(Math.random() * Math.PI * 2); // Random wave offsets

                // Randomly add decorations
                if (Math.random() < 0.05) {
                    // Lower probability for smaller, scattered decorations
                    decorationPosArray.push([x, y, z]);
                    decorationOffsetsArray.push({
                        initialAngle: Math.random() * Math.PI * 2,
                        progress,
                    });
                }
            }

            return {
                positions: new Float32Array(posArray),
                basePositions: new Float32Array(basePosArray),
                initialOffsets: initialOffsetsArray,
                decorationPositions: decorationPosArray,
                decorationOffsets: decorationOffsetsArray,
            };
        }, [height, baseRadius, particleCount, yOffset]);

    // useFrame(({ clock }) => {
    //     const elapsed = clock.getElapsedTime();
    //     const waveAmplitude = 0.1; // Amplitude of the up-and-down wave
    //     const waveFrequency = 1; // Frequency of the wave
    //     const spinSpeed = 1; // Speed of the spinning

    //     if (!particleRef.current) return;

    //     const positionArray = particleRef.current.geometry.attributes.position.array;

    //     for (let i = 0; i < basePositions.length / 3; i++) {
    //         const index = i * 3; // Each particle has x, y, z
    //         const initialOffset = initialOffsets[i];

    //         // Adjust vertical position with wave
    //         positionArray[index + 1] =
    //             basePositions[index + 1] +
    //             Math.sin(elapsed * waveFrequency + initialOffset) * waveAmplitude;

    //         // Apply spin to x and z
    //         const baseX = basePositions[index];
    //         const baseZ = basePositions[index + 2];
    //         const angle = elapsed * spinSpeed + initialOffset;
    //         positionArray[index] = baseX * Math.cos(angle) - baseZ * Math.sin(angle);
    //         positionArray[index + 2] = baseX * Math.sin(angle) + baseZ * Math.cos(angle);
    //     }

    //     particleRef.current.geometry.attributes.position.needsUpdate = true;

    //     // Update decoration positions to spin with the tree
    //     decorationRef.current.forEach((mesh, index) => {
    //         const { initialAngle, progress } = decorationOffsets[index];
    //         const y = basePositions[index * 3 + 1];
    //         const radius = baseRadius * (1 - progress);
    //         const angle = elapsed * spinSpeed + initialAngle;

    //         const x = radius * Math.cos(angle);
    //         const z = radius * Math.sin(angle);

    //         mesh.position.set(x, y, z);
    //     });
    // });

    return (
        <>
            <points ref={particleRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        array={positions}
                        count={positions.length / 3}
                        itemSize={3}
                    />
                </bufferGeometry>
                <PointMaterial
                    size={0.015} // Smaller particle size
                    color="#66ff66" // Light green
                    transparent
                    opacity={0.8}
                    depthWrite={false}
                    toneMapped={false}
                />
            </points>
            {/* Decorations */}
            {decorationPositions.map((pos, index) => (
                <mesh
                    key={index}
                    ref={(el) => (decorationRef.current[index] = el)} // Attach ref for dynamic updates
                >
                    <sphereGeometry args={[0.01, 0, 0]} /> {/* Smaller decorations */}
                    <meshStandardMaterial
                        color={
                            index % 4 === 0
                                ? "red"
                                : index % 4 === 1
                                ? "gold"
                                : index % 4 === 2
                                ? "silver"
                                : "blue"
                        }
                    />
                </mesh>
            ))}
        </>
    );
}
