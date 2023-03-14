import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RouteParamsService {
    paramTrackSubject = new BehaviorSubject<boolean>(false)
}