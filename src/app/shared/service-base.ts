import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export abstract class ServiceBase {
    protected baseUrl: string;

    constructor(protected readonly httpClient: HttpClient) {
        this.baseUrl = environment.apiBaseUrl;
    }

    protected get<T>(path: string): Observable<T[]> {
        return this.httpClient.get<T[]>(`${this.baseUrl}${path}`);
    }
}
