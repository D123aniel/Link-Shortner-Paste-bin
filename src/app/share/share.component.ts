import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateResourceService } from '../create-resource.service';

/**
 * Interface representing a resource submission from the form.
 */
interface ResourceSubmission {
  type: string;
  content: string;
}

@Component({
  selector: 'app-share',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './share.component.html',
  styleUrl: './share.component.css',
})
export class ShareComponent implements OnInit {
  shareForm!: FormGroup;

  submittedValues: WritableSignal<ResourceSubmission | null> = signal(null);
  isSubmitted: WritableSignal<boolean> = signal(false);
  generatedLink: WritableSignal<string | null> = signal(null);

  constructor(
    private formBuilder: FormBuilder,
    private createResourceService: CreateResourceService
  ) {}

  ngOnInit() {
    this.shareForm = this.formBuilder.group({
      type: ['text', [Validators.required]],
      content: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    if (this.shareForm.valid) {
      const resourceType: string = this.shareForm.get('type')?.value;
      const resourceContent: string = this.shareForm.get('content')?.value;
      const link_address = 'https://ex01-comp590-140-25sp-dzahng.apps.unc.edu/';
      // TODO: Replace this with actual submission logic!
      this.createResourceService
        .createResource(resourceType, resourceContent)
        .subscribe({
          next: (response: any) => {
            console.log('Resource created successfully: ', response);
            this.generatedLink.set(`${link_address}${response.id}`);
          },
          error: (error) => {
            console.log(resourceType);
            console.log(resourceContent);
            console.error('Error creating resource: ', error);
          },
          complete: () => {
            console.log('Resource creation completed');
          },
        });

      // Store the values for display in the submittedValues Signal
      this.submittedValues.set({
        type: resourceType,
        content: resourceContent,
      });
      this.isSubmitted.set(true);
    } else {
      // Mark all fields as touched to trigger validation visuals
      this.shareForm.markAllAsTouched();
    }
  }
}
