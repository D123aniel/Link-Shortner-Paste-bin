import { Component, WritableSignal, signal, OnInit } from '@angular/core';
import { CreateResourceService, Resource } from '../create-resource.service';

@Component({
  selector: 'app-list-link',
  imports: [],
  templateUrl: './list-link.component.html',
  styleUrl: './list-link.component.css',
})
export class ListLinkComponent implements OnInit {
  constructor(private createResourceService: CreateResourceService) {}

  resources: WritableSignal<Resource[] | null> = signal(null);

  ngOnInit() {
    this.createResourceService.listResources().subscribe({
      next: (response: Resource[]) => {
        console.log('Resources fetched successfully: ', response);
        this.resources.set(response);
      },
      error: (error) => {
        console.error('Error fetching resources: ', error);
      },
      complete: () => {
        console.log('Resource fetching complete');
      },
    });
  }
}
