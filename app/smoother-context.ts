// context/SmootherContext.ts
"use client";
import { createContext, useContext } from "react";

export const SmootherReadyContext = createContext(false);
export const useSmootherReady = () => useContext(SmootherReadyContext);