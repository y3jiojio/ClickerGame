import { NextResponse } from "next/server";

const { db } = require("@/app/firebase/config");
const { getTodayDate } = require("@/utils/fuctions");
import { collection, query, orderBy, limit, getDocs  } from "firebase/firestore"; 
export const dynamic = "force-dynamic"

export async function GET(req) {

    async function getTopFiveDocumentsFromCollection(collectionName) {
        try {
            const collectionRef = collection(db, collectionName);
            const q = query(collectionRef, orderBy('numberOfClicks', 'desc'), limit(5));
            const querySnapshot = await getDocs(q);
            const documents = [];
            querySnapshot.forEach((doc) => {
                documents.push({ id: doc.id, ...doc.data() });
            });
            return documents;
        } catch (error) {
            return NextResponse.json(
                {
                    error: `Something went wrong`,
                },
                { status: 500 }
            );
        }

    }

    try {
        const collections = [`mascot1_${getTodayDate()}`, `mascot2_${getTodayDate()}`, `mascot3_${getTodayDate()}`];

        const [leaderboard1, leaderboard2, leaderboard3] = await Promise.all(collections.map(collectionName => getTopFiveDocumentsFromCollection(collectionName)));
       
        return NextResponse.json(
            {
                message: `LeaderBoard Data`,
                data: {
                    leaderboard1, leaderboard2, leaderboard3
                }
            },
            { status: 201 }
        );
    } catch (error) {


        return NextResponse.json(
            {
                error: `Something went wrong`,
            },
            { status: 500 }
        );

    }


}

