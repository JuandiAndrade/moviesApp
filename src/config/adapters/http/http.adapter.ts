// hacemos esto por si se cambia la libreria, necesitamos adaptar nuestra app por cualquier cambio que surja en la libreria y que no nos perjudique



export abstract class HttpAdapter {

   abstract get<T>(url: string, options?: Record<string, unknown>): Promise<T>;
//    si queremos hacerla de una forma muy generica seria:
//    abstract get<T>(url: string, options: any): Promise<any>;


}



