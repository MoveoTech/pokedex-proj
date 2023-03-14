import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonSearchListComponent } from './pokemon-search-list.component';

describe('PokemonSearchListComponent', () => {
  let component: PokemonSearchListComponent;
  let fixture: ComponentFixture<PokemonSearchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonSearchListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
