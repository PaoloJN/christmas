"use client";

import React, { useMemo, useRef } from "react";

import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

export default function Snowfall({}) {
    const texture = useTexture("/snowflake.png");

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < 500; i++) {
            temp.push(Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10);
        }
        return new Float32Array(temp);
    }, []);

    const snowRef = useRef<THREE.Points>(null);

    useFrame(() => {
        if (snowRef.current) {
            snowRef.current.rotation.y += 0.001;
            const positions = snowRef.current.geometry.attributes.position;
            if (positions) {
                const array = positions.array as Float32Array;
                for (let i = 1; i < array.length; i += 3) {
                    array[i] -= 0.01;
                    if (array[i] < -10) {
                        array[i] = 10;
                    }
                }
                positions.needsUpdate = true;
            }
        }
    });

    return (
        <points ref={snowRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particles.length / 3}
                    array={particles}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial size={0.1} sizeAttenuation transparent opacity={0.5} map={texture} />
        </points>
    );
}
