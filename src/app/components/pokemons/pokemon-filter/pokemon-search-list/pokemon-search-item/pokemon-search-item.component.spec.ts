import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonSearchItemComponent } from './pokemon-search-item.component';

describe('PokemonSearchItemComponent', () => {
  let component: PokemonSearchItemComponent;
  let fixture: ComponentFixture<PokemonSearchItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonSearchItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonSearchItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
