import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

bootstrapApplication(AppComponent ,{...appConfig,
  providers: [...(appConfig.providers || []), provideHttpClient(), SwalComponent]
})
  .catch((err) => console.error(err));
