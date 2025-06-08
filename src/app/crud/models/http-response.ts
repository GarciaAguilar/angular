export interface HttpResponse {
    result: string;
    message: string;
    data?: any[]; // Cambiado a any[] para permitir un array de datos
}
