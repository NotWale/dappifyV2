import React, { useState, createContext, ReactNode, FC } from "react"

interface IThemeContext {
  isPlaying: boolean;
  togglePlay?: () => void;
}

export const defaultState = {
  isPlaying: false,
};

export const PlayingContext = React.createContext<IThemeContext>(defaultState);