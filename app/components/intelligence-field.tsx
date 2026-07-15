"use client";

import { useEffect, useRef } from "react";

const vertexShaderSource = `
  attribute vec2 aPosition;
  attribute float aSeed;
  uniform float uTime;
  uniform float uDensity;
  varying float vAlpha;
  void main() {
    float drift = sin(uTime * 0.18 + aSeed * 11.0) * 0.035;
    vec2 position = aPosition + vec2(drift, cos(uTime * 0.13 + aSeed * 17.0) * 0.02);
    gl_Position = vec4(position, 0.0, 1.0);
    gl_PointSize = (1.2 + fract(aSeed * 19.0) * 2.4) * uDensity;
    vAlpha = 0.15 + fract(aSeed * 23.0) * 0.52;
  }
`;

const fragmentShaderSource = `
  precision mediump float;
  varying float vAlpha;
  void main() {
    vec2 p = gl_PointCoord - 0.5;
    float glow = smoothstep(0.5, 0.02, dot(p, p));
    gl_FragColor = vec4(0.92, 0.69, 0.30, glow * vAlpha);
  }
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/** A tiny dependency-free WebGL particle field kept intentionally behind all content. */
export function IntelligenceField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gl = canvas.getContext("webgl", { alpha: true, antialias: false });
    if (!gl) return;

    const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertex || !fragment) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    const count = Math.min(window.innerWidth < 700 ? 160 : 380, 380);
    const points = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const index = i * 3;
      points[index] = Math.random() * 2 - 1;
      points[index + 1] = Math.random() * 2 - 1;
      points[index + 2] = Math.random();
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
    gl.useProgram(program);

    const position = gl.getAttribLocation(program, "aPosition");
    const seed = gl.getAttribLocation(program, "aSeed");
    const time = gl.getUniformLocation(program, "uTime");
    const density = gl.getUniformLocation(program, "uDensity");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 12, 0);
    gl.enableVertexAttribArray(seed);
    gl.vertexAttribPointer(seed, 1, gl.FLOAT, false, 12, 8);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(window.innerWidth * ratio);
      canvas.height = Math.round(window.innerHeight * ratio);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    let frame = 0;
    const render = (now: number) => {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(time, now / 1000);
      gl.uniform1f(density, Math.min(window.devicePixelRatio || 1, 1.35));
      gl.drawArrays(gl.POINTS, 0, count);
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, []);

  return <canvas ref={canvasRef} className="intelligence-field" aria-hidden="true" />;
}
