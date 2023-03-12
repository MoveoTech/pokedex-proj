import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPokemon } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss']
})
export class PokemonItemComponent {
  @Input() pokemon: any
  constructor(private router: Router, private route: ActivatedRoute){}
  onSelectPokemon() {
    this.router.navigate([this.pokemon.id], {relativeTo: this.route})
  }
}
