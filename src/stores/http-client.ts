import { HttpClient } from '@/utils';

const httpClient: HttpClient = new HttpClient(
    import.meta.env.VITE_BASE_BACKEND_URL || '/',
    import.meta.env.VITE_CRYPTOCOMPARE_API_KEY || ''
);

export default httpClient;
