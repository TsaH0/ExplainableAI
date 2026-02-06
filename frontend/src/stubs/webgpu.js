// Stub for three/webgpu - prevents crash when browser lacks WebGPU support.
// The real WebGPURenderer is only used when useWebGPU is explicitly enabled,
// so this fallback class is never actually instantiated.
export class WebGPURenderer {
  constructor() {
    throw new Error("WebGPU is not supported in this browser");
  }
}
