"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export default function Star() {
    const pointsRef = useRef<THREE.Points>(null);

    // Generate vertices and outer face points for the Pentagrammic Dipyramid
    const vertices = useMemo(() => {
        const radius = 0.2; // Radius of the pentagon
        const height = 0.1; // Height of the dipyramid tips
        const spikes = 5; // Number of star spikes
        const baseVertices = [];
        const faces = [];
        const angleStep = (Math.PI * 2) / (spikes * 2); // Divide by double the spikes for alternating points

        // Generate vertices for the pentagram
        for (let i = 0; i < spikes * 2; i++) {
            const angle = i * angleStep;
            const isOuter = i % 2 === 0; // Alternate between outer and inner points
            const r = isOuter ? radius : radius / 2; // Use smaller radius for inner points

            baseVertices.push([Math.cos(angle) * r, Math.sin(angle) * r, 0]);
        }

        // Add the top and bottom tips
        const top = [0, 0, height];
        const bottom = [0, 0, -height];

        // Create triangular faces connecting to the tips
        for (let i = 0; i < baseVertices.length; i++) {
            const nextIndex = (i + 1) % baseVertices.length;

            // Top tip faces
            faces.push([top, baseVertices[i], baseVertices[nextIndex]]);

            // Bottom tip faces
            faces.push([bottom, baseVertices[nextIndex], baseVertices[i]]);
        }

        // Generate particles for the outer surface of each face
        const particlePositions: number[] = [];
        const resolution = 10; // Number of particles along each edge

        faces.forEach((face) => {
            const [v0, v1, v2] = face;

            for (let i = 0; i <= resolution; i++) {
                for (let j = 0; j <= resolution - i; j++) {
                    const w0 = i / resolution;
                    const w1 = j / resolution;
                    const w2 = 1 - w0 - w1;

                    // Linear interpolation for surface points
                    const point = [
                        w0 * v0[0] + w1 * v1[0] + w2 * v2[0],
                        w0 * v0[1] + w1 * v1[1] + w2 * v2[1],
                        w0 * v0[2] + w1 * v1[2] + w2 * v2[2],
                    ];

                    particlePositions.push(...point);
                }
            }
        });

        return new Float32Array(particlePositions);
    }, []);

    // Animate star spinning
    useFrame(({ clock }) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = clock.getElapsedTime() * 2;
        }
    });

    return (
        <points ref={pointsRef} position={[0, 2.35, 0]} rotation={[0, 0, Math.PI / 2]}>
            <bufferGeometry>
                {/* Set positions for the vertices */}
                <bufferAttribute
                    attach="attributes-position"
                    array={vertices}
                    count={vertices.length / 3}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial color="#ffeb66" size={0.01} />
        </points>
    );
}
