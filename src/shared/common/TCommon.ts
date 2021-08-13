import React from "react";

export type TStringOrNumber = string | number; 
export type TChildren = { children : React.ReactNode };
export type TAction = {
  type: string,
  payload: {
    [key: string]: any
  }
}