import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify({logger: true});

server.register(cors, {
    origin: "*",
});

const teams = [
    { "id": 1, "name": "Red Bull Racing", "base": "Milton Keynes, United Kingdom" },
    { "id": 2, "name": "McLaren", "base": "Woking, United Kingdom" },
    { "id": 3, "name": "Ferrari", "base": "Maranello, Italy" },
    { "id": 4, "name": "Mercedes", "base": "Brackley, United Kingdom" },
    { "id": 5, "name": "Aston Martin", "base": "Silverstone, United Kingdom" },
    { "id": 6, "name": "Alpine", "base": "Enstone, United Kingdom" },
    { "id": 7, "name": "Haas", "base": "Kannapolis, United States" },
    { "id": 8, "name": "Williams", "base": "Grove, United Kingdom" },
    { "id": 9, "name": "AlphaTauri", "base": "Faenza, Italy" },
    { "id": 10, "name": "Alfa Romeo", "base": "Hinwil, Switzerland" }
  ];

server.get("/teams",async(request, response) => {
    response.type("application/json").code(200);
    return { teams };
});

const drivers = [
    { "id": 1, "name": "Max Verstappen", "team": "Red Bull Racing" },
    { "id": 2, "name": "Lando Norris", "team": "McLaren" },
    { "id": 3, "name": "Charles Leclerc", "team": "Ferrari" },
    { "id": 4, "name": "Lewis Hamilton", "team": "Mercedes" },
    { "id": 5, "name": "Fernando Alonso", "team": "Aston Martin" },
    { "id": 6, "name": "Esteban Ocon", "team": "Alpine" },
    { "id": 7, "name": "Kevin Magnussen", "team": "Haas" },
    { "id": 8, "name": "Alex Albon", "team": "Williams" },
    { "id": 9, "name": "Yuki Tsunoda", "team": "AlphaTauri" },
    { "id": 10, "name": "Valtteri Bottas", "team": "Alfa Romeo" }
  ];

server.get("/drivers",async(request, response) => {
    response.type("application/json").code(200);
    return { drivers };
});

interface DriverParams {
    id: string;
}

server.get<{Params:DriverParams}>("/drivers/:id",async(request, response) => {
    const id = parseInt(request.params.id);
    const driver = drivers.find(d => d.id === id);

    if(!driver) {
        response.type("application/json").code(404);
        return { message: "Driver not found." };
    } else {
        response.type("application/json").code(200);
        return { driver };
    }

});

server.listen({ port:3333 }, () => {
    console.log("server init.");
});