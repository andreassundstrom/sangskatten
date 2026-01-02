# # Build SPA
FROM docker.io/node:25-alpine AS app-builder

WORKDIR /build

COPY web-app/ .

RUN npm ci

RUN npm run build

# Build .NET-API
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS api-builder

WORKDIR /build

COPY api/ .

COPY --from=app-builder /build/dist src/Sangskatten.Api/wwwroot

RUN dotnet publish src/Sangskatten.Api -c Release -o bin/

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final

WORKDIR /app

COPY --from=api-builder /build/bin .

CMD [ "dotnet", "Sangskatten.Api.dll" ]