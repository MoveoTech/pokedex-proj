import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonSearchLogComponent } from './pokemon-search-log.component';

describe('PokemonSearchLogComponent', () => {
  let component: PokemonSearchLogComponent;
  let fixture: ComponentFixture<PokemonSearchLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonSearchLogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonSearchLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
