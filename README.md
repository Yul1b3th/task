# 🧩 Task App (Angular Modern Architecture)

Proyecto base para practicar **Angular moderno** con arquitectura escalable basada en:

- Signals
- Facade pattern
- Feature-based structure
- Mock + HTTP API abstraction
- Store pattern (estado reactivo)
- ViewModel (VM)
- Mutators / Reset / Snapshots

---

## 📦 Objetivo del proyecto

Implementar un CRUD de **Tasks** usando una arquitectura profesional similar a sistemas reales (tipo ERP / backoffice), separando:

- UI
- Estado
- Lógica de negocio
- Acceso a datos
- Mapeo de datos

---

## 💻 Tecnologías Utilizadas

- [HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
- [SCSS](https://sass-lang.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Angular CLI](https://angular.dev/) version 21.2.11
- [Material](https://material.angular.dev/) version 21.2.10
- [RxJs](https://rxjs.dev/) version 7.8.0

---

## 🏗️ Arquitectura

```

src/app/
│
├── core/
│
├── features/
│   └── task/
│       ├── data/
│       │   ├── task.api.ts
│       │   ├── task.facade.ts
│       │   ├── task.http.ts
│       │   ├── task.mock.ts
│       │   └── task.store.ts
│       ├── layout/
│       │   ├── task-footer/
│       │   ├── task-header/
│       │   ├── task-layout/
│       │   │   ├── task-layout.html
│       │   │   ├── task-layout.scss
│       │   │   └── task-layout.ts
│       │   └── task-sidenav/
│       ├── navigation/
│       │   ├── task-navigation.service.ts
│       │   ├── task-navigation.types.ts
│       │   └── task.navigation.ts
│       ├── pages/
│       │   ├── task-create/
│       │   ├── task-detail/
│       │   ├── task-edit/
│       │   └── task-list/
│       ├── task.dto.ts
│       ├── task.mapper.ts
│       ├── task.routes.ts
│       └── task.types.ts
│
└── shared/

```

---

## 🧠 Flujo de datos

```

Component
↓
Facade
↓
Feature (casos de uso)
↓
Store (signals)
↓
API (mock o HTTP)

```

---

## 🧩 Conceptos implementados

### 1. Signals Store

Gestión del estado reactivo:

- state()
- computed()
- mutators()
- reset()

---

### 2. ViewModel (VM)

Datos listos para UI:

- filtros aplicados
- listas derivadas
- estados derivados (loading, empty, error)

---

### 3. Facade Pattern

Capa única de acceso desde Angular:

- encapsula store + feature
- evita lógica en componentes

---

### 4. Feature Layer

Contiene lógica de negocio:

- createTask
- updateTask
- deleteTask
- loadTasks

---

### 5. API Layer

#### Abstract API

Define contrato:

- task.api.ts

#### Implementaciones:

- task.http.ts → backend real
- task.mock.ts → datos simulados

---

### 6. Snapshots

Permite:

- comparar estado anterior vs actual
- detectar cambios
- control de persistencia

---

## 📌 CRUD del proyecto

| Acción      | Capa        |
| ----------- | ----------- |
| Create Task | Feature     |
| Read Tasks  | Store + API |
| Update Task | Feature     |
| Delete Task | Feature     |

---

## 🔁 Mock system

El mock simula backend:

- delay artificial
- persistencia en memoria
- IDs autogenerados
- simulación de errores opcional

---

## 🧪 Recomendación de desarrollo

Orden recomendado:

1. models (Task)
2. api (contract)
3. mock service
4. store (signals)
5. feature (CRUD logic)
6. facade
7. components UI

---

## 🎯 Resultado esperado

Un CRUD limpio donde:

- el componente no tiene lógica
- el estado es centralizado
- la UI es reactiva
- el mock puede cambiarse por backend sin tocar UI
- la arquitectura escala fácilmente

---

## 📌 Nota

Este proyecto es una base de entrenamiento para migrar mentalidad de:

❌ service-driven architecture  
➡️  
✅ feature + store + facade architecture
