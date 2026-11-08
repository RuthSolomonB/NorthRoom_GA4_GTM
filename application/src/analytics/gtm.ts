declare global {
    interface Window {
        dataLayer: Record<string, any>[];
    }
}

window.dataLayer = window.dataLayer || [];

export function pushEvent (event: string, ecommerce: Record<string, any>) {
    window.dataLayer.push({ecommerce: null}); // Clear previous ecommerce data so old data is not sent with new data

    window.dataLayer.push({ 
        event,
        ecommerce
    });
}