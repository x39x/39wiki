# 图形、渲染

## 资料

- https://github.com/love2d/love

专注于2d的游戏引擎，小丑牌基于此，lua

- https://github.com/raysan5/raylib

基于OpenGL/GLFW的c库

https://zhuanlan.zhihu.com/p/458335134

- https://easyvulkan.github.io/

vulkan 教程

- https://metaltutorial.com/

metal 教程

## 常见图形API

### OpenGL

- **特点**：跨平台、易用性高、成熟稳定。
- **用途**：用于 2D 和 3D 图形渲染，广泛应用于游戏、CAD 和数据可视化等领域。
- **优势**：
    - 跨平台支持优异（支持 Windows、Linux、macOS 等）。
    - 丰富的功能和扩展生态。
    - 学习成本低，适合初学者和快速开发。
- **关系**：由 Khronos Group 维护，是一种早期的图形渲染 API 标准。

### Vulkan

- **特点**：现代、高性能、低开销。
- **用途**：提供更细粒度的控制，适合高性能游戏和图形应用。
- **优势**：
    - 更高效的多线程支持。
    - 更低的驱动开销。
    - 更适合跨平台应用（支持 Windows、Linux、Android 等）。
- **关系**：也由 Khronos Group 开发，是 OpenGL 的继任者。

### Direct3D

- **特点**：微软专有，属于 DirectX 套件的一部分。
- **用途**：在 Windows 和 Xbox 平台上使用广泛。
- **版本**：
    - Direct3D 11：传统 API，类似 OpenGL。
    - Direct3D 12：更现代化，类似 Vulkan。
- **限制**：仅支持 Windows 和微软生态系统。

### Metal

- **特点**：苹果开发的图形和计算 API。
- **用途**：优化 macOS 和 iOS 平台的图形性能。
- **优势**：
    - 深度整合苹果硬件。
    - 支持高效的多线程渲染。
- **限制**：仅支持苹果设备。

## 高级框架和引擎

这些工具在底层 API（如 OpenGL、Vulkan）之上构建，提供更易用的接口。

### Unity

- **类型**：游戏引擎。
- **支持的 API**：OpenGL、Vulkan、Direct3D、Metal。
- **特点**：
    - 面向开发者友好。
    - 适合 2D 和 3D 游戏开发。

### Unreal Engine

- **类型**：高性能游戏引擎。
- **支持的 API**：Vulkan、Direct3D、Metal、OpenGL。
- **特点**：
    - 提供先进的图形渲染功能（如光线追踪）。
    - 专注于 AAA 游戏开发。

### BGFX

- **类型**：跨平台图形渲染库。
- **支持的 API**：Vulkan、Direct3D、OpenGL、Metal。
- **特点**：
    - 提供统一的接口屏蔽底层差异。
    - 适合轻量级项目。

## 专注于其他领域的图形技术

在专业领域中非常重要。

### WebGPU

- **类型**：现代图形 API。
- **用途**：为 Web 提供高性能图形和计算功能。
- **底层支持**：Vulkan、Direct3D、Metal。
- **现状**：作为 WebGL 的下一代替代方案，仍在发展中。

### CUDA Graphics

- **用途**：结合图形渲染和通用 GPU 计算。
- **特点**：专注于高性能计算领域（如科学计算和 AI 可视化）。

### OpenCL

- **用途**：主要用于通用计算，但也支持图形任务。
- **特点**：跨平台，与 OpenGL/Vulkan 可互操作。

### Ray Tracing APIs (例如 NVIDIA OptiX)

- **用途**：专注于光线追踪技术。
- **特点**：提供高质量的全局光照计算。
