export const bgGradientVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const bgGradientFragmentShader = `
  uniform float uTime;
  uniform float uScrollProgress;
  uniform vec2 uMouse;
  uniform vec3 uColorBg;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv - 0.5;
    float dist = length(uv - uMouse * 0.1);
    vec3 col = uColorBg;
    
    // Very subtle warm radial ambient glow
    float light = smoothstep(0.8, 0.0, dist) * 0.035;
    col += vec3(0.04, 0.04, 0.08) * light;

    gl_FragColor = vec4(col, 1.0);
  }
`;
