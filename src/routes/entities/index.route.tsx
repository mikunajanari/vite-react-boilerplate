import { createFileRoute } from "@tanstack/react-router";
import EntitiesList from "../../pages/EntitiesList";

export const Route = createFileRoute("/entities/")({
    component: EntitiesList,
});
