#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["Inventory/Inventory.Supply.Web/Inventory.Supply.Web.csproj", "Inventory/Inventory.Supply.Web/"]
RUN dotnet restore "Inventory/Inventory.Supply.Web/Inventory.Supply.Web.csproj"
COPY . .
WORKDIR "/src/Inventory/Inventory.Supply.Web"
RUN dotnet build "Inventory.Supply.Web.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Inventory.Supply.Web.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Inventory.Supply.Web.dll"]
