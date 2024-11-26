import {Insertable, Selectable, Updateable} from "kysely/dist/esm/index.js";
import {Pets} from "kysely-codegen";

export interface PetStoreServiceInterface {
    store(petData: Insertable<Pets>): Promise<Selectable<Pets>>
}