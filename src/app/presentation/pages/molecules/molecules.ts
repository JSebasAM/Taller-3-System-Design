import { Component } from '@angular/core';
import {
  AppCardMolecule,
  BadgeType,
  ButtonGroupData,
  ButtonGroupMolecule,
  CarouselControlMolecule,
  ContainerAtom,
  ImageAtom,
  NavLink,
  NavLinkMolecule,
} from '@brejcha13320/design-system-bootstrap';

@Component({
  templateUrl: './molecules.html',
  imports: [
    ContainerAtom,
    ButtonGroupMolecule,
    NavLinkMolecule,
    AppCardMolecule,
    CarouselControlMolecule,
    ImageAtom,
  ],
})
export class Molecules {
  buttonsGroupData: ButtonGroupData[] = [
    { idButton: 'idButtonPrimary', type: 'primary', text: 'Text Primary' },
    { idButton: 'idButtonSecondary', type: 'secondary', text: 'Text Secondary' },
    { idButton: 'idButtonSuccess', type: 'success', text: 'Text Success' },
    { idButton: 'idButtonDanger', type: 'danger', text: 'Text Danger' },
    { idButton: 'idButtonWarning', type: 'warning', text: 'Text Warning' },
    { idButton: 'idButtonInfo', type: 'info', text: 'Text Info' },
    { idButton: 'idButtonLight', type: 'light', text: 'Text Light' },
    { idButton: 'idButtonDark', type: 'dark', text: 'Text Dark' },
  ];

  navLinks: NavLink[] = [
    { text: 'Link 1', url: '/atoms' },
    { text: 'Link 2', url: '/molecules' },
    { text: 'Link 3', url: '/organisms' },
  ];

  carouselTotal: number = 5;
  carouselIndex: number = 0;

  onCarouselSlideChange(index: number): void {
    this.carouselIndex = index;
  }

  onClick(idButton: string){
    alert(`Click en el Boton de Grupo ${idButton}`);
  }
}


