import { createFileRoute } from "@tanstack/react-router";
import EntityForm from "../../pages/EntityForm";

export const Route = createFileRoute("/entities/$id")({
    component: EntityForm,
});
