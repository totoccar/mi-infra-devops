export const trackProjectClick = async (projectId: string) => {
    const lambdaUrl = process.env.NEXT_PUBLIC_ANALYTICS_LAMBDA_URL;

    if (!lambdaUrl) {
        return;
    }

    try {
        const response = await fetch(lambdaUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ projectId }),
        });

    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.warn("Error tracking project click:", error);
        }
    }
};