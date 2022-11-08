import { addDoc, collection } from "firebase/firestore";
import { format } from 'date-fns'

import db from "services/firebaseConnection";

import { IDonor, IMethodsCRUDDonors } from "./interface";


const crudDonors = (): IMethodsCRUDDonors => {

    async function registerDonor({ donate, lastDonate, image }: IDonor): Promise<IDonor> {

        try {
            const docRef = await addDoc(collection(db, "donor"), {
                donate: donate,
                lastDonate: lastDonate,
                image: image
            });

            const data = {
                docRef: docRef.id,
                donate: donate,
                created_formatted: format(new Date(), 'dd MMMM yyyy'),
                lastDonate: lastDonate,
                image: image,
            }

            return data
        } catch (e) {
            console.error("Error adding document donor: ", e);
            throw new Error("Erro ao registrar doador no banco!")
        }
    }

    return {
        registerDonor,
    }
}

export default crudDonors