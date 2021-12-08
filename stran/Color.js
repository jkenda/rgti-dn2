import { Operations as O } from "./Operations.js";
export class Color {
    constructor(material, lights) {
        this._material = material;
        this._lights = lights;
    }
    phong(vertexPosition, normal) {
        const material = this._material;
        normal = O.normalize(normal);
        let oColor = [0, 0, 0];
        this._lights.forEach(light => {
            const lightDir = O.normalize(O.diff(light.position, vertexPosition));
            const viewDir = O.normalize(O.scale(vertexPosition, -1));
            const reflectDir = O.reflect(O.scale(lightDir, -1), normal);
            const diff = O.max(O.dot(normal, lightDir), 0.0);
            const spec = O.pow(O.max(O.dot(viewDir, reflectDir), 0.0), this._material.shininess);
            const color = O.scale(O.mul(material.color, light.color), diff + spec);
            oColor = O.sum(oColor, color);
        });
        oColor = O.scale(oColor, 255);
        return oColor;
    }
}
