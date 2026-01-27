# Contributing Guide

Thank you for contributing to this project ❤️  
This document defines the architectural and coding rules that keep the codebase clean, scalable, and maintainable.

--------------------------------------------------

## 🧠 Architecture Principles

This project follows a **feature-oriented architecture** with three main layers:

- core/      → application infrastructure
- shared/    → reusable, stateless UI & utilities
- features/  → business domains

Each layer has strict responsibilities and dependency rules.

--------------------------------------------------

## 📁 Folder Responsibilities

### core/

Purpose:
- Application-wide infrastructure
- Singleton services

Contains:
- API and HTTP services
- Authentication
- Interceptors and guards
- Global models
- Injection tokens

Rules:
- No UI components
- Imported only once (via app.config.ts)
- Must not depend on shared/ or features/

--------------------------------------------------

### shared/

Purpose:
- Reusable and stateless building blocks

Contains:
- UI components
- Pipes and directives
- Utility models

Rules:
- No business logic
- No stateful services
- Must not depend on core/ or features/

--------------------------------------------------

### features/

Purpose:
- Business domains and use cases

Each feature owns:
- Its routes
- Its UI
- Its services (facades)
- Its models

Rules:
- Features must not import from other features
- Business logic lives here
- Routes belong to the feature
- Designed for lazy loading

--------------------------------------------------

## 🔗 Dependency Rules (Mandatory)

Allowed:
- app → core
- app → features
- app → shared
- features → core
- features → shared

Forbidden:
- core → shared
- core → features
- shared → core
- shared → features
- feature → feature

Violations must be fixed before merge.

--------------------------------------------------

## ⚙️ Services & State Management

### Facades

Feature services act as **facades**:
- Expose state (preferably via signals)
- Hide HTTP and storage details
- Keep components declarative

Avoid:
- God services
- Business logic in components
- Direct HTTP calls from components

--------------------------------------------------

## 🧬 Models

Rules:
- Models used across multiple features go in core/models
- Feature-specific models stay inside the feature
- Do not create generic model folders at app root

--------------------------------------------------

## 🧩 Standalone Components

Preferred approach:
- Use standalone components
- Declare imports locally
- Use route-level providers when possible

NgModules are allowed only when required for compatibility.

--------------------------------------------------

## 🧪 Testing Guidelines

- Unit tests for facades and services
- Avoid testing implementation details
- Prefer testing public API (signals, methods)
- Shared components should be easily testable in isolation

--------------------------------------------------

## ✅ Pull Request Checklist

Before submitting a PR, ensure:

- Folder placement respects architecture rules
- No forbidden dependencies introduced
- No unused exports or dead code
- Feature logic is isolated
- Shared components remain stateless
- Code follows existing naming conventions

--------------------------------------------------

## 🚫 What We Avoid

- Circular dependencies
- Cross-feature imports
- Logic-heavy components
- Global mutable state
- Tight coupling between layers

--------------------------------------------------

## 📌 Final Note

Architecture rules are not optional.

They exist to:
- keep the codebase understandable
- prevent long-term technical debt
- allow the project to scale safely

If in doubt, ask before implementing.

Happy coding 🚀
