import {Static, Type} from "@sinclair/typebox";

export const badRequestResponseSchema = Type.Object(
    {
        path: Type.String(),
        requestPart: Type.String(),
        message: Type.String()
    },
    {
        additionalProperties: false,
    }
)

export type BadRequestResponseSchemaType = Static<
    typeof badRequestResponseSchema
>
