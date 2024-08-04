"use client";

import { Button, Input } from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/db";
import { useRouter } from "next/navigation";

type Inputs = {
  sessionName: string;
};

export function CreateQuickPlanningPokerSession() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();
  const defaultSessionName = `Planning Poker | ${new Date().toLocaleDateString()}`;

  const createSession: SubmitHandler<Inputs> = async ({ sessionName }) => {
    const session = await addDoc(collection(db, "planning_poker_sessions"), {
      sessionName: sessionName || defaultSessionName,
    });

    router.push(`/planning-poker/${session.id}`);
  };

  return (
    <form onSubmit={handleSubmit(createSession)} className="flex gap-4">
      <Input
        {...register("sessionName")}
        label="Enter session name"
        placeholder={defaultSessionName}
        className="w-96"
      />
      <Button
        className="h-34 w-48"
        type="submit"
        variant="solid"
        color="primary"
      >
        Start
      </Button>
    </form>
  );
}
