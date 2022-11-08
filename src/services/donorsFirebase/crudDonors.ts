import { setDoc, getDocs, doc, DocumentData, query, collection, orderBy } from "firebase/firestore";
import { format } from 'date-fns'

import db from "services/firebaseConnection";

import { IDonor, IMethodsCRUDDonors } from "./interface";


const crudDonors = (): IMethodsCRUDDonors => {

    async function registerDonor({ donate, lastDonate, image, userId }: IDonor): Promise<IDonor> {

        try {
            await setDoc(doc(db, "donors", userId || ""), {
                donate: donate,
                lastDonate: lastDonate,
                image: image
            });

            const dataDonor = {
                donate: donate,
                created_formatted: format(new Date(), 'dd MMMM yyyy'),
                lastDonate: lastDonate,
                image: image,
            }

            return dataDonor
        } catch (e) {
            console.error("Error adding document donor: ", e);
            throw new Error("Erro ao registrar doador no banco!")
        }
    }

    async function getDonors(): Promise<DocumentData[] | []> {
        let listDonors: Array<DocumentData> = []

        try {
            const q = query(collection(db, "donors"));

            const donors = await getDocs(q);

            donors.forEach((doc) => {
                listDonors.push({
                    id: doc.id,
                    lastDonateFormatted: format(doc.data().lastDonate.toDate(), 'dd MMMM yyyy'),
                    ...doc.data()
                })
            });

            return listDonors
        } catch (e) {
            console.error("Error list donors: ", e);
            throw new Error("Erro ao trazer os doadores do banco!")
        }
    }

    return {
        registerDonor,
        getDonors,
    }
}

export default crudDonors