import { getCodeReview } from "../services/ai.service.js";


export async function getReview(req, res) {
    const { code } = req.body;
    if (!code) {
        return res.status(400).send({ error: 'Code is required' });
    }

    try {
        const review = await getCodeReview(code);
        res.status(200).send({ review });
    } catch (error) {
        logger.error("Error during code review:", error);
        res.status(500).send({ error: 'Failed to get code review', details: error.message });
    }
}