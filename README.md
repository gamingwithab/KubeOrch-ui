# KubeOrch UI

[![Apache 2.0 License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![CNCF Aspiring](https://img.shields.io/badge/CNCF-Aspiring-blue.svg)](https://www.cncf.io/projects/)

Visual interface for KubeOrch - Kubernetes made simple through drag-and-drop.

## 🎯 Vision

Make Kubernetes accessible to everyone. Design components visually, inspect the generated application model, and use supported delivery paths without treating catalog metadata as proof of a working external integration.

## 🚀 What is KubeOrch UI?

The frontend for designing and operating KubeOrch application workflows:

- **Visual Workflow Canvas** - Drag and drop services and model their relationships
- **Component Library** - Browse reusable Kubernetes-oriented building blocks
- **Extensions Catalog** - Enable optional CRD authoring metadata and node types for workflow design
- **Runtime API Configuration** - Connect the browser UI to the configured KubeOrch Core API
- **Progressive Configuration** - Start with focused controls and reveal advanced settings when needed

## Extensions and integrations

The current CRD catalog is called **Extensions**. Enabling an extension makes its authoring metadata and node types available in the UI; it does **not** mean that KubeOrch installed an operator, configured credentials, verified health, or tested operational compatibility.

KubeOrch reserves **Integration** for adapters that satisfy the community roadmap's operational contract, including authentication, capability discovery, health states, object mapping, credential handling, and disposable end-to-end compatibility testing. See [What Counts As An Integration](https://github.com/KubeOrch/community/blob/main/ROADMAP.md#what-counts-as-an-integration).

Older concept documents such as [`docs/idea.md`](docs/idea.md) and [`docs/component-palette.md`](docs/component-palette.md) describe historical or proposed product ideas. They are not statements of currently shipped behavior.

## ✨ Key Features

- 🎨 **Drag & Drop Designer** - Visual workflow creation with connection lines
- 🔌 **Authoring Connections** - Model relationships between workflow components
- 📦 **Component Library** - Reusable service and Kubernetes resource building blocks
- 🧩 **Extensions Catalog** - Browse optional authoring extensions while keeping support status separate from enablement
- 📊 **Logs and Monitoring Surfaces** - Present runtime information when supported by the configured backend

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **UI Components**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS v4
- **Canvas**: React Flow
- **State**: Zustand
- **Real-time**: WebSocket

## 🚦 Quick Start

```bash
# Clone the repository
git clone https://github.com/KubeOrch/ui.git
cd ui

# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:3001

Production container platforms, runtime API configuration, immutable digest
verification, and attestations are documented in
[docs/RELEASE.md](docs/RELEASE.md).

## 📁 Project Structure

```
ui/
├── app/            # Next.js app directory
├── components/     # UI components
│   ├── canvas/     # Workflow designer
│   ├── palette/    # Component library
│   └── ui/         # Base components
├── stores/         # State management
└── lib/            # Utilities
```

## 🎨 UI Philosophy

- **Progressive Disclosure** - Show complexity only when needed
- **Explicit Capability** - Do not imply installation, health, or compatibility from catalog presence alone
- **Visual Feedback** - Make state and user actions understandable
- **Accessible by Default** - Keep keyboard and assistive-technology use in scope

## 🤝 Contributing

We welcome contributions! See the [contributing guide](https://github.com/KubeOrch/.github/blob/main/CONTRIBUTING.md).

## 📄 License

[Apache 2.0](LICENSE)
