# 🧩 Task App (Angular Modern Architecture)

Proyecto base para practicar **Angular moderno** con arquitectura escalable basada en:

- Signals
- Facade pattern
- Feature-based structure
- Mock + HTTP API abstraction
- Store pattern (estado reactivo)
- ViewModel (VM)
- Mutators / Hydration / Reset / Snapshots

---

## 📦 Objetivo del proyecto

Implementar un CRUD de **Tasks** usando una arquitectura profesional similar a sistemas reales (tipo ERP / backoffice), separando:

- UI
- Estado
- Lógica de negocio
- Acceso a datos
- Mapeo de datos

---

## 🏗️ Arquitectura

```

src/app/
│
├── core/
│   ├── api/          # Contratos (abstract API)
│   ├── http/         # Implementación real HttpClient
│   ├── mock/         # Mock backend (simulación)
│   └── models/       # Tipos globales
│
├── features/
│   └── task/
│       ├── feature/  # Casos de uso (CRUD business logic)
│       ├── store/    # Signals + estado + mutators + VM
│       ├── facade/   # API única para componentes
│       ├── pages/    # Containers (smart components)
│       ├── components/# UI components (dumb components)
│       └── mappers/  # mapping DTO ↔ model
│
└── shared/
├── ui/
├── utils/
└── constants/

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
- hydrate()

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

- task.http.service.ts → backend real
- task.mock.service.ts → datos simulados

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

## 🚀 Tecnologías

- Angular 21
- Signals
- RxJS (solo API layer)
- TypeScript strict mode
- Standalone components
- Angular control flow (@if, @for)

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
