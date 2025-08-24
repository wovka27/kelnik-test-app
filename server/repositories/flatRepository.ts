import data from "~~/public/data/flats.json";
import type { Flat } from "~~/server/types/flats";

export const getAllFlats = async (): Promise<Flat[]> => data as Flat[];
