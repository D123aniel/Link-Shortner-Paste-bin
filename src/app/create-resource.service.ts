import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

export interface Resource {
  id: string;
  content: string;
  vanity_url: string;
  type: string;
  expiration_time: number;
  access_count: number;
}

@Injectable({
  providedIn: 'root',
})
export class CreateResourceService {
  constructor(protected http: HttpClient) {}

  private link_address =
    'https://pastelinkapi.thankfulstone-7551a8ee.eastus.azurecontainerapps.io';

  createResource(
    resource_type: string,
    resource_content: string
  ): Observable<string> {
    var direct = '';
    if (resource_type === 'text') {
      direct = 'create-text';
    } else if (resource_type == 'link') {
      direct = 'shorten-url';
    }
    return this.http.post<string>(`${this.link_address}${direct}`, {
      id: '',
      content: resource_content,
      vanity_url: '',
      type: resource_type,
      expiration_time: -1,
    });
    // return of('https://foo.bar');
  }

  getLink(resource_id: string): Observable<string> {
    return this.http.get<string>(`${this.link_address}${resource_id}`);
  }

  listResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.link_address}admin/resources`);
  }
}
