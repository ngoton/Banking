import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject, Observable, of } from "rxjs";
import { CollectionViewer } from "@angular/cdk/collections";
import { catchError, finalize } from "rxjs/operators";
import { HttpResponse } from "@angular/common/http";
import { ResourceService, Resource } from "./resource.service";

export class FilesDataSource<T extends ResourceService<any>> {

    public lessonsSubject = new BehaviorSubject<any[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();
    public length : any = 0;

    constructor(private coursesService: T) {}

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        return this.lessonsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.lessonsSubject.complete();
        this.loadingSubject.complete();
    }

    loadLessons(filter = '', textSearch='', sortDirection = 'Id desc', pageIndex = 0, pageSize = 10,expand='') {

        this.loadingSubject.next(true);

       // this.coursesService.findLessons(filter, sortDirection,
        //    pageIndex, pageSize); 

        this.coursesService.page(expand,textSearch,filter, sortDirection, pageIndex+1, pageSize)
        .pipe(
            catchError(() =>  of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe((response:HttpResponse<any>) => {
            this.length= JSON.parse(response.headers.get('X-Paging-Header')).TotalRecordCount;
            this.lessonsSubject.next(response.body);            
            }
        );
    }  
}