import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ApiResponse<T> {
    statusCode: number;
    message: string;
    data?: T;
}

@Injectable()
export class ApiResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
        return next.handle().pipe(map(data => {
            if(data == null)
            {
                return {
                    statusCode: 404,
                    message: "No se encontraron datos"
                }
            }
            else return {
                statusCode: 200,
                message: "OK",
                data: data
            };
        }));
    }

}