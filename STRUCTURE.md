## 📁 Project Structure & Architecture

This Angular project follows a scalable, feature-oriented architecture inspired by Angular best practices, Clean Architecture, and modern Angular (v17+) patterns such as standalone components, signals, and lazy loading.

The goals are:
- Clear separation of concerns
- Easy scalability
- Predictable code organization

--------------------------------------------------

🌳 Global Structure

src/
└── app/
    ├── core/
    ├── shared/
    ├── features/
    ├── app.routes.ts
    ├── app.component.ts
    └── app.config.ts

Each top-level folder has a single, well-defined responsibility.

--------------------------------------------------

🧠 core/ — Application Infrastructure

Loaded once. Used everywhere. Never feature-specific.

The core folder contains singleton services and global infrastructure required by the entire application.

core/
├── services/
│   ├── api/
│   │   └── http-client.service.ts
│   ├── auth.service.ts
│   └── storage.service.ts
├── guards/
│   └── auth.guard.ts
├── interceptors/
│   └── auth.interceptor.ts
├── models/
│   └── user.model.ts
├── tokens/
│   └── api-url.token.ts
└── core.providers.ts

Contains:
- API and HTTP services
- Authentication logic
- Guards and interceptors
- Global application models
- Injection tokens and configuration

Rules:
- Imported only once (via app.config.ts)
- Never imported into features/ or shared/
- No UI components

--------------------------------------------------

🧩 shared/ — Reusable UI & Utilities

Stateless, reusable building blocks.

The shared folder contains elements that can be reused across multiple features.

shared/
├── components/
│   ├── button/
│   └── modal/
├── directives/
│   └── autofocus.directive.ts
├── pipes/
│   └── truncate.pipe.ts
├── models/
│   └── pagination.model.ts
└── shared.imports.ts

Contains:
- Reusable UI components
- Pipes and directives
- Small utility models

Rules:
- No business logic
- No stateful services
- Safe to import anywhere

--------------------------------------------------

🧭 features/ — Business Domains

Each feature represents a business domain and owns its UI, logic, models, and routes.

features/
├── auth/
│   ├── pages/
│   │   └── login/
│   │       └── login.page.ts
│   ├── services/
│   │   └── auth.facade.ts
│   ├── models/
│   │   └── credentials.model.ts
│   └── auth.routes.ts
│
├── dashboard/
│   ├── pages/
│   ├── components/
│   ├── services/
│   ├── models/
│   └── dashboard.routes.ts
│
└── settings/

A feature may contain:
- pages/ → routed components
- components/ → feature-specific UI
- services/ → facades and business logic
- models/ → feature-specific models
- *.routes.ts → lazy-loaded routes

Rules:
- Features are isolated from each other
- No direct imports between features
- Routes belong to the feature
- Designed for lazy loading

--------------------------------------------------

🧬 Models: Where Should They Live?

Global models:
core/models/user.model.ts

Feature-specific models:
features/orders/models/order.model.ts

Rule of thumb:
- Used across multiple features → core
- Used only inside one feature → keep it inside that feature

--------------------------------------------------

⚙️ Services & Facades

Services inside features act as facades:
- They expose state (often via signals)
- They hide HTTP, storage, and implementation details
- Components remain simple and declarative

Example (conceptual):

@Injectable({ providedIn: 'root' })
export class CartFacade {
  private readonly _items = signal<CartItem[]>([]);
  readonly items = this._items.asReadonly();
}

--------------------------------------------------

🧩 Modules vs Standalone Components

This project supports:
- Standalone components (recommended)
- Optional NgModules for legacy compatibility

The folder structure remains identical in both cases.

--------------------------------------------------

✅ Architecture Rules Summary

- core/ → infrastructure and singletons
- shared/ → reusable, stateless UI and utilities
- features/ → business logic and routes
- Keep models close to where they are used
- Prefer facades over “god services”
- Design features to be lazy-loadable
- Favor signals for state management

--------------------------------------------------

This structure scales well from small applications to large projects and works seamlessly with Angular, Capacitor, and modern reactive patterns.

## 🔗 Dependency Flow Diagram

This diagram shows the allowed dependency directions inside the application.

The architecture is intentionally layered to avoid tight coupling
and uncontrolled imports.

--------------------------------------------------

                ┌────────────────────┐
                │    app.config.ts   │
                │  app.routes.ts     │
                └─────────┬──────────┘
                          │
                          ▼
                ┌────────────────────┐
                │       core/        │
                │  (infrastructure) │
                │                    │
                │  - API services    │
                │  - Auth            │
                │  - Interceptors    │
                │  - Guards          │
                │  - Global models   │
                └─────────┬──────────┘
                          │
                          ▼
                ┌────────────────────┐
                │     features/      │
                │  (business logic) │
                │                    │
                │  - Routes          │
                │  - Pages           │
                │  - Components      │
                │  - Facades         │
                │  - Feature models  │
                └─────────┬──────────┘
                          │
                          ▼
                ┌────────────────────┐
                │      shared/       │
                │  (UI & utilities) │
                │                    │
                │  - UI components   │
                │  - Pipes           │
                │  - Directives      │
                │  - Utility models  │
                └────────────────────┘

--------------------------------------------------

### Allowed Dependencies

✔ app → core  
✔ app → features  
✔ app → shared  

✔ features → core  
✔ features → shared  

✔ shared → (nothing)

--------------------------------------------------

### Forbidden Dependencies

✖ core → features  
✖ core → shared  

✖ shared → core  
✖ shared → features  

✖ feature → feature (direct imports)

--------------------------------------------------

### Why This Matters

- Prevents circular dependencies
- Keeps business logic isolated
- Makes lazy loading safe and predictable
- Improves long-term maintainability
- Enables easier testing and refactoring
