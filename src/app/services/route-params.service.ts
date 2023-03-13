import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RouteParamsService {
    pokemonTrackId = new BehaviorSubject<number | null>(null)
}