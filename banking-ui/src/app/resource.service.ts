import { OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { RequestOptions } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class ResourceService<T extends Resource> implements OnInit {

  ngOnInit(): void {
    
  }

  constructor(
    public httpClient: HttpClient,
    public endpoint: string,
    public url?: string) { 
      if(!this.url)
        this.url = environment.urlApi;
      else
        this.url = url;
    }

    public page(expand='', textSearch='',filter = '', sort = 'Id asc', pageIndex = 0, pageSize = 3): Observable<HttpResponse<Object>> {
      let queryOption = new QueryOption (expand,textSearch,filter ,sort, pageIndex, pageSize) ;
      return this.httpClient
        .get(`${this.url}/${this.endpoint}/page?${queryOption.getParams()}`,{ observe: 'response' })
    }

    public all(expand='',textSearch='' , filter = '', sort = 'Id asc'): Observable<T[]> {
      let headers = new HttpHeaders();
      let queryOption = new QueryOption (expand,textSearch,filter ,sort, undefined, undefined) ;
  
      return this.httpClient
        // .get<T[]>(`${this.url}/${this.endpoint}/all?${queryOption.getParams()}`,{headers:headers})
        .get<T[]>(`${this.url}/${this.endpoint}`,{headers:headers})
        .pipe(
          map(data => data as T[]),
          catchError(error => {
            return Observable.throw(error);
          })
        );
    }

    public single(id: number): Observable<T> {
      let headers = new HttpHeaders();
      var reqHeader = new HttpHeaders();
  
      return this.httpClient
        .get(`${this.url}/${this.endpoint}/${id!=null?id:''}`,{headers:reqHeader})
        .pipe(
          map((data: any) => data as T),
          catchError(error => {
            return Observable.throw(error);
          })
        );
    }

    public insert(item: T,router?:string): Observable<T> {
  
      return this.httpClient
        .post<T>(`${this.url}/${this.endpoint}${!router?'':'/'+router}`, JSON.stringify(item), httpOptions)
        .pipe(
          map((data: any) => data as T),
          catchError(error => {
            return Observable.throw(error);
          })
        );
    }

    public createUpload(item: T,url:string=null): Observable<T> {
      var reqHeader=new HttpHeaders();
      return this.httpClient
        .post<T>(`${url}`, item,{headers:reqHeader})
        .pipe(
          map((data: any) => data as T),
          catchError(error => {
            return Observable.throw(error);
          })
        );
    }

  public update(item: T): Observable<T> {
    return this.httpClient
      .put<T>(`${this.url}/${this.endpoint}?id=${item.Id}`, JSON.stringify(item),httpOptions)
      .pipe(
        map((data: any) => data as T),
        catchError(error => {
          return Observable.throw(error);
        })
      ); 
  }

  public delete(id: number) {
    return this.httpClient
      .delete(`${this.url}/${this.endpoint}?id=${id}`);
  }

  // Async methods:

  pageAsync(expand='', textSearch='',filter = '', sort = 'Id asc', pageIndex = 0, pageSize = 3): Promise<HttpResponse<Object>> {
    let queryOption = new QueryOption (expand,textSearch,filter ,sort, pageIndex, pageSize) ;
    return this.httpClient
      .get(`${this.url}/${this.endpoint}/page?${queryOption.getParams()}`,{ observe: 'response' }).toPromise()
  }

  allAsync(expand='',textSearch='' , filter = '', sort = 'Id asc'): Promise<T[]> {
    let headers = new HttpHeaders();
    let queryOption = new QueryOption (expand,textSearch,filter ,sort, undefined, undefined) ;

    return this.httpClient
      .get(`${this.url}/${this.endpoint}/all?${queryOption.getParams()}`,{headers:headers})
      .pipe(
        map(data => data as T[]),
        catchError(error => {
          return Observable.throw(error);
        })
      ).toPromise();
  }

  singleAsync(id: number): Promise<T> {
    let headers = new HttpHeaders();
    var reqHeader = new HttpHeaders();

    return this.httpClient
      .get(`${this.url}/${this.endpoint}/${id!=null?id:''}`,{headers:reqHeader})
      .pipe(
        map((data: any) => data as T),
        catchError(error => {
          return Observable.throw(error);
        })
      ).toPromise();


  }

  public convertData(data: any): T[] {
    return data.map(item => item);
  }

}


export class Resource {
  Id: number
}


export interface Serializer {
  fromJson(json: any): Resource;
  toJson(resource: Resource): any;
}

export class QueryOption {
  expand: string;
  textSearch:string;
  filter: string;
  sort: string;
  page: number;
  pageSize: number;

  constructor(
    expand: string, 
    textSearch:string , 
    filter: string, 
    sort: string, 
    page: number, 
    pageSize: number) {
    this.expand = expand;
    this.filter = filter;
    this.sort = sort;
    this.page = page;
    this.pageSize = pageSize;
    this.textSearch=textSearch;

  }

  getParams(): string {
    let text:string='1=1';

    let params: string = [
      `expand=${this.expand || ''}`,
      `search=${this.textSearch || ''}`,
      `filter=${text} AND (${this.filter || '1=1'})`,
      `sort=${this.sort || ''}`,
      `page=${this.page || 0}`,
      `pageSize=${this.pageSize || 0}`,
    
    ].join('&');

    return params;
  }

}
  
