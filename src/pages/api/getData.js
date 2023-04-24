import admin from '../../utils/firebase-admin';

const db = admin.firestore();

export default async (req, res) => {
    const snapshot = await db.collection('my_collection').get();
    const data = snapshot.docs.map(doc => doc.data());
    // console.info('data received', data);
    res.status(200).json(data);
};