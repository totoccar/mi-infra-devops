const FALLBACK_ANALYTICS_LAMBDA_URL = "https://b6y4yjjfr3zh2xypefpgrbncge0pfwrc.lambda-url.us-east-1.on.aws/";

export const trackProjectClick = async (projectId: string) => {
    const lambdaUrl = process.env.NEXT_PUBLIC_ANALYTICS_LAMBDA_URL ?? FALLBACK_ANALYTICS_LAMBDA_URL;
    const payload = JSON.stringify({ projectId });

    try {
        if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
            const beaconSent = navigator.sendBeacon(lambdaUrl, new Blob([payload], { type: "application/json" }));

            if (beaconSent) {
                return;
            }
        }

        await fetch(lambdaUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: payload,
            keepalive: true,
        });
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.warn("Error tracking project click:", error);
        }
    }
};