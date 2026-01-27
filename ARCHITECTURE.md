# Architecture Overview

This document describes the architectural principles, layering, and dependency rules of the application.

The architecture is designed to be:
- scalable
- predictable
- easy to reason about
- compatible with modern Angular (v17+), standalone components, signals, and lazy loading

--------------------------------------------------

## 🧠 Architectural Goals

The primary goals of this architecture are:

- Enforce clear separation of concerns
- Prevent uncontrolled dependencies
- Make features independently evolvable
- Keep UI components simple and declarative
- Support long-term maintainability

--------------------------------------------------

## 🧩 High-Level Architecture

The application is divided into three main layers:

- core/      → application infrastructure
- shared/    → reusable UI and utilities
- features/  → business domains

Each layer has a single responsibility and strict dependency rules.

--------------------------------------------------

## 🌳 Application Structure

src/
└── app/
    ├── core/
    ├── shared/
    ├── features/
    ├── app.routes.ts
    ├── app.component.ts
    └── app.config.ts

--------------------------------------------------

## 🧠 core/ — Infrastructure Layer

Purpose:
- Provide application-wide infrastructure
- Host singleton services

Typical contents:
- API and HTTP services
- Authentication and authorization
- Guards and interceptors
- Global models
- Injection tokens and configuration

Rules:
- No UI components
- No feature-specific logic
- Imported only once (via app.config.ts)
- Must not depend on shared/ or features/

--------------------------------------------------

## 🧩 shared/ — Reusable Building Blocks

Purpose:
- Provide reusable, stateless UI and utilities

Typical contents:
- UI components (buttons, modals, etc.)
- Pipes and directives
- Utility models

Rules:
- No business logic
- No stateful services
- Must not depend on core/ or features/
- Safe to import anywhere

--------------------------------------------------

## 🧭 features/ — Business Domains

Purpose:
- Encapsulate business logic by domain
- Enable independent evolution and lazy loading

Each feature owns:
- Its routes
- Its pages and components
- Its services (facades)
- Its models

Rules:
- Features must not import from other features
- Routes belong to the feature
- Business logic lives here
- Designed for lazy loading

--------------------------------------------------

## 🔗 Dependency Rules

Allowed dependencies:

- app → core
- app → shared
- app → features

- features → core
- features → shared

Forbidden dependencies:

- core → shared
- core → features

- shared → core
- shared → features

- feature → feature (direct imports)

--------------------------------------------------

## 📊 Dependency Flow Diagram

app
 ├── core
 ├── features
 │    └── shared
 └── shared

Shared is the lowest-level layer and must not depend on any other layer.

--------------------------------------------------

## ⚙️ Services & Facades

Services inside features act as facades.

Responsibilities:
- Expose application state (preferably via signals)
- Orchestrate business logic
- Hide infrastructure details (HTTP, storage, etc.)

Guidelines:
- Components should not contain business logic
- Components should not perform HTTP calls
- Avoid "god services"

--------------------------------------------------

## 🧬 Models

Model placement rules:
- Models used across multiple features go in core/models
- Feature-specific models stay inside the feature
- Avoid generic, cross-cutting model folders

--------------------------------------------------

## 🧩 Standalone Components & Modules

Preferred approach:
- Use standalone components
- Declare imports locally
- Use route-level providers

NgModules are allowed only when required for legacy or compatibility reasons.

The folder structure remains unchanged regardless of the approach.

--------------------------------------------------

## 🧪 Testing Strategy

Testing principles:
- Unit test facades and services
- Test public APIs, not implementation details
- Shared components should be testable in isolation
- Avoid cross-layer test coupling

--------------------------------------------------

## 🚫 Anti-Patterns

The following patterns are explicitly discouraged:

- Circular dependencies
- Cross-feature imports
- Logic-heavy components
- Global mutable state
- Infrastructure leaking into features
- Business logic in shared/

--------------------------------------------------

## 📌 Enforcement

Architecture rules are enforced through:
- Code reviews
- Linting rules (recommended)
- This document as the single source of truth

Any deviation must be justified and documented.

--------------------------------------------------

## 🧠 Final Notes

Architecture is a tool, not a goal.

These rules exist to:
- protect the codebase over time
- make onboarding easier
- reduce cognitive load
- support safe refactoring

When in doubt, prefer clarity over cleverness.
