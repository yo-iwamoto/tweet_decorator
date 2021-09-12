import React from "react";
import { Page } from "~/components/layout/index.tsx";
import { useSignin } from "../hooks/useSignin.ts";

export default function () {
  const signin = useSignin();

  return <Page signin={signin} />;
}
