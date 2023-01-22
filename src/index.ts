import { config } from 'dotenv';
import { runServer } from "./server";

config();

const PORT: number = +(process.env.SERVER_PORT || 4000);

runServer(PORT);

