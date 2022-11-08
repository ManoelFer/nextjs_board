import { setDoc, getDocs, getDoc, doc, DocumentData, query, collection, orderBy } from "firebase/firestore";
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

    async function getDonor(docId: string): Promise<IDonor | null> {
        try {
            const docRef = doc(db, "donors", docId);

            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const { donate, lastDonate, image } = docSnap.data()

                const donorData = {
                    id: docSnap.id,
                    donate: donate,
                    lastDonate: lastDonate.toDate(),
                    lastDonateFormatted: format(lastDonate.toDate(), 'dd MMMM yyyy hh:mm:ss'),
                    image: image,
                }

                return donorData || null
            } else {
                return null
            }
        } catch (e) {
            console.error("Error find donor document: ", e);
            throw new Error("Erro ao trazer o doador do banco!")
        }
    }

    return {
        registerDonor,
        getDonors,
        getDonor,
    }
}

export default crudDonors