export const translateTextsDirectly = async (texts: any[], toLang: string) => {
    const apiKey = process.env.REACT_APP_TRANSLATOR_API_KEY;
    const endpoint = process.env.REACT_APP_TRANSLATOR_ENDPOINT;
    const region = process.env.REACT_APP_TRANSLATOR_REGION;

    if (!apiKey || !endpoint || !region) {
        console.error("Translator API configuration is missing in .env file.");
        return texts.map(() => null);
    }

    const url = `${endpoint}/translate?api-version=3.0&to=${toLang}`;
    const headers = {
        'Ocp-Apim-Subscription-Key': apiKey,
        'Ocp-Apim-Subscription-Region': region,
        'Content-Type': 'application/json',
    };

    const body = texts.map((text: string) => ({ text }));

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        });

        const data = await response.json();
        return data.map((item: any) => item.translations[0].text);
    } catch (error) {
        console.error('Error translating texts:', error);
        return texts.map(() => null);
    }
};

