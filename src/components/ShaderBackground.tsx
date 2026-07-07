import { useEffect, useRef } from 'react';

const VERTEX_SRC = `
attribute vec2 aPosition;
void main() {
    gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAGMENT_SRC = `
precision highp float;

#define NUM_OCTAVES 6

uniform float time;
uniform vec2 resolution;

float random(vec2 pos) {
    return fract(sin(dot(pos.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 pos) {
    vec2 i = floor(pos);
    vec2 f = fract(pos);
    float a = random(i + vec2(0.0, 0.0));
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 pos) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < NUM_OCTAVES; i++) {
        float dir = mod(float(i), 2.0) > 0.5 ? 1.0 : -1.0;
        v += a * noise(pos - 0.05 * dir * time);
        pos = rot * pos * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

void main() {
    vec2 p = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
    p -= vec2(12.0, 0.0);

    float time2 = 1.0;
    vec2 q = vec2(0.0);
    q.x = fbm(p + 0.00 * time2);
    q.y = fbm(p + vec2(1.0));

    vec2 r = vec2(0.0);
    r.x = fbm(p + 1.0 * q + vec2(1.7, 9.2) + 0.15 * time2);
    r.y = fbm(p + 1.0 * q + vec2(8.3, 2.8) + 0.126 * time2);

    float f = fbm(p + r);

    vec3 color = mix(
        vec3(0.2, 0.2, 0.8),
        vec3(0.5, 0.5, 0.9),
        clamp((f * f) * 4.0, 0.0, 1.0)
    );
    color = mix(color, vec3(0.5, 0.5, 0.9), clamp(length(q), 0.0, 1.0));
    color = mix(color, vec3(0.3, 0.7, 0.2), clamp(length(r.x), 0.0, 1.0));
    color = (f * f * f + 0.9 * f * f + 0.8 * f) * color;

    gl_FragColor = vec4(color * 0.7, color.r);
}
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
    const shader = gl.createShader(type);
    if (!shader) throw new Error('Failed to create shader');
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    return shader;
}

interface ShaderBackgroundProps {
    className?: string;
}

export default function ShaderBackground({ className }: ShaderBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
        if (!gl) {
            console.warn('WebGL not supported; shader background disabled.');
            return;
        }

        const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SRC);
        const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC);

        const program = gl.createProgram();
        if (!program) return;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        gl.useProgram(program);

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([-1, -1, 3, -1, -1, 3]),
            gl.STATIC_DRAW
        );

        const aPosition = gl.getAttribLocation(program, 'aPosition');
        gl.enableVertexAttribArray(aPosition);
        gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

        const uTime = gl.getUniformLocation(program, 'time');
        const uResolution = gl.getUniformLocation(program, 'resolution');

        let animationFrame: number;
        const startTime = performance.now();

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const width = canvas.clientWidth * dpr;
            const height = canvas.clientHeight * dpr;
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
                gl.viewport(0, 0, width, height);
            }
        };

        const render = () => {
            const elapsed = (performance.now() - startTime) / 1000;
            gl.uniform1f(uTime, elapsed);
            gl.uniform2f(uResolution, canvas.width, canvas.height);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
            animationFrame = requestAnimationFrame(render);
        };

        resize();
        render();

        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrame);
            gl.deleteProgram(program);
            gl.deleteShader(vertexShader);
            gl.deleteShader(fragmentShader);
            gl.deleteBuffer(positionBuffer);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={className ?? 'fixed inset-0 -z-20 w-full h-full'}
        />
    );
}