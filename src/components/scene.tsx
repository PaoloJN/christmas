"use client";

import React from "react";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

import Snowfall from "@/components/snowfall";
import ChristmasTree from "@/components/christmas-tree";

export default function Scene({}) {
    return (
        <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Snowfall />
            <ChristmasTree />
            <OrbitControls />
        </Canvas>
    );
}
