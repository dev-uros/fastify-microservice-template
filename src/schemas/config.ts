import {Static, Type} from '@sinclair/typebox'

export const configSchema = Type.Object(
    {
        PORT: Type.Number({
            default: 3000,
            description: 'Application port'
        }),
        HOST: Type.String({
            default: '0.0.0.0',
            description: 'Application host'
        }),
        BASE_URL: Type.String({
            default: 'localhost:3000',
            description: 'Application environment'
        }),
        APP_ENV: Type.String({
            default: 'local',
            description: 'Application environment'
        }),
        DATABASE_NAME: Type.String({
            description: 'Application database name',
            default: 'microservice_template_db'
        }),
        DATABASE_HOST: Type.String({
            description: 'Application database host',
            default: 'db'
        }),
        DATABASE_PORT: Type.String({
            description: 'Application database port',
            default: '5432'
        }),
        DATABASE_USER: Type.String({
            description: 'Application database user',
            default: 'postgres'
        }),
        DATABASE_PASSWORD: Type.String({
            description: 'Application database password',
            default: 'postgres'
        }),
        DATABASE_URL: Type.String({
            description: 'Application database url',
            default: 'postgres://postgres:postgres@db:5432/microservice_template_db'
        }),
        JWT_SECRET: Type.String({
            description: 'Jwt token secret'
        })
    },
    {
        additionalProperties: false
    }
)

export type ConfigSchemaType = Static<typeof configSchema>
