uniform float time;
varying vec2 vUv;
varying vec3 vPosition;
uniform vec2 pixels;
uniform float distanceFromCenter;
float PI = 3.141592653589793238;
void main() {
  // vUv = (uv - vec2(0.5)) * (0.9 - 0.1 * distanceFromCenter) + vec2(0.5);

 /*  vUv = uv;

  vec3 pos = position; */

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}